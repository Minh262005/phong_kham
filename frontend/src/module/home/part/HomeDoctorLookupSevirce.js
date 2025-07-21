import React, { useEffect, useState } from "react";
import { FaUserFriends } from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";
import { FaHospital } from "react-icons/fa";
import { TbHomePlus } from "react-icons/tb";
import Tippy from "@tippyjs/react/headless";
import WrapperDoctorLookup from "../../../Popper/WrapperDoctorLookup";
import { useNavigate } from "react-router-dom";
import { publicPort } from "../../../components/url/link";
import axios from "axios";
import { async } from "q";

const HomeDoctorLookupService = () => {
  const [inputValue, setInputValue] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [listOrigin, setListOrigin] = useState([]);
  const [specList, setSpecList] = useState([]);
  const [doctorName, setDoctorName] = useState("");

  const handleChangeDoctorName = (event) => {
    const userinput = event.target.value;
    console.log(userinput);
    setDoctorName(event.target.value);
  };

  const popperOptions = {
    modifiers: [
      {
        name: "flip",
        enabled: false,
      },
    ],
  };

  const handleSearchInputChange = (event) => {
    let searchInput = event.target.value;
    setInputValue(searchInput);
    if (searchInput === "") {
      setSpecList(listOrigin);
    } else {
      const filteredList = listOrigin.filter((item) =>
        item.name.toLowerCase().includes(searchInput.toLowerCase())
      );

      setSpecList(filteredList);
    }
  };

  const handleClickValue = (id) => {
    const selectItem = specList.find((data) => data.id === id);
    console.log(selectItem);
    setSelectedItem(selectItem);
    setInputValue(selectItem.name);
  };

  const navigate = useNavigate();

  const handleFind = async () => {
    console.log(doctorName + inputValue);
    const response = await axios.get(
      publicPort +
        `api/internal-accounts/search/?name=${doctorName}&specialty=${inputValue}`
    );
    console.log(response.data);

    var docList = response.data;

    if (response.data !== "No doctor information found") {
      navigate("/listDoctor", { state: { docList } });
    } else {
      alert("No doctor found");
    }
  };

  useEffect(() => {
    const spec = async () => {
      try {
        const response = await axios.get(publicPort + "spec/list");
        setListOrigin(response.data);
        setSpecList(response.data);
        // console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    spec();
  }, []);

  return (
    <div className="home-slider">
      <div>
        <h1 className=" mb-[12px] font-bold" style={{ fontSize: "38px" }}>
          Doctor lookup
        </h1>
        <div className="flex">
          <div className=" relative w-[37%]">
            <FaUserFriends
              className="absolute"
              style={{
                fontSize: "15px",
                top: "14px",
                left: "15px",
                color: "#3A8EF6",
              }}
            />
            <input
              onChange={handleChangeDoctorName}
              className="h-[45px] w-[100%] rounded-[15px] pl-[40px]"
              type="text"
              placeholder="Enter doctor's name"
            />
          </div>
          <div className=" relative w-[37%] ml-[6%] mr-[7%]">
            <Tippy
              trigger="click"
              popperOptions={popperOptions}
              hideOnClick={true}
              interactive={true}
              placement="bottom"
              render={(attrs) => (
                <WrapperDoctorLookup>
                  <div className="w-[380px]" tabIndex={-1} {...attrs}>
                    {specList.map((data) => (
                      <div
                        className="w-[100%] flex text-[#7f8790]"
                        key={data.id}
                        onClick={() => handleClickValue(data.id)}
                      >
                        <span className="w-[8%]">
                          <FaHospital className="text-3xl" />
                        </span>
                        <span className="w-[92%] mb-[5px]">
                          <h1 className="text-4xl">{data.name}</h1>
                        </span>
                      </div>
                    ))}
                  </div>
                </WrapperDoctorLookup>
              )}
            >
              <div className="relative w-[100%] ml-[6%] mr-[7%]">
                <TbHomePlus
                  className="absolute"
                  style={{
                    fontSize: "15px",
                    top: "14px",
                    left: "15px",
                    color: "#3A8EF6",
                  }}
                />
                <input
                  id="input"
                  value={inputValue}
                  onChange={handleSearchInputChange}
                  onClick={() => {
                    setSelectedItem(null);
                    setInputValue("");
                  }}
                  className="h-[45px] w-[100%] rounded-[15px] pl-[40px]"
                  type="text"
                  placeholder="Select Medical Specialty"
                />
                <FiChevronDown
                  className="absolute"
                  style={{
                    fontSize: "22px",
                    top: "12px",
                    left: "88%",
                    color: "#3A8EF6",
                  }}
                />
              </div>
            </Tippy>
          </div>
          <button
            onClick={handleFind}
            className="w-[13%] bg-blue-700 h-[45px] rounded-[15px] text-white"
            style={{ backgroundColor: "#3A8EF6" }}
          >
            Find
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeDoctorLookupService;

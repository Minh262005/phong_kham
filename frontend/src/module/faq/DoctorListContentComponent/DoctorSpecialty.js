import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCollapse } from "react-collapsed";
import { BsFillPeopleFill } from "react-icons/bs";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { publicPort } from "../../../components/url/link";

function DoctorSpecialty() {
  const [expanded, setExpanded] = useState(false);
  const [itemsToShow, setItemsToShow] = useState(2);
  const [listOrigin, setListOrigin] = useState([]);
  const handleClick = () => {
    setExpanded(!expanded);
    setItemsToShow(expanded ? 2 : listOrigin.length);
  };
  useEffect(() => {
    const listSpec = async () => {
      try {
        const response = await axios.get(
          publicPort + "api/doctors/specialty?specialty=****"
        );
        setListOrigin(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    listSpec();
  }, []);

  return (
    <div className="w-[100%] h-[100%] rounded-3xl bg-white shadow-lg">
      <div className="w-[100%] rounded-3xl h-[35px]">
        <h1 className="p-3 ml-1 font-bold text-3xl">Specialty</h1>
      </div>
      <hr className="w-[90%] ml-5 text-[#d4d4d4]" />
      <div>
        {listOrigin.slice(0, itemsToShow).map((data) => (
          <div
            className="flex justify-around w-[100%] h-[28px] ml-2"
            key={data.id}
          >
            <div className="w-[75%]">
              <h5 className="p-[7px] text-lg font-normal">
                {data.nameSepcial}
              </h5>
            </div>
            <div className="w-[25%]">
              <div className="p-[7px] flex pt-3">
                <span className="text-xl pr-2">{data.count}</span>
                <span className="text-2xl pt-1">
                  <BsFillPeopleFill />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={handleClick}
        style={{ color: "#3A8EF6", fontSize: "3rem", marginLeft: "13rem" }}
      >
        {expanded ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
      </button>
    </div>
  );
}
export default DoctorSpecialty;

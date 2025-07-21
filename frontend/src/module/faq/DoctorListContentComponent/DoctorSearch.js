import axios from "axios";
import { publicPort } from "components/url/link";
import React, { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import {
  FaBuilding,
  FaMapMarkerAlt,
  FaSortDown,
  FaUserMd,
} from "react-icons/fa";

const datas = [
  {
    icon: <FaMapMarkerAlt />,
    title: "Province/City",
    iconDown: <FaSortDown />,
  },
  {
    icon: <FaBuilding />,
    title: "Specialty",
    iconDown: <FaSortDown />,
  },
  {
    icon: <FaUserMd />,
    title: "Profession",
    iconDown: <FaSortDown />,
  },
];

function DoctorSearch({ handleChangeName, handleSearchInputChange }) {
  const [listSpec, setListSpec] = useState();
  const [listLo, setListLo] = useState();

  useEffect(() => {
    const app = async () => {
      const response = await axios.get(publicPort + `spec/list`);
      setListSpec(response.data);
      const response1 = await axios.get(publicPort + `location/list`);
      setListLo(response1.data);
    };
    app();
  }, []);
  return (
    <div className="flex">
      <div className="flex w-[85%]">
        <div className="w-[31%] h-[50px] bg-[#fff] rounded-3xl border border-[#d8d7da] p-4 flex items-center justify-center mr-[20px] text-[#828282]">
          <div className="text-5xl">
            <FaMapMarkerAlt />
          </div>
          <select name="lo" onChange={handleChangeName}>
            <option selected={true} value={""}>
              Location
            </option>
            {listLo != undefined &&
              listLo.map((staff) => (
                <option className="" key={staff.id} value={staff.id}>
                  {staff.name}
                </option>
              ))}
          </select>
        </div>

        <div className="w-[35%] h-[50px] bg-[#fff] rounded-3xl border border-[#d8d7da] p-4 flex items-center justify-center mr-[20px] text-[#828282]">
          <div className="text-5xl">
            <FaBuilding />
          </div>
          <select name="spc" onChange={handleChangeName}>
            <option selected={true} value={""}>
              Specialty
            </option>
            {listSpec != undefined &&
              listSpec.map((staff) => (
                <option className="" key={staff.id} value={staff.id}>
                  {staff.name}
                </option>
              ))}
          </select>
        </div>
      </div>
      <div className=" border-[1px] rounded-2xl flex border-[#c5c4c4] ">
        <button className="w-[15%]">
          <BiSearch className="text-[25px] ml-[5px] text-[#c5c4c4]" />
        </button>
        <input
          placeholder="Search"
          className="w-[83%] h-[100%] "
          name="sn"
          onChange={handleSearchInputChange}
        />
      </div>
    </div>
  );
}
export default DoctorSearch;

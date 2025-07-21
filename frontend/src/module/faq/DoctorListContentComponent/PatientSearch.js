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

function PatientSearch({ handleSearchInputChange }) {
  return (
    <div className="flex">
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
export default PatientSearch;

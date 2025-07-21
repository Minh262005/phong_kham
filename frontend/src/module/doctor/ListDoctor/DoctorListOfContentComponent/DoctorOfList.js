import { NavLink, useNavigate } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import { AiOutlinePhone, AiOutlineMail } from "react-icons/ai";
import { IoIosSchool } from "react-icons/io";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { event } from "jquery";
import avatarsss from "../../../../Images/ava1134.png"


const listOrigin = [
  {
    id: 1,
    avatar: avatarsss,
    name: "Nguyen Dinh Phong",
    email: "Mehrabbozorgi.business@gmail.com",
    phone: "0817411123"
  },
  {
    id: 2,
    avatar: avatarsss,
    name: "Nguyen Dinh Phong",
    email: "Mehrabbozorgi.business@gmail.com",
    phone: "0817411123"
  },
  {
    id: 3,
    avatar: avatarsss,
    name: "Nguyen Dinh Phong",
    email: "Mehrabbozorgi.business@gmail.com",
    phone: "0817411123"
  },
  {
    id: 4,
    avatar: avatarsss,
    name: "Nguyen Dinh Phong",
    email: "Mehrabbozorgi.business@gmail.com",
    phone: "0817411123"
  },
  {
    id: 5,
    avatar: avatarsss,
    name: "Nguyen Dinh Phong",
    email: "Mehrabbozorgi.business@gmail.com",
    phone: "0817411123"
  },

]

export default function DoctorOfList() {


  return (
    <div>
      <div>
        {listOrigin.map((data) => (
          <div
            key={data.id}
            className=" w-[100%] h-[150px] mb-[20px] rounded-[15px]"
          >
            <div
              className="flex p-4 relative bg-white rounded-[15px] shadow-xl"
              key={data.id}
            >
              <div className="w-[15%] h-[120px] rounded-[15px] overflow-hidden mr-[30px] mt-2 ">
                <img className="w-[100%]" src={data.avatar} alt="avatar" />
              </div>
              <div className="w-[85%] pr-[20%]">
                <h1 className="font-semibold">{data.name}</h1>
                <div className="flex">
                  <div className="pr-[5px] text-5xl">
                    <AiOutlineMail />
                  </div>
                  <a className="text-2xl font-light ">{data.email}</a>
                </div>
                <div className="flex pt-1">
                  <div className="pr-[10px] text-4xl">
                    <AiOutlinePhone />
                  </div>
                  <a className="text-2xl font-light">
                    {data.phone}
                  </a>
                </div>
                <div className="absolute top-8 right-8">
                  <button
                    className=" bg-blue-700 w-[200px] h-[40px] rounded-[10px] text-white"
                    style={{ backgroundColor: "#3A8EF6" }}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="w-[100%] h-[50px]" style={{ textAlign: "center" }}>
        <div>
          <select>
            <option value="1">1 per page</option>
            <option value="7">7 per page</option>
            <option value="10">10 per page</option>
          </select>
        </div>
      </div>
    </div>
  );
}

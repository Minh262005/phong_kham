import React, { useState } from "react";
import { useCollapse } from "react-collapsed";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

const Listdata = [
  {
    id: 1,
    name: "  The average level of customer satisfaction is displayed below, taken from independent customer experience surveys conducted by the Quality Management Department.",
    name1:
      ' The answers are measured on a scale of 1 to 5, with 5 being the best score equivalent to "Very Good."',
    name2:
      " The comments reflect the perspectives and objective opinions of the customers.",
  },
  {
    id: 2,
    name4: " There are currently no reviews for this doctor.",
  },
];
function Assessment() {
  return (
    <div className="w-[77%] ml-[170px] mt-[80px] bg-white  flex justify-center">
      <div className="mb-[20px] w-[45%] rounded-3xl bg-white shadow-lg">
        <div className="w-[100%] flex">
          <div className="w-[5%]">
            <BsFillInfoCircleFill className="text-[18px] mt-[36%] ml-[40%] text-[#c5d7f4]" />
          </div>
          <div className="w-[90%] rounded-3xl h-[35px]">
            <h1 className="p-3 font-bold text-[15px]">
              Customer Reviews for Dr. Nguyen Thuy Dung: 0 ratings
            </h1>
          </div>
        </div>
        <hr className="w-[90%] ml-5 text-[rgb(212,212,212)]" />
        <div>
          {Listdata.map((data) => (
            <div
              className=" text-[13px] justify-around w-[100%] ml-2 font-light p-[10px]"
              key={data.id}
              style={{ lineHeight: "35px" }}
            >
              <p>{data.name}</p>
              <p className="mt-[5%] mb-[5%]">{data.name1}</p>
              <p>{data.name2}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="mb-[20px] w-[45%] rounded-3xl h-[100%] bg-white shadow-lg ml-[5%]">
        <div className="w-[100%] flex">
          <div className="w-[5%]">
            <BsFillInfoCircleFill className="text-[18px] mt-[36%] ml-[40%] text-[#c5d7f4]" />
          </div>
          <div className="w-[90%] rounded-3xl h-[35px]">
            <h1 className="p-3 font-bold text-[15px]">Number of reviews: 0 </h1>
          </div>
        </div>
        <hr className="w-[90%] ml-5 text-[rgb(212,212,212)]" />
        <div>
          {Listdata.map((data) => (
            <div
              className=" text-[13px] justify-around w-[100%] ml-2 font-light p-[10px]"
              key={data.id}
            >
              <p>{data.name4}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default Assessment;

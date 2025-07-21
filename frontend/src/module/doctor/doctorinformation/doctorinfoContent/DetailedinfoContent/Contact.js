import React, { useState } from "react";
import { useCollapse } from "react-collapsed";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
const Listdata = [
  {
    id: 1,
    name: " Emergency Intensive Care Unit - Public Hospital",
    name1: " Family Medical International Clinic, Ho Chi Minh City ",
    name2: " Gregorio Maranon Hospital, Madrid, Spain",
    name3: " Vinmec International General Hospital - Phu Quoc branch",
  },
];
function Contact({ doct }) {
  const [isIcon, setIsicon] = useState(false);
  const [isExpanded, setExpanded] = useState(true);
  // const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded });
  const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded });

  function handleOnClick() {
    setIsicon(!isIcon);
    setExpanded(!isExpanded);
  }
  return (
    <div className="w-[100%]  rounded-3xl bg-white shadow-lg">
      <div className="w-[100%] flex">
        <div className="w-[10%]">
          <BsFillInfoCircleFill className="text-[18px] mt-[30%] ml-[40%] text-[#c5d7f4]" />
        </div>
        <div className="w-[60%] rounded-3xl h-[35px]">
          {isExpanded ? (
            <h1 className="p-3 ml-1 font-bold text-[15px]">Contact Number</h1>
          ) : (
            <h1 className="p-3 ml-1 font-bold text-[15px]">Contact Number</h1>
          )}
        </div>
        <div
          className="w-[30%] text-[60px] cursor-pointer flex justify-center"
          {...getToggleProps({ onClick: handleOnClick })}
        >
          {isIcon ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
        </div>
      </div>
      <hr className="w-[90%] ml-5 text-[rgb(212,212,212)]" />
      <div {...getCollapseProps()}>
        {
          <div
            className=" text-[14px] justify-around w-[100%] ml-2 font-light p-[12px]"
            style={{ lineHeight: "40px" }}
          >
            {doct.yearOfExp} years
            {/* <hr className="w-[100%] text-[rgb(212,212,212)]" /> */}
          </div>
        }
      </div>
    </div>
  );
}
export default Contact;

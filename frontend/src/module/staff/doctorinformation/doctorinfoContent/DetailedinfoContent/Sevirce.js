import React, { useState } from "react";
import { useCollapse } from "react-collapsed";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
const Listdata = [
  {
    id: 1,
    name: " Diagnosis and treatment of cardiovascular diseases such as coronary artery disease",
    name1:
      " Evaluation and treatment of hypertension, arrhythmias, congenital heart diseases in children, and acute cardiovascular emergencies like acute coronary syndrome",
    name2:
      " Emergency treatment of hypertension, syncope/unconsciousness syndrome",
  },
];
function Sevirce() {
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
            <h1 className="p-3 ml-1 font-bold text-[15px]">
              EDUCATION BACKGROUND
            </h1>
          ) : (
            <h1 className="p-3 ml-1 font-bold text-[15px]">
              EDUCATION BACKGROUND
            </h1>
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
        {Listdata.map((data) => (
          <div key={data.id}>
            <div
              className=" text-[14px] justify-around w-[100%] ml-2 font-light p-[10px]"
              style={{ lineHeight: "35px" }}
            >
              {data.name}
              <hr className="w-[100%] text-[rgb(212,212,212)]" />
              {data.name1}
              <hr className="w-[100%] text-[rgb(212,212,212)]" />
              {data.name2}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Sevirce;

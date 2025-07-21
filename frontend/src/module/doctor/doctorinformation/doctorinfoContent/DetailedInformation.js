import React, { useEffect, useState } from "react";
import { useCollapse } from "react-collapsed";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import Email from "./DetailedinfoContent/Email";
import DateOfBirth from "./DetailedinfoContent/DateOfBirth";
import Gender from "./DetailedinfoContent/Gender";
import Location from "./DetailedinfoContent/Location";
import IdentityCard from "./DetailedinfoContent/IdentityCard";
import Contact from "./DetailedinfoContent/Contact";
import { localPort } from "../../../../components/url/link";
import axios from "axios";

const Listdata = [
  {
    id: 1,
    name: " Nguyen Dinh Phong ",
  },
];
function DetailedInformation({ doct }) {
  const [isIcon, setIsicon] = useState(false);
  const [isExpanded, setExpanded] = useState(true);
  // const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded });
  const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded });

  console.log("doc info", doct);

  function handleOnClick() {
    setIsicon(!isIcon);
    setExpanded(!isExpanded);
  }
  return (
    <div className="w-[77%] ml-[170px] mt-[80px] h-[100%]">
      <div className="flex w-[100%] justify-center">
        <div className="w-[50%] h-[100%] ">
          <div className="mb-[20px] rounded-3xl bg-white shadow-lg">
            <div className="w-[100%] flex">
              <div className="w-[10%]">
                <BsFillInfoCircleFill className="text-[18px] mt-[30%] ml-[40%] text-[#c5d7f4]" />
              </div>
              <div className="w-[60%] rounded-3xl h-[35px]">
                {isExpanded ? (
                  <h1 className="p-3 ml-1 font-bold  text-[15px]">
                    FULL NAME
                  </h1>
                ) : (
                  <h1 className="p-3 ml-1 font-bold  text-[15px]">
                    FULL NAME
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
                <div
                  className=" text-[13px] justify-around w-[100%] ml-2 font-light p-[10px]"
                  key={data.id}
                  style={{ lineHeight: "35px" }}
                >
                  {data.name}
                </div>
              ))}
            </div>
          </div>
          <div className="mb-[20px]">
            <DateOfBirth />
          </div>
          <div className="mb-[20px]">
            <Gender />
          </div>
          <div className="mb-[20px]">
            <Location />
          </div>
        </div>
        <div className="w-[50%] mr-[5%] ml-[5%] ">
          <div className="mb-[20px]">
            <Email doct={doct.role} />
          </div>
          <div className="mb-[20px]">
            <IdentityCard doct={doct.workingPlace} />
          </div>
          <div className="mb-[20px]">
            <Contact doct={doct} />
          </div>
        </div>
      </div>
    </div>
  );
}
export default DetailedInformation;

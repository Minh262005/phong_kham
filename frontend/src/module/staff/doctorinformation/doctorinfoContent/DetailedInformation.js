import React, { useState } from "react";
import { useCollapse } from "react-collapsed";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import Position from "./DetailedinfoContent/Position";
import AwardsAndRecognitions from "./DetailedinfoContent/AwardsAndRecognitions";
import BookResearchWork from "./DetailedinfoContent/BookResearchWork";
import Specialtiess from "./DetailedinfoContent/Specialtiess";
import Languages from "./DetailedinfoContent/Languages";
import WorkPlace from "./DetailedinfoContent/WorkPlace";
import Experience from "./DetailedinfoContent/Experience";
import Education from "./DetailedinfoContent/Education";

const Listdata = [
  {
    id: 1,
    name: "  Doctor Carlos has 23 years of experience in treating cardiovascular diseases. Currently, he works as a Cardiologist at the Department of Internal Medicine and Outpatient Clinic at Clinicmate Clinicl in Da Nang.",
  },
];
function DetailedInformation({ doct }) {
  const [isIcon, setIsicon] = useState(false);
  const [isExpanded, setExpanded] = useState(true);
  // const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded });
  const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded });

  // console.log("doc info", doct);

  function handleOnClick() {
    setIsicon(!isIcon);
    setExpanded(!isExpanded);
  }
  return (
    <div className="w-[77%] ml-[170px] mt-[80px] h-[100%]">
      <div className="flex w-[100%] justify-center">
        <div className="w-[30%] h-[100%] ">
          <div className="mb-[20px] rounded-3xl bg-white shadow-lg">
            <div className="w-[100%] flex">
              <div className="w-[10%]">
                <BsFillInfoCircleFill className="text-[18px] mt-[30%] ml-[40%] text-[#c5d7f4]" />
              </div>
              <div className="w-[60%] rounded-3xl h-[35px]">
                {isExpanded ? (
                  <h1 className="p-3 ml-1 font-bold  text-[15px]">
                    Introduction
                  </h1>
                ) : (
                  <h1 className="p-3 ml-1 font-bold  text-[15px]">
                    Introduction
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
              <div
                className=" text-[13px] justify-around w-[100%] ml-2 font-light p-[10px]"
                style={{ lineHeight: "35px" }}
              >
                {doct.introduct}
              </div>
            </div>
          </div>
          <div className="mb-[20px]">
            <AwardsAndRecognitions />
          </div>
          <div className="mb-[20px]">
            <BookResearchWork />
          </div>
          <div className="mb-[20px]">
            <Languages />
          </div>
        </div>
        <div className="w-[30%] mr-[5%] ml-[5%] ">
          <div className="mb-[20px]">
            <Position doct={doct.role} />
          </div>
          <div className="mb-[20px]">
            <WorkPlace doct={doct.workingPlace} />
          </div>
          <div className="mb-[20px]">
            <Experience doct={doct} />
          </div>
        </div>
        <div className="w-[30%]">
          <div className="mb-[20px]">
            <Specialtiess doct={doct.specialty} />
          </div>
          <div className="mb-[20px]">
            <Education doct={doct} />
          </div>
        </div>
      </div>
    </div>
  );
}
export default DetailedInformation;

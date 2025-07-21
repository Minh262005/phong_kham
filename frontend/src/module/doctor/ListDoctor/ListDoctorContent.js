import React from "react";
import DoctorOfList from "./DoctorListOfContentComponent/DoctorOfList";
import DoctorOfUserful from "./DoctorListOfContentComponent/DoctorOfUserful";
function ListOfDoctorContent() {
  return (
    <div className="flex w-[100%]">
      <div className="w-[75%] mr-[25px]">
        <div className=" bg-[#fff]">
          <DoctorOfList />
        </div>
      </div>
      <div className="w-[25%]">
        <div>
          <DoctorOfUserful />
        </div>
      </div>
    </div>
  );
}
export default ListOfDoctorContent;

import HomeHeaderServiceDoctor from "module/home/HomeHeaderServiceDoctor";
import Footer from "module/home/Footer";
import ListDoctorContent from "module/doctor/ListDoctor/ListDoctorContent";
import React from "react";

function ListOfDoctor() {
  return (
    <div className="w-[100%] min-h-[1000px] bg-white">
      <div className="w-[100%] flex justify-center">
        <div className="w-[80%] min-h-[1000px] bg-white">
          <div className="bg-white">
            <HomeHeaderServiceDoctor></HomeHeaderServiceDoctor>
          </div>
          <div className="w-[100%] h-[200px] flex items-center">
            <h1 className="text-[40px] font-bold">List of Patients</h1>
          </div>
          <div className="bg-white">
            <ListDoctorContent />
          </div>
        </div>
      </div>
      <div className="bg-white">
        <Footer />
      </div>
    </div>
  );
}
export default ListOfDoctor;

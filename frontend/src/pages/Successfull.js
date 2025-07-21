import HomeHeaderService from "../module/home/HomeHeaderService";
import Footer from "../module/home/Footer";
import SuccessfullContent from "../module/SuccessFull/SuccessfullContent";
import React from "react";

function EditProfile() {
  return (
    <div className="w-[100%] min-h-[1000px] bg-white ">
      <div className="w-[100%] flex justify-center">
        <div className="w-[80%] min-h-[1000px] bg-white">
          <div className="bg-white h-[100px]">
            {/* <HomeHeaderService></HomeHeaderService> */}
          </div>
          <div className="bg-white">
            <SuccessfullContent />
          </div>
        </div>
      </div>
      <div className="bg-white">
        <Footer />
      </div>
    </div>
  );
}
export default EditProfile;

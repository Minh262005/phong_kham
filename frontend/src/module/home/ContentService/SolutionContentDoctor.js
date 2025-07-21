import { HiUserGroup } from "react-icons/hi";
import { BsArrowRightShort, BsCalendar3 } from "react-icons/bs";
import { HiOutlineDocumentText } from "react-icons/hi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
function SolutionContentDoctor() {
  const [hoveritem, setHoverItem] = useState("first");
  const navigate = useNavigate();
  const hoverActive = (item) => {
    setHoverItem(item);
  };

  const handleListDoctorForAll = () => {
    navigate("/listDoctorForAll");
  };
  const handleSchedules = () => {
    navigate("/schedules");
  };
  const handleExaminationlist = () => {
    navigate("/examination-list");
  };

  return (
    <div className="w-[100%] min-h-[700px] flex items-center">
      <div>
        <div className="w-[100%] h-[100px] flex items-center text-[25px] font-bold">
          <h1>Quick Solution For Scheduling</h1>
        </div>
        <div className="w-[100%] min-h-[300px]  flex justify-between">
          <div
            className="w-[33%] min-h-[300px] flex justify-center"
            onClick={handleListDoctorForAll}
          >
            <div
              className={`w-[80%] min-h-[250px] flex justify-center rounded-[10px] border-[1px] border-gradientLeft cursor-pointer ${
                hoveritem === "first" ? " bg-white shadow-xl border-none " : ""
              }`}
              onMouseEnter={() => hoverActive("first")}
            >
              <div className="w-[90%] min-h-[250px] ">
                <div className="w-[100%] h-[60px] flex items-center mt-[10px]">
                  <span className="text-[35px] w-[15%] h-[40px] bg-[#eaf7f0] flex justify-center items-center rounded-full text-[#40b772]">
                    <HiUserGroup />
                  </span>
                </div>
                <div className="w-[100%] h-[50px] flex items-center">
                  <h1 className="text-[20px] font-bold">Find Doctor</h1>
                </div>
                <div className="w-[100%] h-[130px] ">
                  <p className="text-[15px] w-[75%]">
                    The search feature in the clinic management application
                    allows users to search and select doctors based on specific
                    criteria.
                  </p>
                </div>
                <div className="w-[100%] h-[30px] flex items-center">
                  <span className="text-gradientLeft">More</span>
                  <span className="text-[30px] text-gradientLeft">
                    <BsArrowRightShort />
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div
            className="w-[33%] min-h-[300px] flex justify-center"
            onClick={handleSchedules}
          >
            <div
              className={`w-[80%] min-h-[250px] flex justify-center rounded-[10px] border-[1px] border-gradientLeft cursor-pointer ${
                hoveritem === "second" ? " bg-white shadow-xl border-none " : ""
              }`}
              onMouseEnter={() => hoverActive("second")}
            >
              <div className="w-[90%] min-h-[250px] ">
                <div className="w-[100%] h-[60px] flex items-center mt-[10px]">
                  <span className="text-[35px] w-[15%] h-[40px] bg-[#e4e5ed] flex justify-center items-center rounded-full text-[#efac72]">
                    <BsCalendar3 />
                  </span>
                </div>
                <div className="w-[100%] h-[50px] flex items-center">
                  <h1 className="text-[20px] font-bold">Appointments</h1>
                </div>
                <div className="w-[100%] h-[130px] ">
                  <p className="text-[15px] w-[75%]">
                    The appointment management feature in the clinic management
                    application allows users and staff to efficiently manage
                    appointments.
                  </p>
                </div>
                <div className="w-[100%] h-[30px] flex items-center">
                  <span className="text-gradientLeft">More</span>
                  <span className="text-[30px] text-gradientLeft">
                    <BsArrowRightShort />
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div
            className="w-[33%] min-h-[300px] flex justify-center"
            onClick={handleExaminationlist}
          >
            <div
              className={`w-[80%] min-h-[250px] flex justify-center rounded-[10px] border-[1px] border-gradientLeft cursor-pointer ${
                hoveritem === "third" ? " bg-white shadow-xl border-none " : ""
              }`}
              onMouseEnter={() => hoverActive("third")}
            >
              <div className="w-[90%] min-h-[250px] ">
                <div className="w-[100%] h-[60px] flex items-center mt-[10px]">
                  <span className="text-[35px] w-[15%] h-[40px] bg-[#e3dfef] flex justify-center items-center rounded-full text-[#eb5757]">
                    <HiOutlineDocumentText />
                  </span>
                </div>
                <div className="w-[100%] h-[50px] flex items-center">
                  <h1 className="text-[20px] font-bold">Examinations</h1>
                </div>
                <div className="w-[100%] h-[130px] ">
                  <p className="text-[15px] w-[75%]">
                    Sending requests in the clinic management application allows
                    users and patients to send requests to staff or doctors
                    within the clinic.
                  </p>
                </div>
                <div className="w-[100%] h-[30px] flex items-center">
                  <span className="text-gradientLeft">More</span>
                  <span className="text-[30px] text-gradientLeft">
                    <BsArrowRightShort />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default SolutionContentDoctor;

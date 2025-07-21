import React, { useEffect, useState } from "react";
import imgAdmin from "../../Images/imgAdmin.png";
import imgDoctor from "../../Images/imgDoctor.png";
import imgNurseStaff from "../../Images/imgNurseStaff.png";
import HomeDoctorLookupSevirce from "./part/HomeDoctorLookupSevirce";
import InformationCatalogueService from "./part/InformationCatalogueService";
import { useNavigate } from "react-router-dom";
import FeaturedSeliderSevirce from "./part/FeaturedSeliderSevirce";
import LatestNewService from "./part/LatestNewService";
import { publicPort } from "../../components/url/link";
import jwtDecode from "jwt-decode";
import SolutionContent from "./ContentService/SolutionContent";
import SolutionContentDoctor from "./ContentService/SolutionContentDoctor";
import SolutionContentNurse from "./ContentService/SolutionContentNurse";
const HomeContentServiceStaff = () => {
  const tabButtons = ["In-Person", "E - consultations"];
  const [type, setType] = useState("In-Person");
  const navigate = useNavigate();
  const storedName = localStorage.getItem("token");
  const [role, setRole] = useState("");
  const [nameInter, setnameInter] = useState("");
  useEffect(() => {
    try {
      const decoded = jwtDecode(storedName);
      const role = decoded.roles[0].authority;
      setRole(role);
      const nameuser = decoded.nameInternal;
      setnameInter(nameuser);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handlelocations = () => {
    navigate("/locations");
  };

  const handleInternals = () => {
    navigate("/internals");
  };
  const handleAppointments = () => {
    navigate("/appointments");
  };

  const handleSchedules = () => {
    navigate("/schedules");
  };
  const handleCheckin = () => {
    navigate("/checkin");
  };

  const handlebookappointment = () => {
    navigate("/book_appointment");
  };
  const handleExamination = () => {
    navigate("/examination-list");
  };
  return (
    <div className="bg-white">
      <div className="flex items-center gap-[141px] justify-between max-w-[1156px] mx-auto h-[620px]">
        <div className="flex flex-col w-[590px]">
          <div>
            <div className="text-[32px] font-bold">Hello,</div>
            <div className="text-[32px] text-[#fff0] font-bold bg-clip-text w-max bg-gradient-to-tr from-gradientLeft to-gradientRight">
              {role} {nameInter}
            </div>
          </div>
          {role == "ADMIN" ? (
            <div>
              <span className="mt-3 font-bold text-[17px] text-black1">
                Administrator Role
              </span>
              <p className="mt-8 text-textColor2">
                The administrator undertakes various responsibilities such as
                managing user accounts, system security, software installation
                and configuration, troubleshooting technical issues, generating
                reports and statistics, and ensuring the smooth and effective
                functioning of the system.{" "}
              </p>
            </div>
          ) : role == "DOCTOR" ? (
            <div>
              <span className="mt-3 font-bold text-[17px] text-black1">
                Anesthesiology and Pain Management
              </span>
              <p className="mt-8 text-textColor2">
                Doctor Carlos has 23 years of experience in treating
                cardiovascular diseases. Currently, he works as a Cardiologist
                at the Department of Internal Medicine and Outpatient Clinic at
                Clinicmate Clinic in Da Nang.
              </p>
            </div>
          ) : (
            <div>
              <span className="mt-3 font-bold text-[17px] text-black1">
                Instant and Future Appointment Booking
              </span>
              <p className="mt-8 text-textColor2">
                Doctor Carlos has 23 years of experience in treating
                cardiovascular diseases. Instant Appointment Booking addresses
                urgent medical requirements, ensuring prompt access to
                healthcare services. On the other hand, Future Appointment
                Booking supports planned medical visits and offers convenience
                for patients who prefer to schedule appointments for a specific
                date in the future.
              </p>
            </div>
          )}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              paddingTop: "20px",
            }}
          >
            {role == "ADMIN" ? (
              <>
                <button
                  className="border-[3px] rounded-2xl h-[50px] pl-[30px] pr-[30px] w-[40%] mr-[35px]"
                  style={{
                    color: "#ffff",
                    backgroundColor: "#3681f8",
                  }}
                  onClick={handlelocations}
                >
                  Internal
                </button>
                <button
                  className="border-[3px] rounded-2xl h-[50px] pl-[30px] pr-[30px] w-[40%] mr-[35px]"
                  style={{
                    color: "#5562f7",
                  }}
                  onClick={handleInternals}
                >
                  Account
                </button>
              </>
            ) : role == "DOCTOR" ? (
              <>
                <button
                  className="border-[3px] rounded-2xl h-[50px] pl-[30px] pr-[30px] w-[40%] mr-[35px]"
                  style={{
                    color: "#ffff",
                    backgroundColor: "#3681f8",
                  }}
                  onClick={handleSchedules}
                >
                  My Appointment
                </button>
                <button
                  className="border-[3px] rounded-2xl h-[50px] pl-[30px] pr-[30px] w-[40%] mr-[35px]"
                  style={{
                    color: "#5562f7",
                  }}
                  onClick={handleExamination}
                >
                  My Examination
                </button>
              </>
            ) : (
              <>
                <button
                  className="border-[3px] rounded-2xl h-[50px] pl-[30px] pr-[30px] w-[40%] mr-[35px]"
                  style={{
                    color: "#ffff",
                    backgroundColor: "#3681f8",
                  }}
                  onClick={handleCheckin}
                >
                  Check-in
                </button>
                <button
                  className="border-[3px] rounded-2xl h-[50px] w-[40%] mr-[35px]"
                  style={{
                    color: "#5562f7",
                  }}
                  onClick={handlebookappointment}
                >
                  Book Appointment
                </button>
              </>
            )}
          </div>
        </div>
        <div className="w-[46%]">
          {role == "ADMIN" ? (
            <img src={imgAdmin} style={{ marginLeft: "96px" }} alt="" />
          ) : role == "DOCTOR" ? (
            <img src={imgDoctor} style={{ marginLeft: "96px" }} alt="" />
          ) : (
            <img src={imgNurseStaff} style={{ marginLeft: "96px" }} alt="" />
          )}
        </div>
      </div>
      <div className="bg-[#e2edff] pb-[80px] pt-[40px]">
        <div className="max-w-[1156px] mx-auto">
          {role == "ADMIN" ? (
            <SolutionContent />
          ) : role == "DOCTOR" ? (
            <SolutionContentDoctor />
          ) : (
            <SolutionContentNurse />
          )}
        </div>
      </div>
      <div className="max-w-[1156px] mx-auto pt-[70px]">
        <div>
          <h1 className="pb-[50px] font-bold" style={{ fontSize: "40px" }}>
            Hot announcements
          </h1>
          <FeaturedSeliderSevirce />
        </div>
        <div>
          <h1 className="pb-[50px] font-bold" style={{ fontSize: "40px" }}>
            Information Catalogue
          </h1>
          <InformationCatalogueService />
        </div>
        <div>
          <h1
            className="font-bold pb-[30px]"
            style={{ fontSize: "40px", marginTop: "100px" }}
          >
            Latest News
          </h1>
          <LatestNewService />
        </div>
      </div>
    </div>
  );
};

export default HomeContentServiceStaff;

import HomeHeaderService from "../module/home/HomeHeaderService";
import Footer from "../module/home/Footer";
import EditProfileContent from "../module/profile/EditProfileContent";
import React, { useEffect, useState } from "react";
import FaqContent from "module/faq/FaqContent/FaqContent";
import jwtDecode from "jwt-decode";
import HomeHeaderServiceDoctor from "module/home/HomeHeaderServiceDoctor";
import HomeHeaderServiceGuest from "module/home/HomeHeaderServiceGuest";
import HomeHeaderServiceNurse from "module/home/HomeHeaderServiceNurse";
import { useNavigate } from "react-router-dom";
import HomeHeaderServiceAdmin from "module/home/HomeHeaderServiceAdmin";

function FaqPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const [mail, setmail] = useState("");
  useEffect(() => {
    const storedName = localStorage.getItem("token");

    try {
      const decoded = jwtDecode(storedName);
      const role = decoded.roles[0].authority;
      setRole(role);
      setmail(decoded.sub);
      // if (role !== 'NURSE') {
      //   navigate("/")
      // }
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <div className="w-[100%] min-h-[1000px] bg-white">
      <div className="w-[100%] flex justify-center">
        <div className="w-[80%] min-h-[1000px] bg-white">
          <div className="bg-white">
            {role == "DOCTOR" ? (
              <HomeHeaderServiceDoctor></HomeHeaderServiceDoctor>
            ) : role == "NURSE" ? (
              <HomeHeaderServiceNurse></HomeHeaderServiceNurse>
            ) : role == "USER" ? (
              <HomeHeaderService></HomeHeaderService>
            ) : role == "ADMIN" ? (
              <HomeHeaderServiceAdmin></HomeHeaderServiceAdmin>
            ) : (
              <HomeHeaderServiceGuest></HomeHeaderServiceGuest>
            )}
          </div>
          <div className="w-[100%] h-[200px] flex items-center">
            <h1 className="text-[40px] font-bold">
              Frequently Asked Questions
            </h1>
          </div>
          <div className="bg-white">
            <FaqContent />
          </div>
        </div>
      </div>
      <div className="bg-white">
        <Footer />
      </div>
    </div>
  );
}
export default FaqPage;

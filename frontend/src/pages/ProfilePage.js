import HomeHeaderService from "../module/home/HomeHeaderService";
import Footer from "../module/home/Footer";
import ProfileContent from "../module/profile/ProfileContent";
import jwtDecode from "jwt-decode";
import HomeHeaderServiceDoctor from "module/home/HomeHeaderServiceDoctor";
import HomeHeaderServiceNurse from "module/home/HomeHeaderServiceNurse";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HomeHeaderServiceAdmin from "module/home/HomeHeaderServiceAdmin";
import HomeHeaderServiceGuest from "module/home/HomeHeaderServiceGuest";

function ProfilePage() {
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const [mail, setMail] = useState("");

  useEffect(() => {
    const storedName = localStorage.getItem("token");
    if (storedName == null) {
      navigate("/login-user");
    } else {
      try {
        const decoded = jwtDecode(storedName);
        const role = decoded.roles[0].authority;
        const mal = decoded.sub;
        setMail(mal);
        setRole(role);
        // if (role !== 'USER') {
        //   navigate("/")
        // }
      } catch (error) {
        console.log(error);
      }
    }
  }, []);
  return (
    <div className="w-[100%] min-h-[1000px] bg-white flex justify-center">
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
          <h1 className="text-[40px] font-bold"> My Profile</h1>
        </div>
        <div className="bg-white">
          <ProfileContent mail={mail} role={role} />
        </div>
        <div className="bg-white">
          <Footer />
        </div>
      </div>
    </div>
  );
}
export default ProfilePage;

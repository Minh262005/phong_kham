import HomeHeaderService from "../../module/home/HomeHeaderService";
import Footer from "../../module/home/Footer";
import EditProfileContentForDoctor from "../../module/profile/EditProfileContentForDoctor";
import jwtDecode from "jwt-decode";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HomeHeaderServiceDoctor from "module/home/HomeHeaderServiceDoctor";
import HomeHeaderServiceNurse from "module/home/HomeHeaderServiceNurse";

function EditProfileDoctor() {
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
    <div className="w-[100%] min-h-[1000px] bg-white">
      <div className="w-[100%] flex justify-center">
        <div className="w-[80%] min-h-[1000px] bg-white">
          <div className="bg-white">
            {role == "USER" ? (
              <HomeHeaderService></HomeHeaderService>
            ) : role == "NURSE" ? (
              <HomeHeaderServiceNurse></HomeHeaderServiceNurse>
            ) : (
              <HomeHeaderServiceDoctor></HomeHeaderServiceDoctor>
            )}
          </div>
          <div className="w-[100%] h-[200px] flex items-center">
            <h1 className="text-[40px] font-bold"> Edit Profile</h1>
          </div>
          <div className="bg-white">
            <EditProfileContentForDoctor />
          </div>
        </div>
      </div>
      <div className="bg-white">
        <Footer />
      </div>
    </div>
  );
}
export default EditProfileDoctor;

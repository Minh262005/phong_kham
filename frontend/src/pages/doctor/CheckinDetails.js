import Footer from "../../module/home/Footer";
import HomeHeaderService from "../../module/home/HomeHeaderService";
import AppointmentDetailsContent from "../../module/doctor/AppointmentDetailsContent/AppointmentDetailsContent";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import HomeHeaderServiceDoctor from "../../module/home/HomeHeaderServiceDoctor";
import React from "react";
import CheckinDetailsContent from "module/doctor/CheckinDetailsContent/CheckinDetailsContent";
import HomeHeaderServiceNurse from "module/home/HomeHeaderServiceNurse";
function CheckinDetails() {
  const navigate = useNavigate();
  const storedName = localStorage.getItem("token");
  const [checkin, setcheckin] = useState();
  const [role, setrole] = useState("");

  useEffect(() => {
    if (storedName == null) {
      navigate("/login-user");
    } else {
      try {
        const decoded = jwtDecode(storedName);
        const rol = decoded.roles[0].authority;
        setrole(rol);
        // if (role !== 'NURSE') {
        //   navigate("/")
        // }\
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  const location = useLocation();
  useEffect(() => {
    const check = location?.state?.checkin;
    console.log(checkin);
    if (check == undefined) {
      navigate("/examination-list");
    } else {
      setcheckin(check);
    }
  }, []);

  return (
    <div>
      <div className="bg-white">
        {role == "DOCTOR" ? (
          <HomeHeaderServiceDoctor></HomeHeaderServiceDoctor>
        ) : role == "NURSE" ? (
          <HomeHeaderServiceNurse></HomeHeaderServiceNurse>
        ) : (
          <HomeHeaderService></HomeHeaderService>
        )}
      </div>

      <div style={{ padding: "3% 12%" }} className="bg-white">
        <CheckinDetailsContent checkin={checkin} role={role} />
      </div>
      <div>
        <Footer></Footer>
      </div>
    </div>
  );
}
export default CheckinDetails;

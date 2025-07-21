import HomeHeaderService from "../module/home/HomeHeaderService";
import AppointmentConfirmationContent from "../module/appointmentConfirmation/AppointmentConfirmationContent";
import Footer from "../module/home/Footer";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import React from "react";
import CheckinConfirmationContent from "module/checkinConfirmation/CheckinConfirmationContent";
import HomeHeaderServiceAdmin from "module/home/HomeHeaderServiceAdmin";
import HomeHeaderServiceDoctor from "module/home/HomeHeaderServiceDoctor";
import HomeHeaderServiceNurse from "module/home/HomeHeaderServiceNurse";
import HomeHeaderServiceGuest from "module/home/HomeHeaderServiceGuest";

const CheckinConfirmationPage = () => {
  const navigate = useNavigate();
  const storedName = localStorage.getItem("token");
  const [checkin, setCheckin] = useState();
  const [role, setRole] = useState();

  useEffect(() => {
    if (storedName == null) {
      navigate("/login-user");
    } else {
      try {
        const decoded = jwtDecode(storedName);
        const rol = decoded.roles[0].authority;
        // if (role !== 'USER') {
        //   navigate("/")
        // }
        setRole(rol);
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  const location = useLocation();
  useEffect(() => {
    const appointment = location?.state?.registers;
    // console.log(appointment);
    if (appointment == undefined) {
      navigate("/checkin");
    } else {
      setCheckin(appointment);
    }
  }, []);

  return (
    <div className="bg-white">
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
      <div className="pt-[80px] pl-[190px] text-6xl font-bold py-[20px]">
        <h1>Examination Confirmation</h1>
      </div>
      <div style={{ padding: "3% 12%" }}>
        <CheckinConfirmationContent
          checkin={checkin}
        ></CheckinConfirmationContent>
      </div>
      <div>
        <Footer></Footer>
      </div>
    </div>
  );
};
export default CheckinConfirmationPage;

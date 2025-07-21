import HomeHeaderService from "../module/home/HomeHeaderService";
import Footer from "../module/home/Footer";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import React from "react";
import HomeHeaderServiceNurse from "module/home/HomeHeaderServiceNurse";
import AppointmentConfirmUpdateContent from "module/appointmentConfirmation/AppointmentConfirmUpdateContent";
import HomeHeaderServiceAdmin from "module/home/HomeHeaderServiceAdmin";
import HomeHeaderServiceDoctor from "module/home/HomeHeaderServiceDoctor";
import HomeHeaderServiceGuest from "module/home/HomeHeaderServiceGuest";

const AppointmentConfirmUpdatePage = () => {
  const navigate = useNavigate();
  const storedName = localStorage.getItem("token");
  const [appointment, setAppointment] = useState();
  const [role, setRole] = useState("");

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
    const appointment = location?.state?.registersUpdate;
    console.log(appointment);
    if (appointment == undefined) {
      navigate("/book_appointment");
    } else {
      setAppointment(appointment);
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
        <h1>Appointment Update Confirmation</h1>
      </div>
      <div style={{ padding: "3% 12%" }}>
        <AppointmentConfirmUpdateContent
          appointment={appointment}
        ></AppointmentConfirmUpdateContent>
      </div>
      <div>
        <Footer></Footer>
      </div>
    </div>
  );
};
export default AppointmentConfirmUpdatePage;

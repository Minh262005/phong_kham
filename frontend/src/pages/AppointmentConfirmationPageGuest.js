import HomeHeaderServiceGuest from "../module/home/HomeHeaderServiceGuest";
import AppointmentConfirmationContentGuest from "../module/appointmentConfirmation/AppointmentConfirmationContentGuest";
import Footer from "../module/home/Footer";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import BookAppHeader from "module/bookAppointment/BookAppHeader";
import BookAppHeaderGuest from "module/bookAppointment/BookAppHeaderGuest";
import HomeHeaderServiceNurse from "module/home/HomeHeaderServiceNurse";
import React from "react";

const AppointmentConfirmationPageGuest = () => {
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState();

  const location = useLocation();

  const [role, setRole] = useState("");
  const storedName = localStorage.getItem("token");
  useEffect(() => {
    try {
      const decoded = jwtDecode(storedName);
      const rol = decoded?.roles[0]?.authority;
      setRole(rol);
    } catch (error) {
      console.log(error);
    }
  }, []);
  useEffect(() => {
    const appointment = location?.state?.registers;
    console.log(appointment);
    if (appointment == undefined) {
      navigate("/book_appointment_guest");
    } else {
      setAppointment(appointment);
    }
  }, []);

  return (
    <div className="bg-white">
      <div className="bg-white">
        {role == "" ? (
          <BookAppHeaderGuest></BookAppHeaderGuest>
        ) : role == "NURSE" ? (
          <HomeHeaderServiceNurse></HomeHeaderServiceNurse>
        ) : role == "USER" ? (
          <BookAppHeader></BookAppHeader>
        ) : (
          ""
        )}
      </div>
      <div className="pt-[80px] pl-[190px] text-6xl font-bold py-[20px]">
        <h1>Appointment Confirmation</h1>
      </div>
      <div style={{ padding: "3% 12%" }}>
        <AppointmentConfirmationContentGuest
          appointment={appointment}
        ></AppointmentConfirmationContentGuest>
      </div>
      <div>
        <Footer></Footer>
      </div>
    </div>
  );
};
export default AppointmentConfirmationPageGuest;

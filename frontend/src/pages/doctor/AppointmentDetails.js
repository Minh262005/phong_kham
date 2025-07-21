import Footer from "../../module/home/Footer";
import HomeHeaderService from "../../module/home/HomeHeaderService";
import AppointmentDetailsContent from "../../module/doctor/AppointmentDetailsContent/AppointmentDetailsContent";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import HomeHeaderServiceDoctor from "../../module/home/HomeHeaderServiceDoctor";
import React from "react";
function AppointmentDetails() {
  const navigate = useNavigate();
  const storedName = localStorage.getItem("token");
  const [appointment, setAppointment] = useState();

  useEffect(() => {
    if (storedName == null) {
      navigate("/login-user");
    } else {
      try {
        const decoded = jwtDecode(storedName);
        const role = decoded.roles[0].authority;
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
    const appointment = location?.state?.appointment;
    console.log(appointment);
    if (appointment == undefined) {
      navigate("/schedules");
    } else {
      setAppointment(appointment);
    }
  }, []);

  return (
    <div>
      <div className="bg-white">
        <HomeHeaderServiceDoctor></HomeHeaderServiceDoctor>
      </div>

      <div style={{ padding: "3% 12%" }} className="bg-white">
        <AppointmentDetailsContent appointment={appointment} />
      </div>
      <div>
        <Footer></Footer>
      </div>
    </div>
  );
}
export default AppointmentDetails;

import React, { useEffect, useState } from "react";
import HomeHeader from "../module/home/HomeHeader";
import AboutContent from "../module/about/AboutContent";
import Footer from "../module/home/Footer";
import jwtDecode from "jwt-decode";
import HomeHeaderService from "module/home/HomeHeaderService";
import HomeHeaderServiceDoctor from "module/home/HomeHeaderServiceDoctor";
import HomeHeaderServiceGuest from "module/home/HomeHeaderServiceGuest";
import HomeHeaderServiceNurse from "module/home/HomeHeaderServiceNurse";
import { useNavigate } from "react-router-dom";
import HomeHeaderServiceAdmin from "module/home/HomeHeaderServiceAdmin";

const About = () => {
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
    <div className="bg-white">
      <div className="bg-white">
        {role == "DOCTOR" ? (
          <HomeHeaderServiceDoctor></HomeHeaderServiceDoctor>
        ) : role == "NURSE" ? (
          <HomeHeaderServiceNurse></HomeHeaderServiceNurse>
        ) : role == "USER" ? (
          <HomeHeaderService></HomeHeaderService>
        ) :role == "ADMIN" ? (
          <HomeHeaderServiceAdmin></HomeHeaderServiceAdmin>
        ) : (
          <HomeHeaderServiceGuest></HomeHeaderServiceGuest>
        )}
      </div>
      <div className="pt-[80px] pl-[190px] text-7xl font-bold py-[20px]">
        <h1>Clinicmate Private Clinic</h1>
      </div>
      <div style={{ padding: "5% 12%" }}>
        <AboutContent></AboutContent>
      </div>
      <div>
        <Footer></Footer>
      </div>
    </div>
  );
};
export default About;

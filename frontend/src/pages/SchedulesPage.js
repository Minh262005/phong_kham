import React, { useEffect, useState } from "react";
import HomeHeaderServiceNurse from "../module/home/HomeHeaderServiceNurse";
import Footer from "../module/home/Footer";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import SchedulesContent from "../module/schedules/SchedulesContent.js";
import HomeHeaderService from "module/home/HomeHeaderService";
import HomeHeaderServiceDoctor from "module/home/HomeHeaderServiceDoctor";
import HomeHeaderServiceAdmin from "module/home/HomeHeaderServiceAdmin";
import HomeHeaderServiceGuest from "module/home/HomeHeaderServiceGuest";

const SchedulesPage = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState();
  const [email, setEmail] = useState();

  useEffect(() => {
    const storedName = localStorage.getItem("token");
    if (storedName == null) {
      navigate("/login");
    } else {
      try {
        const decoded = jwtDecode(storedName);
        const role = decoded.roles[0].authority;
        setRole(role);
        setEmail(decoded.sub);
        // console.log(decoded.sub);
        // console.log(decoded.sub);
        if (role !== "DOCTOR" && role !== "NURSE") {
          navigate("/");
        }
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  return (
    <>
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
      <div className="pt-[80px] pl-[190px] text-7xl font-bold py-[20px] bg-white">
        <h1>List of Schedules</h1>
      </div>
      <div className="bg-white" style={{ padding: "5% 12%" }}>
        <SchedulesContent email={email} role={role}></SchedulesContent>
      </div>
      <div>
        <Footer></Footer>
      </div>
    </>
  );
};
export default SchedulesPage;

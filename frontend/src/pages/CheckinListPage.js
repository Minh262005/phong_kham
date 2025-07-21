import React, { useEffect, useState } from "react";
import HomeHeaderServiceNurse from "../module/home/HomeHeaderServiceNurse";
import Footer from "../module/home/Footer";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import SchedulesContent from "../module/schedules/SchedulesContent.js";
import HomeHeaderServiceDoctor from "module/home/HomeHeaderServiceDoctor";
import CheckinListContent from "module/checkins/CheckinListContent";
import HomeHeaderService from "module/home/HomeHeaderService";
import HomeHeaderServiceAdmin from "module/home/HomeHeaderServiceAdmin";

const CheckinListPage = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");

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
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  return (
    <>
      <div className="bg-white">
        {role == "USER" ? (
          <HomeHeaderService></HomeHeaderService>
        ) : role == "NURSE" ? (
          <HomeHeaderServiceNurse></HomeHeaderServiceNurse>
        ) : role == "ADMIN" ? (
          <HomeHeaderServiceAdmin></HomeHeaderServiceAdmin>
        ) : (
          <HomeHeaderServiceDoctor></HomeHeaderServiceDoctor>
        )}
      </div>
      <div className="pt-[95px] pl-[190px] text-7xl font-bold py-[20px] bg-white ">
        <h1>List of Examinations</h1>
      </div>
      <div className="bg-white" style={{ padding: "5% 8%" }}>
        <CheckinListContent email={email} role={role}></CheckinListContent>
      </div>
      <div>
        <Footer></Footer>
      </div>
    </>
  );
};
export default CheckinListPage;

import React, { useEffect, useState } from "react";
import HomeHeader from "../module/home/HomeHeader";
import Footer from "../module/home/Footer";
import { useLocation, useNavigate } from "react-router";
import HomeHeaderService from "../module/home/HomeHeaderService";
import DoctorContent from "../module/faq/DoctorContent";
import jwtDecode from "jwt-decode";
import HomeHeaderServiceAdmin from "module/home/HomeHeaderServiceAdmin";
import HomeHeaderServiceDoctor from "module/home/HomeHeaderServiceDoctor";
import HomeHeaderServiceGuest from "module/home/HomeHeaderServiceGuest";
import HomeHeaderServiceNurse from "module/home/HomeHeaderServiceNurse";

const ListDoctor = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [docList, setDocList] = useState([]);
  console.log("list doctor" + location.state);
  const storedName = localStorage.getItem("token");
  const [role, setRole] = useState("");
  useEffect(() => {
    if (storedName == null) {
      navigate("/login-user");
    } else {
      try {
        const decoded = jwtDecode(storedName);
        const rol = decoded.roles[0].authority;
        setRole(rol);
      } catch (error) {
        console.log(error);
      }
    }
  }, []);
  useEffect(() => {
    console.log("list doctor" + location.state);
    if (location.state != null) {
      setDocList(location.state.docList);
    } else {
      navigate("/service");
    }
  }, []);

  return (
    <div className="bg-white w-[100%]">
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
      <div className="pt-[80px] pl-[190px] text-5xl font-bold py-[20px]">
        <h1>List of Doctors</h1>
      </div>
      <div className="w-[100%]" style={{ padding: "0.5% 12.5%" }}>
        <DoctorContent docList={docList} role={role}></DoctorContent>
      </div>
      <div>
        <Footer></Footer>
      </div>
    </div>
  );
};
export default ListDoctor;

import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import HomeHeaderServiceNurse from "../module/home/HomeHeaderServiceNurse";
import HomeHeaderService from "module/home/HomeHeaderService";
import HomeHeaderServiceAdmin from "module/home/HomeHeaderServiceAdmin";
import HomeHeaderServiceDoctor from "module/home/HomeHeaderServiceDoctor";
import HomeHeaderServiceGuest from "module/home/HomeHeaderServiceGuest";

const CheckinPage = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("");

  useEffect(() => {
    const storedName = localStorage.getItem("token");
    if (storedName == null) {
      navigate("/login-user");
    } else {
      try {
        const decoded = jwtDecode(storedName);
        const role = decoded.roles[0].authority;
        setRole(role);
        if (role !== "NURSE") {
          navigate("/");
        }
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  return (
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
      <div>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default CheckinPage;

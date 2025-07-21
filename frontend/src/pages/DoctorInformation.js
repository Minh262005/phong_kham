import HomeHeaderService from "../module/home/HomeHeaderService";
import DoctorInformationContent from "../module/doctorinformation/DoctorInformationContent";
import Footer from "../module/home/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import { publicPort } from "../components/url/link";
import { useLocation, useNavigate } from "react-router";
import React from "react";
import HomeHeaderServiceAdmin from "module/home/HomeHeaderServiceAdmin";
import HomeHeaderServiceDoctor from "module/home/HomeHeaderServiceDoctor";
import HomeHeaderServiceGuest from "module/home/HomeHeaderServiceGuest";
import HomeHeaderServiceNurse from "module/home/HomeHeaderServiceNurse";

function DoctorInformation() {
  const navigate = useNavigate();
  const location = useLocation();
  const [doctId, setDoctId] = useState();
  useEffect(() => {
    console.log("id doctor" + location.state);
    const docId = location?.state?.id;
    console.log(docId);
    if (docId == undefined) {
      navigate("/service");
    } else {
      setDoctId(docId);
    }
  }, []);
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
      } catch (error) {
        console.log(error);
      }
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
      <div className="bg-white">
        <DoctorInformationContent docId={doctId} />
      </div>
      <div>
        <Footer></Footer>
      </div>
    </div>
  );
}
export default DoctorInformation;
function jwtDecode(storedName) {
  throw new Error("Function not implemented.");
}

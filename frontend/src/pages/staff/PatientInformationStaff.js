import HomeHeaderService from "../../module/home/HomeHeaderService";
import Footer from "../../module/home/Footer";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import React from "react";
import PatientInformationContent from "module/staff/doctorinformation/PatientInformationContent";
import jwtDecode from "jwt-decode";
import HomeHeaderServiceAdmin from "module/home/HomeHeaderServiceAdmin";
import HomeHeaderServiceDoctor from "module/home/HomeHeaderServiceDoctor";
import HomeHeaderServiceNurse from "module/home/HomeHeaderServiceNurse";

function PatientInformationStaff() {
  const navigate = useNavigate();
  const location = useLocation();
  const [doctId, setDoctId] = useState();
  const [role, setRole] = useState("");
  const storedName = localStorage.getItem("token");
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
    const docId = location?.state?.id;
    console.log(docId);
    if (docId == undefined) {
      navigate("/service");
    } else {
      setDoctId(docId);
    }
  }, []);
  return (
    <div className="bg-white">
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
      <div className="bg-white">
        <PatientInformationContent docId={doctId} />
      </div>
      <div>
        <Footer></Footer>
      </div>
    </div>
  );
}
export default PatientInformationStaff;

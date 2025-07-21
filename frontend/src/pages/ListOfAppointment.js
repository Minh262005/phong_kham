import jwtDecode from "jwt-decode";
import Footer from "module/home/Footer";
import HomeHeaderService from "module/home/HomeHeaderService";
import HomeHeaderServiceAdmin from "module/home/HomeHeaderServiceAdmin";
import HomeHeaderServiceDoctor from "module/home/HomeHeaderServiceDoctor";
import HomeHeaderServiceGuest from "module/home/HomeHeaderServiceGuest";
import HomeHeaderServiceNurse from "module/home/HomeHeaderServiceNurse";
import ListOfAppointmentContent from "module/ListofAppointmentContent/ListOfAppointmentContent";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ListOfAppointment() {
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const [mail, setmail] = useState("");

  useEffect(() => {
    const storedName = localStorage.getItem("token");
    if (storedName == null) {
      navigate("/login");
    } else {
      try {
        const decoded = jwtDecode(storedName);
        const role = decoded.roles[0].authority;
        setRole(role);
        setmail(decoded.sub);
      } catch (error) {
        console.log(error);
      }
    }
  }, []);
  return (
    <div className="w-[100%] min-h-[1000px] bg-white flex justify-center">
      <div className="w-[80%] min-h-[1000px] bg-white">
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
        <div className="w-[100%] h-[100px] flex items-center">
          <h1 className="text-[40px] font-bold"> List of Appointments</h1>
        </div>
        <div className="bg-white">
          <ListOfAppointmentContent role={role} mail={mail} />
        </div>
        <div className="bg-white">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default ListOfAppointment;

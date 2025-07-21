import React, { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import SpecialtiesContent from "module/admin/specialtymanagement/SpecialtiesContent";
import HomeHeaderServiceAdmin from "module/home/HomeHeaderServiceAdmin";
import Footer from "module/home/Footer";

const SpecialtiesPage = () => {
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
        if (role != "ADMIN") {
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
        <HomeHeaderServiceAdmin />
      </div>
      <div className="pt-[80px] pl-[190px] text-7xl font-bold py-[20px] bg-white">
        <h1>Internal Information</h1>
      </div>
      <div className="bg-white" style={{ padding: "5% 12%" }}>
        <SpecialtiesContent role={role} mail={mail}></SpecialtiesContent>
      </div>
      <div>
        <Footer></Footer>
      </div>
    </>
  );
};
export default SpecialtiesPage;

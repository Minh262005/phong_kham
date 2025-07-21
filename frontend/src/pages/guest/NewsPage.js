import Footer from "../../module/home/Footer";
import NewsPageContent from "../../module/guest/NewsPageContent/NewsPageContent";
import HomeHeaderService from "../../module/home/HomeHeaderService";
import React, { useEffect, useState } from "react";
import HomeHeaderServiceDoctor from "module/home/HomeHeaderServiceDoctor";
import HomeHeaderServiceGuest from "module/home/HomeHeaderServiceGuest";
import HomeHeaderServiceNurse from "module/home/HomeHeaderServiceNurse";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import HomeHeaderServiceAdmin from "module/home/HomeHeaderServiceAdmin";

function NewsPage() {
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
    <div>
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
      <div className="w-[100%] h-[130px] bg-white flex items-center">
        <h1 className="ml-[11%] text-[20px] font-bold">News</h1>
      </div>
      <div className="bg-white">
        <NewsPageContent />
      </div>
      <div>
        <Footer></Footer>
      </div>
    </div>
  );
}
export default NewsPage;

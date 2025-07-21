import jwtDecode from "jwt-decode";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HomeHeaderServiceAdmin from "module/home/HomeHeaderServiceAdmin";
import CreateNewSymptomContent from "module/admin/symptommanagement/CreateNewSymptomContent";
import Footer from "module/home/Footer";

function CreateNewSymptom() {
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const [mail, setMail] = useState("");

  useEffect(() => {
    const storedName = localStorage.getItem("token");
    if (storedName == null) {
      navigate("/login-user");
    } else {
      try {
        const decoded = jwtDecode(storedName);
        const role = decoded.roles[0].authority;
        const mal = decoded.sub;
        setMail(mal);
        setRole(role);
        if (role !== "ADMIN") {
          navigate("/");
        }
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  return (
    <div className="w-[100%] min-h-[1000px] bg-white flex justify-center">
      <div className="w-[80%] min-h-[1000px] bg-white">
        <div className="bg-white">
          <HomeHeaderServiceAdmin></HomeHeaderServiceAdmin>
        </div>
        <div className="w-[100%] h-[200px] flex items-center">
          <h1 className="text-[40px] font-bold"> Create symptom</h1>
        </div>
        <div className="bg-white">
          <CreateNewSymptomContent />
        </div>
        <div className="bg-white">
          <Footer />
        </div>
      </div>
    </div>
  );
}
export default CreateNewSymptom;

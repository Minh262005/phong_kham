import jwtDecode from "jwt-decode";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HomeHeaderServiceAdmin from "module/home/HomeHeaderServiceAdmin";
import EditSpecContent from "module/admin/specialtymanagement/EditSpecContent";
import Footer from "module/home/Footer";

function EditSpec() {
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

  const location = useLocation();
  const locaTf = location?.state?.item;
  console.log(locaTf);

  return (
    <div className="w-[100%] min-h-[1000px] bg-white flex justify-center">
      <div className="w-[80%] min-h-[1000px] bg-white">
        <div className="bg-white">
          <HomeHeaderServiceAdmin></HomeHeaderServiceAdmin>
        </div>
        <div className="w-[100%] h-[200px] flex items-center">
          <h1 className="text-[40px] font-bold"> Edit Specialty</h1>
        </div>
        <div className="bg-white">
          <EditSpecContent item={locaTf}></EditSpecContent>
        </div>
        <div className="bg-white">
          <Footer />
        </div>
      </div>
    </div>
  );
}
export default EditSpec;

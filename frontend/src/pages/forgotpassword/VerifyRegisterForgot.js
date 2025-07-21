import HomeHeaderService from "../../module/home/HomeHeaderService";
import Footer from "../../module/home/Footer";
import VerifyRegisterContent from "../../module/forgotpassword/verifyRegister/VerifyRegisterContent";
import { useLocation, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import React from "react";

function VerifyRegisterForgot() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const location = useLocation();
  useEffect(() => {
    const email = location?.state?.email;
    console.log(email);
    if (email == undefined) {
      navigate("/registerenteremail");
    } else {
      setEmail(email);
    }
  }, []);

  return (
    <div>
      <div className="bg-white">
        {/* <HomeHeaderService></HomeHeaderService> */}
      </div>
      <div>
        <VerifyRegisterContent email={email} />
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
}
export default VerifyRegisterForgot;

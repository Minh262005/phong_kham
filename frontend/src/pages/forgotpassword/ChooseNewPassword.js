import HomeHeaderService from "../../module/home/HomeHeaderService";
import Footer from "../../module/home/Footer";
import ChooseNewPasswordContent from "../../module/forgotpassword/choosenewpassword/ChooseNewPasswordContent";
import { useLocation, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import React from "react";

function ChooseNewPassword() {
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
        <ChooseNewPasswordContent email={email} />
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
}
export default ChooseNewPassword;

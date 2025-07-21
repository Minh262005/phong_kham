import HomeHeaderService from "../module/home/HomeHeaderService";
import Footer from "../module/home/Footer";
import VerifyRegisterContent from "../module/verifyRegister/VerifyRegisterContent";
import VerifyRegisterContentForNotEmail from "../module/verifyRegister/VerifyRegisterContentForNotEmail";
import { useLocation, useNavigate } from "react-router";
import React from "react";

function VerifyRegister() {
  const location = useLocation();
  const navigate = useNavigate();

  var mail = "";
  if (location.state != null) {
    mail = location.state.mail;
  }
  console.log(mail);

  return (
    <div>
      <div className="bg-white">
        {/* <HomeHeaderService></HomeHeaderService> */}
      </div>
      {mail == "" ? (
        <div>
          <VerifyRegisterContentForNotEmail />
        </div>
      ) : (
        <div>
          <VerifyRegisterContent mail={mail} />
        </div>
      )}
      <div>
        <Footer />
      </div>
    </div>
  );
}
export default VerifyRegister;

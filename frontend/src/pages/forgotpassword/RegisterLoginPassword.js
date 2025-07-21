import { useLocation, useNavigate } from "react-router";
import avatar from "../../Images/clip.png";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import { useEffect, useState } from "react";
import axios from "axios";
import { localPort, publicPort } from "../../components/url/link";
import { async } from "q";
import React from "react";

function RegisterLoginPassword() {
  const navigate = useNavigate();
  const [email, setEnail] = useState("");
  const location = useLocation();

  useEffect(() => {
    const email = location?.state?.email;
    console.log(email);
    if (email == undefined) {
      navigate("/registerenteremail");
    } else {
      setEnail(email.mail);
    }
  }, []);

  const backEnterEmail = () => {
    navigate("/registerenteremail");
  };

  const handleSendOTP = async () => {
    // setDisabled(true);
    alert("Please check email to receive OTP");
    // TODO: send email
    const response = await axios.get(
      publicPort + `patient/forgot?email=${email}`
    );
    console.log(response);
    if (response.data == "Send OTP success") {
      navigate("/verifyregisterforgot", { state: { email } });
    } else {
      alert(response.data);
    }
  };

  return (
    <div className="w-[100%] min-h-[1000px] bg-gradientLeft">
      <div className="w-[100%] h-[100px] flex justify-center items-center">
        <h1 className="text-white text-[30px] ">Forgot Password</h1>
      </div>
      <div className="w-[70%] min-h-[500px] bg-white rounded-3xl mx-auto flex">
        <div className="w-[50%] flex justify-center items-center">
          <img src={avatar} alt="aaa" className="w-[80%]" />
        </div>
        <div className="w-[50%] flex items-center">
          <div>
            <div className="w-[100%] min-h-[100px]">
              <h1 className="font-bold text-[40px] w-[50%]">
                Forgot Password ?
              </h1>
            </div>
            <div className="w-[100%] min-h-[80px]">
              <p className="font-medium text-[#7f7f7f] text-[25px] w-[60%]">
                We'll send you a code to your email address
              </p>
            </div>
            <div className="w-[100%] h-[100px]">
              <p className="text-[#7f7f7f]">
                We'll send you a code to your email address:
              </p>
              <p className="font-bold">{email}</p>
              <p className="font-bold text-gradientLeft">
                Log in with password
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center  w-[100%] h-[50px] mt-[20px]">
        <div className="flex items-center justify-between w-[70%]">
          <div className="flex h-[50px] w-[25%] items-center">
            <span className="w-[10%]">
              <MdKeyboardArrowLeft className="text-5xl text-white" />
            </span>
            <span
              className="w-[100%] text-3xl text-white"
              onClick={backEnterEmail}
            >
              Enter email address
            </span>
          </div>
          <div className="flex h-[40px] w-[17%] items-center bg-white justify-center rounded-[50px] ">
            <span
              className="w-[25%] text-3xl text-gradientLeft flex justify-end"
              onClick={handleSendOTP}
            >
              Next
            </span>
            <span className="w-[10%]">
              <MdKeyboardArrowRight className="text-5xl text-gradientLeft" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
export default RegisterLoginPassword;

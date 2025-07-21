import { useNavigate } from "react-router";
import avatar from "../../Images/clip.png";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import { useState } from "react";
import { event } from "jquery";
import React from "react";

function RegisterEnterEmail() {
  const [email, setEmail] = useState({
    mail: "",
  });

  const handleChangeEmail = (event) => {
    const { name, value } = event.target;
    console.log(name);
    console.log(value);

    const newEmail = {
      ...email,
      [name]: value,
    };
    setEmail(newEmail);
  };

  const navigate = useNavigate();
  const backLogin = () => {
    navigate("/login");
  };
  const nextSendOTP = () => {
    console.log("next");
    if (email == "" || email == undefined) {
      alert("Please enter email");
    } else {
      navigate("/registerloginpassword", { state: { email } });
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
            <div className="w-[100%] min-h-[100px]">
              <p className="font-medium text-[#7f7f7f] text-[25px] w-[60%]">
                Enter the email address associated with you account
              </p>
            </div>
            <div className="w-[100%] h-[100px]">
              <div className="w-[60%] h-[45px] rounded-2xl flex justify-center items-center border-[#dddddd] border-[1px]">
                <input
                  type="email"
                  name="mail"
                  onChange={handleChangeEmail}
                  className="w-[90%] h-[40px]"
                  placeholder="Enter Email Address"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center  w-[100%] h-[50px] mt-[20px]">
        <div className="flex items-center justify-between w-[70%]">
          <div className="flex h-[50px] w-[20%] items-center">
            <span className="w-[20%]">
              <MdKeyboardArrowLeft className="text-5xl text-white" />
            </span>
            <span className="w-[80%] text-3xl text-white" onClick={backLogin}>
              Back to Login
            </span>
          </div>
          <div className="flex h-[40px] w-[17%] items-center bg-white justify-center rounded-[50px] ">
            <span
              className="w-[25%] text-3xl text-gradientLeft flex justify-end"
              onClick={nextSendOTP}
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
export default RegisterEnterEmail;

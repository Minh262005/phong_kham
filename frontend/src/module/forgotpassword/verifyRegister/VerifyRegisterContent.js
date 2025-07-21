import axios from "axios";
import { useEffect, useState } from "react";
import { localPort, publicPort } from "../../../components/url/link";
import { useNavigate } from "react-router";
import React from "react";

function VerifyRegisterContent({ email }) {
  const navigate = useNavigate();
  const [otp, setOtp] = useState([
    {
      Votp: "",
    },
  ]);

  const [disabled, setDisabled] = useState(true);
  const [remainingTime, setRemainingTime] = useState(60);
  useEffect(() => {
    let timer;
    if (remainingTime > 0 && disabled) {
      timer = setTimeout(() => {
        setRemainingTime(remainingTime - 1);
      }, 1000);
    } else {
      setDisabled(false);
      setRemainingTime(60);
    }
    return () => clearTimeout(timer);
  }, [remainingTime, disabled]);

  const handleChangeOTP = (event) => {
    const { name, value } = event.target;

    console.log(name);
    console.log(value);

    if (name === "Votp") {
      const newOtp = {
        ...otp,
        [name]: value,
      };
      console.log("set otp");
      setOtp(newOtp);
    }
  };

  const handleClickResend = async () => {
    setDisabled(true);
    alert("Please check email to receive OTP");
    // TODO: send email
    const response = await axios.get(
      publicPort + `patient/resend?email=${email}`
    );
    console.log(response);
  };

  const verifyOTP = async () => {
    console.log(otp.Votp);
    if (otp.Votp != undefined && otp.Votp != "") {
      const response = await axios.get(
        publicPort + `patient/checkotpforgot?otp=${otp.Votp}&email=${email}`
      );
      console.log(response);
      if (response.data == "verify success") {
        navigate("/choosenewpassword", { state: { email } });
      } else {
        alert("OTP is wrong, please check email again");
      }
    } else {
      alert("Please fill OTP");
    }
  };
  return (
    <div className="flex justify-center">
      <div className="min-h-[500px] w-[50%] mb-[100px] bg-white mt-[50px] rounded-[20px]">
        <div className="pt-[5%] pl-[8%] pr-[7%]">
          <div className="w-[100%] h-[80px]">
            <h1 className="text-[30px] font-bold w-[75%]">
              Enter security code
            </h1>
          </div>
          <div className=" w-[100%]">
            <span className="text-grayborder2">
              Please check your emails for a message with your code. Your code
              is 6 numbers long.
            </span>
            <div>
              <span className="text-grayborder2 mr-[3px]">
                We sent your code to:
              </span>
              <span>{email}</span>
            </div>
          </div>
          <div className="w-[100%] h-[80px] flex items-center">
            <div className="w-[25%] h-[45px] rounded-2xl flex justify-center items-center border-[#dddddd] border-[1px]">
              <input
                name="Votp"
                onChange={handleChangeOTP}
                className="w-[90%] h-[40px]"
                placeholder="CM -"
              />
            </div>
          </div>
          <div></div>
          <hr className="w-[100%] text-grayborder2 font-normal mt-[10%] mb-[20px]" />
          <div className=" w-[100%] h-[45px] flex justify-end">
            <span className="w-[30%] bg-[#b9b4b4] h-[50px] mr-[30px] rounded-2xl flex items-center justify-center">
              <button onClick={handleClickResend} disabled={disabled}>
                Send OTP ({remainingTime}s)
              </button>
            </span>
            <span className="w-[30%] bg-[#516af8] h-[50px] rounded-2xl">
              <button
                className="w-[100%] h-[40px] text-white mt-[5px] font-bold"
                onClick={verifyOTP}
              >
                Verify
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
export default VerifyRegisterContent;

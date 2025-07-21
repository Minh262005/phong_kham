import React from "react";
import Successfull from "../../Images/Saly-44.png";
import { useNavigate } from "react-router-dom";

function SuccessfullContent() {
  const navigate = useNavigate();
  const goHome = () => {
    navigate("/");
  };
  return (
    <div className="w-[100%] min-h-[1000px] ">
      <div className="w-[100%] h-[300px] flex justify-center items-center ">
        <div className="max-w-[30%] h-auto">
          <img src={Successfull} alt="" />
        </div>
      </div>
      <div className="w-[100%] h-[100px] flex justify-center">
        <h1 className="text-[40px] font-bold text-gradientLeft">
          Successfully!
        </h1>
      </div>
      <div className="w-[100%] h-[50px] flex justify-center ">
        <p className="text-[20px]">
          Thank you for your booking, please wait for a call to confirm this
          appointment.
        </p>
      </div>
      <div className="w-[100%] h-[100px] flex justify-center">
        <button
          className="border-[1px] rounded-2xl h-[50px] pl-[30px] pr-[30px] w-[30%] mr-[35px]"
          style={{
            borderColor: "#5562f7",
            color: "#5562f7",
          }}
          onClick={goHome}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
export default SuccessfullContent;

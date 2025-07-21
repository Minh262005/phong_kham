import { IoIosEye } from "react-icons/io";
import { GrLike, GrDislike } from "react-icons/gr";
import { useState } from "react";
import React from "react";

function FeedbackButton() {
  const [active, setActive] = useState(null);

  const handleButtonClick = (buttonId) => {
    setActive(buttonId);
  };

  return (
    <div
      className="w-[100%] h-[45px] bg-[#f6f7f9] rounded-[10px] flex items-center border border-[#d8d7da] p-4"
      style={{}}
    >
      <div className="flex mr-28 ml-5">
        <button className="text-6xl mr-2">
          <IoIosEye />
        </button>
        <div>116.6k</div>
      </div>
      <div className="flex mr-3">
        <button
          className="text-4xl m-[4px] bg-[#f6f7f9] p-[10px] rounded-[5px] mr-2 border border-[#d8d7da] p-4"
          style={{ backgroundColor: active === 1 ? "red" : "" }}
          onClick={() => handleButtonClick(1)}
        >
          <GrLike />
        </button>
        <button
          className="text-4xl m-[4px] bg-[#f6f7f9] p-[10px] rounded-[5px] border border-[#d8d7da] p-4"
          style={{ backgroundColor: active === 2 ? "red" : "" }}
          onClick={() => handleButtonClick(2)}
        >
          <GrDislike />
        </button>
      </div>
      <p>Is the article helpful?</p>
    </div>
  );
}
export default FeedbackButton;

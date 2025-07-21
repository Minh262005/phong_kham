import React from "react";
import { useNavigate } from "react-router-dom";

function MenuItem({ data }) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/login-user");
  };
  const handleProfile = () => {
    navigate("/profilepage");
  };
  const handleLogout = () => {
    //log out here
    localStorage.removeItem("token");
    navigate("/login-user");
  };

  return (
    <div>
      <button
        className="p-[5px] w-[100%] relative hover:bg-secondary rounded-lg"
        onClick={
          data.title === "Log out"
            ? handleLogout
            : data.title == "Profile"
            ? handleProfile
            : null
        }
      >
        {data.title}
      </button>
      <span
        className="absolute top-[80%] left-[77%]"
        style={{ display: "inline-block", fontSize: "4rem" }}
      >
        {data.icon}
      </span>
    </div>
  );
}
export default MenuItem;

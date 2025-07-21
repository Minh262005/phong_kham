import React from "react";

const InputInfo = ({ name, type, icon, placeholder, handleChangeName, value, disabled }) => {
  return (
    <div className="relative flex gap-[2.4rem] py-[1.6rem] items-center border-b border-grayborder">
      <span>{icon}</span>
      <input
      onChange={handleChangeName}
        placeholder={placeholder || "Content"}
        className="text-black1 placeholder:text-black1 text-[2rem]"
        type={type || "text"}
        name={name}
        value={value}
        disabled={disabled}
      />
    </div>
  );
};

export default InputInfo;

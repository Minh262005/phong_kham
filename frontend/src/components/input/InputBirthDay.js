import React from "react";
import { useController } from "react-hook-form";

const InputBirthDay = ({ placeholder, icon, type, handleChangeName, className, control, name, ...rest }) => {
  const { field } = useController({
    control,
    name,
    defaultValue: "",
  });
  return (
    <div style={{ color: "#a6a5a5" }}>
      <span>{icon}</span>
      <input
        {...rest}
        {...field}
        placeholder={"Birthday"}
        className={`text-[2rem] block border-grayborder  w-full p-[20px_23px] rounded-[16px] border border-gray3 `}
        type={type || "text"}
        name="bdate"
      />
    </div>
  );
};

export default InputBirthDay;

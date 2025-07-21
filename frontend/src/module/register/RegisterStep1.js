import React, { useState } from "react";
import DateTimePicker from "react-datetime-picker";
import Input from "../../components/input/Input";
import InputBirthDay from "../../components/input/InputBirthDay";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";

const RegisterStep1 = ({ control, handleChangeName }) => {
  const [value, onChange] = useState(new Date());
  return (
    <div className="p-[9rem_154px] gap-[76px] flex">
      <div className="flex flex-col flex-1 gap-[32px]">
        <Input
          placeholder="Name *"
          type="text"
          control={control}
          name="pname"
        ></Input>
        <Input
          placeholder="Your Password *"
          type="password"
          control={control}
          name="password"
        ></Input>
        <InputBirthDay
          // handleChangeName={handleChangeName}
          placeholder="BirthDate *"
          type="date"
          control={control}
          name="bdate"
        ></InputBirthDay>
      </div>
      <div className="flex flex-col flex-1 gap-[32px]">
        <Input
          placeholder="Your Email*"
          type="email"
          control={control}
          name="email"
        ></Input>
        <Input
          placeholder="Confirm Your Password *"
          type="password"
          control={control}
          name="cpassword"
        ></Input>
        <Input
          placeholder="Social Security Number *"
          type="number"
          control={control}
          name="socialsecurity"
        ></Input>
      </div>
    </div>
  );
};

export default RegisterStep1;

import React, { useEffect, useState } from "react";
import LayoutSign from "../layout/LayoutSign";
import Button from "../components/button/Button";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../components/Logo/Logo";
import { useForm } from "react-hook-form";
import axios from "axios";
import InputUsername from "../components/input/InputUsername";
import InputPassword from "../components/input/InputPassword";
import { publicPort } from "../components/url/link";

const LoginPage = () => {
  const navigate = useNavigate();
  const { control } = useForm();
  const [data, setData] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const storedName = localStorage.getItem("token");
    if (storedName !== null) {
      navigate("/");
    }
  }, []);

  const handleChangeUsername = (event) => {
    const userinput = event.target.value;
    // console.log(userinput);
    setUsername(event.target.value);
  };
  const handleChangePassword = (event) => {
    setPassword(event.target.value);
    // console.log(password);
  };

  //doc1@gmail.com - 123
  const handleSubmit = async (event) => {
    event.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(username);

    if (!isValidEmail) {
      // do something
      alert("Incorrect Email format");
      return;
    }
    const response = await axios.post(publicPort + `api/login`, {
      email: username,
      password: password,
    });
    // console.log(response);
    if (response.data == "You have no permission to login.") {
      alert("You have no permission to login.");
      return;
    }
    if (response.data.token === undefined) {
      alert("Incorrect email or password.");
    }

    if (response.data.token.length > 0) {
      const tokenn = response.data.token;
      console.log("true");
      localStorage.setItem("token", response.data.token);
      navigate("/service", { state: { tokenn } });
    }
  };

  return (
    <LayoutSign
      header="Login"
      childrenStyle="!max-w-[500px] rounded-3xl overflow-hidden"
    >
      <div className="bg-white p-[40px_42px]">
        <div className="flex flex-col items-center justify-center">
          <Logo></Logo>
          <span className="text-[9px] text-gray2">Clinic Management</span>
        </div>
        <div className="flex w-[100%] justify-center mt-[10px]">
          <div className=" flex items-center justify-center gap-1 w-[45%] h-[70px] rounded-2xl mr-[10%] border-[#d8d7da] border-[1px]">
            <Link
              to="/login-user"
              className="   text-[#a2a7af] flex items-center"
            >
              <input className="w-[20px] h-[20px]" type="radio" />
              <p className="text-[20px] ml-[10px]">For user!</p>
            </Link>
          </div>
          <div className=" flex items-center justify-center gap-1 w-[45%] h-[70px] rounded-2xl border-[#d8d7da] border-[1px]">
            <Link
              to="/login"
              className="   text-textColor    flex items-center"
            >
              <input className="w-[20px] h-[20px]" type="radio" checked />
              <p className="text-[20px] ml-[10px]">For staff!</p>
            </Link>
          </div>
        </div>
        <form autoComplete="off" className="mt-9" onSubmit={handleSubmit}>
          <InputUsername
            handleChangeUsername={handleChangeUsername}
            type="text"
            placeholder="Username or Email"
            control={control}
            name="email"
            username={username}
          ></InputUsername>
          <InputPassword
            handleChangePassword={handleChangePassword}
            password={password}
            name="password"
            type="password"
            className="mt-8"
            placeholder="Password"
            control={control}
          ></InputPassword>
          <div className="flex justify-between mt-[10px]"></div>
          <Button className="mt-8" type="submit">
            Login
          </Button>
        </form>
      </div>
    </LayoutSign>
  );
};

export default LoginPage;

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
import AiFillGoogleCircle from "../Images/gggogle.png";
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { app } from '../firebase';

const LoginPageUser = () => {
  const navigate = useNavigate();
  const { control } = useForm();
  const [data, setData] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const storedName = localStorage.getItem("token");
    if (storedName !== null) {
      navigate("/service");
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
      alert("Incorrect Email format");
      return;
    }
    try {
      const response = await axios.post(publicPort + `patient/login`, {
        email: username,
        password: password,
      });
      if (!response.data.token) {
        alert("Incorrect email or password.");
        return;
      }
      if (response.data.token.length > 0) {
        const tokenn = response.data.token;
        localStorage.setItem("token", response.data.token);
        navigate("/service", { state: { tokenn } });
      }
    } catch (error) {
      if (error.response) {
        // Hiển thị lỗi chi tiết từ backend
        console.log("Lỗi backend:", error.response.status, error.response.data);
        alert(error.response.data.message || "Đăng nhập thất bại");
      } else {
        alert("Lỗi kết nối server");
      }
    }
  };
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const db = getFirestore(app);

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const idToken = await user.getIdToken();
      // Gửi idToken lên backend
      const response = await axios.post(publicPort + `patient/logingoogle`, {
        idToken
      });
      if (response.data.token === undefined) {
        alert("Incorrect email or password.");
      }
      if (response.data.token.length > 0) {
        const tokenn = response.data.token;
        localStorage.setItem("token", response.data.token);
        navigate("/service", { state: { tokenn } });
      }
    } catch (error) {
      console.error(error);
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
              className="  text-textColor flex items-center"
            >
              <input className="w-[20px] h-[20px]" type="radio" checked />
              <p className="text-[20px] ml-[10px]">For user!</p>
            </Link>
          </div>
          <div className=" flex items-center justify-center gap-1 w-[45%] h-[70px] rounded-2xl border-[#d8d7da] border-[1px]">
            <Link to="/login" className="  text-[#a2a7af] flex items-center">
              <input className="w-[20px] h-[20px]" type="radio" />
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
            className=""
          ></InputUsername>
          <InputPassword
            handleChangePassword={handleChangePassword}
            password={password}
            name="password"
            type="password"
            className="mt-8"
            placeholder="Password"
            control={control}
            value={password}
          ></InputPassword>
          <div className="flex justify-between mt-[10px]">
            <div className="flex items-center gap-1 text-textColor">
              <input
                type="checkbox"
                className="w-[16px] h-[16px] border border-textColor"
                onChange={() => {}}
              />
              <label htmlFor="">Remember me</label>
            </div>
            <div>
              <Link to="/registerenteremail" className="text-gradientLeft">
                Forgot Password?
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-[40%]">
              <hr className="text-[#c5bfbf]" />
            </div>
            <div className="w-[20%] flex justify-center text-[#c5bfbf]">
              <p>Or</p>
            </div>
            <div className="w-[40%] text-[#c5bfbf]">
              <hr />
            </div>
          </div>
          <Button
            className="mt-8"
            type="submit"
            onClick={() => {}}
          >
            Login
          </Button>
        </form>
        <div className="w-[100%] h-[40px] bg-[#e2edff]  mt-3 rounded-full flex items-center cursor-pointer"
          onClick={handleGoogleLogin}
        >
          <div

            className="w-[30%] h-[40px] ml-1"
          >
            <img src={AiFillGoogleCircle} className="w-[30%] h-[100%]" />
          </div>
          <div className="w-[70%] flex justify-start">
            <p>
              Login with Google
            </p>
          </div>
        </div>
        <div
          className="mt-[32px] flex items-center justify-center gap-1 "
          style={{ marginTop: "1rem", marginBottom: "-2rem" }}
        >
          <span className="text-gray2">New User?</span>
          <Link to="/register" className="text-textColor">
            Sign up here!
          </Link>
        </div>
      </div>
    </LayoutSign>
  );
};

export default LoginPageUser;


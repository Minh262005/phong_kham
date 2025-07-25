// services/auth.service.js
import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;

const register = (username, email, password) => {
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
  });
};

const login = (email, password) => {
  return axios
    .post(API_URL + "patient/login", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};

const loginWithGoogle = (email, displayName) => {
  return axios
    .post(API_URL + "patient/logingoogle", {
      email,
      displayName,
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const AuthService = {
  register,
  login,
  loginWithGoogle,
  logout,
};

export default AuthService;
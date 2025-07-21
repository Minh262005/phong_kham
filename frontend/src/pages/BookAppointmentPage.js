import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import BookAppHeader from "../module/bookAppointment/BookAppHeader";
import jwtDecode from "jwt-decode";

const BookAppointmentPage = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("");

  useEffect(() => {
    const storedName = localStorage.getItem("token");
    if (storedName == null) {
      navigate("/login-user");
    } else {
      try {
        const decoded = jwtDecode(storedName);
        const role = decoded.roles[0].authority;
        setRole(role);
        // if (role !== 'USER') {
        //   navigate("/")
        // }
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  return (
    <div className="bg-white">
      <BookAppHeader></BookAppHeader>

      <div>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default BookAppointmentPage;

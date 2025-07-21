import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import jwtDecode from "jwt-decode";
import BookAppHeader from "module/bookAppointment/BookAppHeader";

const BookAppointmentPageGuest = () => {
  const [role, setRole] = useState("");
  const storedName = localStorage.getItem("token");
  useEffect(() => {
    try {
      const decoded = jwtDecode(storedName);
      const rol = decoded?.roles[0]?.authority;
      setRole(rol);
    } catch (error) {
      console.log(error);
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

export default BookAppointmentPageGuest;

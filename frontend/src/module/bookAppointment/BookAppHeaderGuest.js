import React from "react";
import Logo from "../../components/Logo/Logo";
import { NavLink, useNavigate } from "react-router-dom";

const bookappointment = [
  {
    id: 1,
    to: "/",
    title: "Home",
  },
  {
    id: 2,
    to: "/about",
    title: "About",
  },
  {
    id: 3,
    to: "/faq",
    title: "FAQ",
  },
];
const BookAppHeaderGuest = () => {
  const navigate = useNavigate();
  return (
    <div className="max-w-[1156px] gap-[46px] mx-auto flex items-center pt-[45px]">
      <div>
        <Logo></Logo>
      </div>
      <nav className="home-nav">
        <ul>
          {bookappointment.length > 0 &&
            bookappointment.map((item) => {
              return (
                <>
                  <li key={item.id}>
                    <NavLink
                      className={({ isActive }) => (isActive ? "active" : null)}
                      to={item.to}
                    >
                      {item.title}
                    </NavLink>
                  </li>
                </>
              );
            })}
        </ul>
      </nav>
      <div
        className="flex items-center gap-8"
        style={{ marginLeft: "36rem" }}
      ></div>
    </div>
  );
};

export default BookAppHeaderGuest;

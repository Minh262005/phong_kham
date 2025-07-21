import React, { useEffect, useState } from "react";
import Logo from "../../components/Logo/Logo";
import { NavLink, useNavigate } from "react-router-dom";
import EnsignAnh from "../../Images/anh.png";
import { IoMdArrowDropdown } from "react-icons/io";
import AccountMenu from "../../Popper/menu/AccountMenu";
import { CiLogin } from "react-icons/ci";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { publicPort } from "components/url/link";
const HomeNav = [
  {
    id: 1,
    to: "/service",
    title: "Home",
  },
  {
    id: 2,
    to: "/book_appointment",
    title: "Book Appointment",
  },
  {
    id: 3,
    to: "",
    title: "Records",
  },
  {
    id: 4,
    to: "",
    title: "Lookup",
  },
];

const MENU_ITEMS = [
  {
    title: "Profile",
  },
  {
    title: "Private session",
  },
  {
    title: "Setting",
  },
  {
    title: "Log out",
    icon: <CiLogin />,
  },
];

const HomeHeaderService = () => {
  const navigate = useNavigate();
  const storedName = localStorage.getItem("token");
  const [role, setRole] = useState("");
  const [viewer, setViewer] = useState();

  const [nameuser, setNameUser] = useState("");
  useEffect(() => {
    try {
      const decoded = jwtDecode(storedName);
      const role = decoded.roles[0].authority;
      const mal = decoded.sub;
      setRole(role);
      const nameuser = decoded.nameUser;
      setNameUser(nameuser);

      const listApp = async () => {
        try {
          let response;
          if (role == "USER") {
            response = await axios.get(
              publicPort + `patient/profile?email=${mal}`
            );
          } else {
            response = await axios.get(
              publicPort + `api/internal-accounts/search-email?email=${mal}`
            );
          }
          // console.log(response.data);
          setViewer(response.data);
        } catch (error) {
          console.log(error);
        }
      };
      listApp();
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    const fetchImage = async () => {
      if (viewer?.avatar) {
        try {
          const response = await axios.get(
            publicPort + `images/${viewer.avatar}`,
            {
              responseType: "blob", // set thành kiểu blob
            }
          );

          // Đọc dữ liệu hình ảnh và chuyển đổi nó thành chuỗi base64
          const reader = new FileReader();
          reader.onloadend = () => {
            setImageData(reader.result);
          };
          reader.readAsDataURL(response.data);
        } catch (error) {
          console.error("Error fetching image:", error);
        }
      }
    };

    fetchImage();
  }, [viewer?.avatar]);

  const handleLogout = () => {
    //log out here
    localStorage.removeItem("token");
    navigate("/login-user");
  };
  const handleAppointments = () => {
    window.location.href = "/listofappointment";
  };
  const handleCheckins = () => {
    window.location.href = "/examination-list";
  };
  const handleMedicalHistory = () => {
    window.location.href = "/medicalhistory";
  };
  const handleDoctors = () => {
    // navigate("/login-user");
    window.location.href = "/listDoctorForAll";
  };
  const handleNews = () => {
    window.location.href = "/newspage";
  };

  const [visibleItem, setVisibleItem] = useState(null);
  const [visibleItem1, setVisibleItem1] = useState(null);

  const handleShow = (index) => {
    // setshow(!show);
    if (visibleItem === index) {
      setVisibleItem(null);
    } else {
      setVisibleItem(index);
      setVisibleItem1(null);
    }
  };
  const handleShow1 = (index) => {
    // setshow(!show);
    if (visibleItem1 === index) {
      setVisibleItem1(null);
    } else {
      setVisibleItem(null);
      setVisibleItem1(index);
    }
  };
  const [imageData, setImageData] = useState(null);
  useEffect(() => {
    const fetchImage = async () => {
      if (viewer?.avatar) {
        try {
          const response = await axios.get(
            publicPort + `images/${viewer.avatar}`,
            {
              responseType: "blob", // set thành kiểu blob
            }
          );

          // Đọc dữ liệu hình ảnh và chuyển đổi nó thành chuỗi base64
          const reader = new FileReader();
          reader.onloadend = () => {
            setImageData(reader.result);
          };
          reader.readAsDataURL(response.data);
        } catch (error) {
          console.error("Error fetching image:", error);
        }
      }
    };

    fetchImage();
  }, [viewer]);

  return (
    <header className="max-w-[1156px] gap-[46px] mx-auto flex items-center pt-[45px]">
      <div>
        <Logo></Logo>
      </div>
      <div className="flex items-center justify-between w-full">
        <nav className="home-nav w-[84rem]">
          <ul>
            {HomeNav.length > 0 &&
              HomeNav.map((item, index) => {
                return (
                  <li key={item.id} style={{ display: "contents" }}>
                    <NavLink
                      className={({ isActive }) => (isActive ? "active" : null)}
                      to={item.to}
                      onClick={() => {
                        switch (item.title) {
                          case "Records":
                            handleShow(index);
                            break;
                          case "Lookup":
                            handleShow1(index);
                            break;

                          default:
                            break;
                        }
                      }}
                    >
                      {item.title == "Lookup" || item.title == "Records"
                        ? item.title + " ▽"
                        : item.title}

                      {visibleItem === index && (
                        <div
                          className=" w-[13%] mt-[5rem] ml-[-3rem]"
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            borderRadius: "1rem",
                            boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.25)",
                            position: "absolute",
                            top: "5rem",
                            left: "62.5rem",
                          }}
                        >
                          <span
                            onClick={handleAppointments}
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              margin: "1rem",
                            }}
                          >
                            <p>List of Appointment</p>
                          </span>
                          <span
                            onClick={handleCheckins}
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              margin: "1rem",
                            }}
                          >
                            <p>List of Examinations</p>
                          </span>
                          <span
                            onClick={handleMedicalHistory}
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              margin: "1rem",
                            }}
                          >
                            <p>Medical Record</p>
                          </span>
                        </div>
                      )}

                      {visibleItem1 === index && (
                        <div
                          className=" w-[7%] mt-[5rem] ml-[-3rem]"
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            borderRadius: "1rem",
                            boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.25)",
                            position: "absolute",
                            top: "5rem",
                            left: "75.2rem",
                          }}
                        >
                          <span
                            onClick={handleDoctors}
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              margin: "1rem",
                            }}
                          >
                            <p>Doctor</p>
                          </span>
                          <span
                            onClick={handleNews}
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              margin: "1rem",
                            }}
                          >
                            <p>News</p>
                          </span>
                        </div>
                      )}
                    </NavLink>
                  </li>
                );
              })}
          </ul>
        </nav>
        <AccountMenu items={MENU_ITEMS}>
          <div
            className=" relative flex h-[35px] !p-[5px_40px] bg-[#e2edff] rounded-2xl  "
            style={{ color: "#3f84f6", borderRadius: "20px" }}
          >
            <img
              className=" absolute rounded-full w-[24px] h-[24px] top-[6px] left-[4px]"
              src={imageData}
            ></img>
            <div className="font-bold">{nameuser.split(" ")[0]} </div>
            <div className="absolute top-[3px] left-[83%]">
              <IoMdArrowDropdown style={{ fontSize: "30px" }} />
            </div>
          </div>
        </AccountMenu>
      </div>
    </header>
  );
};

export default HomeHeaderService;

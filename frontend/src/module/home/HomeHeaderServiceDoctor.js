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
    to: "",
    title: "Schedule",
  },
  {
    id: 3,
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
    to: "/register",
  },
];

const HomeHeaderServiceDoctor = () => {
  const navigate = useNavigate();
  const storedName = localStorage.getItem("token");
  const [role, setRole] = useState("");
  const [nameuser, setNameUser] = useState("");
  const [viewer, setViewer] = useState();
  useEffect(() => {
    try {
      const decoded = jwtDecode(storedName);
      const role = decoded.roles[0].authority;
      const mal = decoded.sub;
      setRole(role);
      const nameuser = decoded.nameInternal;
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

  const [visibleItem, setVisibleItem] = useState(null);
  const [visibleItem1, setVisibleItem1] = useState(null);
  const [visibleItem2, setVisibleItem2] = useState(null);

  const handleShow = (index) => {
    // setshow(!show);
    if (visibleItem === index) {
      setVisibleItem(null);
    } else {
      setVisibleItem(index);
      setVisibleItem1(null);
      setVisibleItem2(null);
    }
  };
  const handleShow1 = (index) => {
    // setshow(!show);
    if (visibleItem1 === index) {
      setVisibleItem1(null);
    } else {
      setVisibleItem(null);
      setVisibleItem1(index);
      setVisibleItem2(null);
    }
  };
  const handleShow2 = (index) => {
    // setshow(!show);
    if (visibleItem2 === index) {
      setVisibleItem2(null);
    } else {
      setVisibleItem(null);
      setVisibleItem1(null);
      setVisibleItem2(index);
    }
  };

  const handleAppointments = () => {
    window.location.href = "/appointments";
  };

  const handleSchedules = () => {
    window.location.href = "/schedules";
  };

  const handleCheckins = () => {
    window.location.href = "/examination-list";
  };

  const handlePatients = () => {
    // navigate("/login-user");
    window.location.href = "/listPatientForAll";
  };
  const handleNews = () => {
    window.location.href = "/newspage";
  };
  const handleMedRecord = () => {
    window.location.href = "/medicalhistory";
  };
  return (
    <header className="max-w-[1156px] gap-[46px] mx-auto flex items-center pt-[45px]">
      <div>
        <Logo></Logo>
      </div>
      <div className="flex items-center justify-between w-full">
        <nav className="home-nav">
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
                          case "Schedule":
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
                      {item.title == "Lookup" || item.title == "Schedule"
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
                            left: "43rem",
                          }}
                        >
                          <span
                            onClick={handleSchedules}
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              margin: "1rem",
                            }}
                          >
                            <p>List of Schedule</p>
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
                            <p>List of Examination</p>
                          </span>
                        </div>
                      )}

                      {visibleItem1 === index && (
                        <div
                          className=" w-[8%] mt-[5rem] ml-[-3rem]"
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            borderRadius: "1rem",
                            boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.25)",
                            position: "absolute",
                            top: "5rem",
                            left: "56.2rem",
                          }}
                        >
                          <span
                            onClick={handlePatients}
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              margin: "1rem",
                            }}
                          >
                            <p>Patient</p>
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
                          <span
                            onClick={handleMedRecord}
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              margin: "1rem",
                            }}
                          >
                            <p>MedRecord</p>
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
            <div className="font-bold">{nameuser.split(" ")[0]}</div>
            <div className="absolute top-[3px] left-[83%]">
              <IoMdArrowDropdown style={{ fontSize: "30px" }} />
            </div>
          </div>
        </AccountMenu>
      </div>
    </header>
  );
};

export default HomeHeaderServiceDoctor;

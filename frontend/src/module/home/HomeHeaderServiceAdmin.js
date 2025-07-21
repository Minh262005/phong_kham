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
    to: "/adminpages",
    title: "Dashboard",
  },
  {
    id: 3,
    to: "/locations",
    title: "Internal Information",
  },
  {
    id: 4,
    to: "/internals",
    title: "Accounts",
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

const HomeHeaderServiceAdmin = () => {
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

  return (
    <header className="max-w-[1156px] gap-[46px] mx-auto flex items-center pt-[45px]">
      <div>
        <Logo></Logo>
      </div>
      <div className="flex items-center justify-between w-full">
        <nav className="home-nav">
          <ul>
            {HomeNav.length > 0 &&
              HomeNav.map((item) => {
                return (
                  <li key={item.id}>
                    <NavLink
                      className={({ isActive }) => (isActive ? "active" : null)}
                      to={item.to}
                    >
                      {item.title}
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

export default HomeHeaderServiceAdmin;

import EnsignAnh from "../../Images/anh.png";
import { BsPencilSquare, BsChatLeftFill } from "react-icons/bs";
import {
  MdKeyboardArrowRight,
  MdLanguage,
  MdOutlineSecurity,
  MdError,
} from "react-icons/md";
import { AiTwotoneLock, AiOutlineUser } from "react-icons/ai";
import { BiError, BiSolidConversation } from "react-icons/bi";
import { FaBook, FaUserAlt } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { publicPort } from "components/url/link";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";

function ProfileContent({ mail, role }) {
  const [infor, setInfor] = useState({
    avatar: "",
  });
  const [imageData, setImageData] = useState(null);
  const navigate = useNavigate();
  const [viewer, setViewer] = useState();

  useEffect(() => {
    const storedName = localStorage.getItem("token");
    if (storedName == null) {
      navigate("/login-user");
    } else {
      try {
        const decoded = jwtDecode(storedName);
        const role = decoded.roles[0].authority;
        const mal = decoded.sub;
        setViewer(mal);
        // if (role !== 'USER') {
        //   navigate("/")
        // }
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  useEffect(() => {
    // console.log(mail);
    const storedName = localStorage.getItem("token");
    if (storedName == null) {
      navigate("/login-user");
    } else {
      try {
        const decoded = jwtDecode(storedName);
        const role = decoded.roles[0].authority;
        const mal = decoded.sub;
      } catch (error) {
        console.log(error);
      }
    }

    const listApp = async () => {
      try {
        let response;
        if (role == "USER") {
          response = await axios.get(
            publicPort + `patient/profile?email=${mail}`
          );
        } else {
          response = await axios.get(
            publicPort + `api/internal-accounts/search-email?email=${mail}`
          );
        }
        console.log(response.data);
        setInfor(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    listApp();
  }, [mail]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(publicPort + `users/getUserInfo`);
        setInfor(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchImage = async () => {
      if (infor.avatar) {
        try {
          const response = await axios.get(
            publicPort + `images/${infor.avatar}`,
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
  }, [infor.avatar]);

  const handleEditAccount = () => {
    navigate("/editprofile", { state: { mail } });
  };
  const handleEditAccountStaff = () => {
    navigate("/editprofilefordoctor", { state: { mail } });
  };

  const handleChangePass = () => {
    const email = mail;
    navigate("/choosenewpassword", { state: { email } });
  };

  const handleVerify = () => {
    navigate("/verifyregister", { state: { mail } });
  };

  return (
    <div className="w-[100%] min-h-[600px] flex justify-between">
      <div className="w-[48%] min-h-[500px]  ">
        <div className="w-[100%] h-[300px] flex justify-center shadow-lg rounded-[20px] mb-[20px]">
          <div className="w-[85%] bg-white">
            <div className="w-[100%] flex h-[100px] ">
              <div className="w-[20%] flex justify-center items-center ">
                <img
                  className="rounded-full w-[60px] h-[60px]"
                  src={imageData}
                  alt="Avatar"
                ></img>
              </div>
              <div className="w-[60%] flex justify-start  items-center">
                <div className="w-[100%]">
                  <h1 className="w-[100%] h-[30px] font-bold text-[20px] ">
                    {infor != undefined ? infor.name : ""}
                  </h1>
                  {role == "USER" ? (
                    <p className="w-[100%] h-[30px] text-[#9f9c9c] text-[15px] ">
                      {infor != undefined ? infor.address : ""}
                    </p>
                  ) : (
                    <p className="w-[100%] h-[30px] text-[#9f9c9c] text-[15px] ">
                      {infor != undefined && infor.role != undefined
                        ? infor.role.name
                        : ""}{" "}
                      -{" "}
                      {infor != undefined && infor.specialty != undefined
                        ? infor.specialty.name
                        : ""}{" "}
                      -{" "}
                      {infor != undefined && infor.workingPlace != undefined
                        ? infor.workingPlace.name
                        : ""}
                    </p>
                  )}
                </div>
              </div>
              {mail == viewer ? (
                role == "USER" ?
                  <div className="w-[20%] flex justify-end">
                    <span>
                      <BsPencilSquare
                        onClick={handleEditAccount}
                        className="text-[20px] text-gradientLeft cursor-pointer mt-[30px]"
                      />
                    </span>
                  </div> :
                  <div className="w-[20%] flex justify-end">
                    <span>
                      <BsPencilSquare
                        onClick={handleEditAccountStaff}
                        className="text-[20px] text-gradientLeft cursor-pointer mt-[30px]"
                      />
                    </span>
                  </div>
              ) : (
                <></>
              )}
            </div>
            <div className="w-[100%] h-[190px]">
              <div className="flex w-[100%] min-h-[10px] mb-[15px]">
                <span className="w-[50%]">Email</span>
                <span className="w-[50%] flex justify-end">
                  <p>{infor != undefined ? infor.email : ""} </p>
                </span>
              </div>
              <div className="flex w-[100%] min-h-[10px] mb-[15px]">
                <span className="w-[50%]">Date of Birth</span>
                <span className="w-[50%] flex justify-end">
                  <p>{infor != undefined ? infor.birthDate : ""} </p>
                </span>
              </div>
              <div className="flex w-[100%] min-h-[10px] mb-[15px]">
                <span className="w-[50%]">Phone number</span>
                <span className="w-[50%] flex justify-end">
                  <p>{infor != undefined ? infor.phone : ""} </p>
                </span>
              </div>
              <div className="flex w-[100%]  min-h-[10px] mb-[10px]">
                <span className="w-[50%]">Gender</span>
                <span className="w-[50%] flex justify-end">
                  <p>{infor != undefined ? infor.gender : ""} </p>
                </span>
              </div>
              <div className="w-[100%] flex justify-end">
                <span className="text-gradientLeft cursor-pointer">More</span>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[100%] min-h-[200px] shadow-lg rounded-[20px] flex justify-center">
          <div className="w-[85%]">
            <div className="w-[100%] flex h-[50px]  items-center">
              <div className="w-[50%]">
                <h1 className="text-[20px] font-bold">Recent Activities</h1>
              </div>
              <div className="w-[50%] flex justify-end">
                <div className="flex w-[100%]">
                  <span className="w-[85%] flex justify-end">
                    <p className="text-[#9f9c9c]">All</p>
                  </span>
                  <span className="w-[15%] flex justify-center">
                    <button className="button text-[30px] w-10 h-10 bg-[#e2edff] rounded-2xl flex justify-center items-center">
                      <MdKeyboardArrowRight className=" text-[20px] text-gradientLeft" />
                    </button>
                  </span>
                </div>
              </div>
            </div>
            <div className="w-[100%] h-[150px] ">
              <div className="flex w-[100%] min-h-[50px] mb-[20px]">
                <div className="w-[10%] flex">
                  <img
                    className="rounded-[10px] w-[40px] h-[40px]"
                    src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2xpbmljfGVufDB8fDB8fHww&w=1000&q=80"
                  ></img>
                </div>
                <div className="w-[90%]">
                  <p className="text-[14px]">
                  Clinicmate Hospital Collaborates with Local Community to Provide Free Health Screenings an
                  </p>
                </div>
              </div>
              <div className="flex w-[100%] min-h-[50px]">
                <div className="w-[10%] flex">
                  <img
                    className="rounded-[10px] w-[40px] h-[40px]"
                    src="https://medicosfamilyclinic.com/wp-content/uploads/2020/06/medical-clinic.jpg"
                  ></img>
                </div>
                <div className="w-[90%]">
                  <p className="text-[14px]">
                  Clinicmate Hospital Expands Specialized Departments to Meet Growing Patient Needs
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[48%]">
        <div className="w-[100%] h-[200px]  flex justify-center rounded-[20px] shadow-lg mb-[20px]">
          <div className="w-[85%]">
            <div className="w-[100%] h-[50px] flex items-center ">
              <h1 className="text-[20px] font-bold">Settings</h1>
            </div>
            <div
              className="flex w-[100%] h-[40px] items-center"
              onClick={handleChangePass}
            >
              <div className="w-[10%] ">
                <span className=" text-[30px] w-[35px] h-[35px] bg-[#e2edff] rounded-2xl flex justify-center items-center">
                  <AiTwotoneLock className=" text-[20px] text-gradientLeft" />
                </span>
              </div>
              <div className="w-[80%]">
                <h1>Change password</h1>
              </div>
              <div className="w-[10%] flex justify-end ">
                <MdKeyboardArrowRight className=" text-[30px] text-[#a4a0a0] cursor-pointer" />
              </div>
            </div>
            <div className="flex w-[100%] h-[40px] items-center mt-[10px] mb-[10px]">
              <div className="w-[10%] ">
                <span className=" text-[30px] w-[35px] h-[35px] bg-[#f1e6e6] rounded-2xl flex justify-center items-center">
                  <MdLanguage className=" text-[20px] text-[#eb5757]" />
                </span>
              </div>
              <div className="w-[60%]">
                <h1>Language</h1>
              </div>
              <div className="w-[30%] flex justify-end ">
                <div className="flex items-center w-[100%]">
                  <div className="w-[80%] flex justify-end cursor-pointer">
                    <p className="text-[14px] text-[#bdb9b9]">English</p>
                  </div>
                  <MdKeyboardArrowRight className=" text-[30px] text-[#a4a0a0] w-[20%] cursor-pointer" />
                </div>
              </div>
            </div>
            <div className="flex w-[100%] h-[40px] items-center">
              <div className="w-[10%] ">
                <div className=" text-[30px] w-[35px] h-[35px] bg-[#cff7d3] rounded-2xl flex justify-center items-center">
                  <MdOutlineSecurity className=" text-[20px] text-[#27ae60] " />
                </div>
              </div>
              <div className="w-[60%]">
                <h1>Security</h1>
              </div>
              <div className="w-[30%] flex justify-end ">
                <div className="flex items-center w-[100%]">
                  <span className="w-[80%] flex justify-end cursor-pointer">
                    <p className="text-[14px] text-[#bdb9b9]">
                      {infor != undefined && infor.commandFlag == 0 ? (
                        <>Not enabled</>
                      ) : (
                        <>Enabled</>
                      )}
                    </p>
                  </span>
                  <MdKeyboardArrowRight
                    onClick={() =>
                      infor.commandFlag === 0 &&
                      role === "USER" &&
                      handleVerify()
                    }
                    className=" text-[30px] text-[#a4a0a0] w-[20%] cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[100%] h-[300px]  flex justify-center rounded-[20px] shadow-lg mb-[20px]">
          <div className="w-[85%]">
            <div className="w-[100%] h-[50px] flex items-center ">
              <h1 className="text-[20px] font-bold">Settings</h1>
            </div>
            <div className="flex w-[100%] h-[40px] items-center mb-[10px] mt-[10px]">
              <div className="w-[10%] ">
                <span className=" text-[30px] w-[35px] h-[35px] bg-[#e2edff] rounded-2xl flex justify-center items-center">
                  <FaBook className=" text-[20px] text-gradientLeft" />
                </span>
              </div>
              <div className="w-[80%]">
                <h1>Terms of use</h1>
              </div>
              <div className="w-[10%] flex justify-end ">
                <MdKeyboardArrowRight className=" text-[30px] text-[#a4a0a0] cursor-pointer" />
              </div>
            </div>
            <div className="flex w-[100%] h-[40px] items-center mb-[10px]">
              <div className="w-[10%] ">
                <span className=" text-[30px] w-[35px] h-[35px] bg-[#fef5ed] rounded-2xl flex justify-center items-center">
                  <MdError className=" text-[20px] text-[#f2994a]" />
                </span>
              </div>
              <div className="w-[80%]">
                <h1>Complaints and Dispute resolution policy</h1>
              </div>
              <div className="w-[10%] flex justify-end ">
                <MdKeyboardArrowRight className=" text-[30px] text-[#a4a0a0] cursor-pointer" />
              </div>
            </div>
            <div className="flex w-[100%] h-[40px] items-center mb-[10px]">
              <div className="w-[10%] ">
                <span className=" text-[30px] w-[35px] h-[35px] bg-[#f1f3f7] rounded-2xl flex justify-center items-center">
                  <FaUserAlt className=" text-[20px] text-gradientLeft" />
                </span>
              </div>
              <div className="w-[80%]">
                <h1>Privacy Policy</h1>
              </div>
              <div className="w-[10%] flex justify-end ">
                <MdKeyboardArrowRight className=" text-[30px] text-[#a4a0a0] cursor-pointer" />
              </div>
            </div>
            <div className="flex w-[100%] h-[40px] items-center">
              <div className="w-[10%] ">
                <span className=" text-[30px] w-[35px] h-[35px] bg-[#eaf7f0] rounded-2xl flex justify-center items-center">
                  <BsChatLeftFill className=" text-[20px] text-[#27ae60]" />
                </span>
              </div>
              <div className="w-[80%]">
                <h1>Requirement Managament</h1>
              </div>
              <div className="w-[10%] flex justify-end ">
                <MdKeyboardArrowRight className=" text-[30px] text-[#a4a0a0] cursor-pointer" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProfileContent;

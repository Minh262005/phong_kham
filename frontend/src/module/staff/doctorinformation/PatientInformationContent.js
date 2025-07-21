import Background from "../../../Images/Rectangle1135.png";
import React, { useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { FaHouseUser } from "react-icons/fa";
import DoctorInfoMedicalHistory from "./doctorinfoContent/MedicalHistory";
import axios from "axios";
import { publicPort } from "../../../components/url/link";
import { useEffect } from "react";
import DetailedInformationForPatient from "./doctorinfoContent/DetailedInformationForPatient";

const tabButtons = ["DETAILED INFORMATION", "MEDICAL HISTORY"];

function PatientInformationContent({ docId }) {
  const [type, setType] = useState(tabButtons[0]);
  const [showComponentC, setShowComponentC] = useState(true);
  const [showComponentE, setShowComponentE] = useState(false);
  const [doct, setDoct] = useState({});
  const [imageData, setImageData] = useState(null);
  const [infor, setInfor] = useState({
    avatar: "",
  });

  useEffect(() => {
    const doc = async () => {
      try {
        const response = await axios.get(
          publicPort + `patient/profile?email=${docId}`
        );
        setDoct(response.data);
        setInfor(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    doc();
  }, [docId]);
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
  const handleClick = (data) => {
    setType(data);
    setShowComponentC(data === tabButtons[0]);
    setShowComponentE(data === tabButtons[1]);
  };

  return (
    <div className="bg-white">
      <div className="w-[77%] h-[220px] ml-[170px] mt-[80px] relative">
        <img src={Background} alt="Background" className="rounded-3xl" />
        <img
          src={imageData}
          alt="Avatar"
          className="rounded-3xl h-[170px] w-[15%] absolute top-[12%] left-[2%]"
        />
        <div className="flex absolute top-[15%] left-[20%]">
          <span className="text-[35px] mt-[6px]">
            <FaHouseUser />
          </span>
          <span className="text-[60px]">
            <MdKeyboardArrowRight />
          </span>
          <span className="font-bold mt-[6px]">Patient</span>
        </div>
        <div className="absolute top-[40%] left-[20%] ">
          <h1 className="text-gradientLeft text-4xl font-bold">{doct.name}</h1>
        </div>
        <div className="flex absolute top-[70%] left-[50%] w-[80%]">
          <div className="flex mt-[15px] w-[48%]">
            {tabButtons.map((data, index) => (
              <div key={index}>
                <h1
                  className="text-3xl ml-[20px] cursor-pointer"
                  style={
                    type === data
                      ? {
                          color: "#5562f7",
                          textUnderlineOffset: "#3681f8",
                        }
                      : {}
                  }
                  onClick={() => handleClick(data)}
                >
                  {data}
                </h1>
              </div>
            ))}
          </div>
          <div className="w-[30%]"></div>
        </div>
      </div>
      <div>
        {showComponentC && <DetailedInformationForPatient doct={doct} />}
        {showComponentE && <DoctorInfoMedicalHistory doct={doct} />}
      </div>
    </div>
  );
}
export default PatientInformationContent;

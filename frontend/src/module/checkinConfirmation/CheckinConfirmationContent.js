import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { localPort, publicPort } from "../../components/url/link";
import React from "react";
import jwtDecode from "jwt-decode";
import imgTP from "../../Images/tpbank.png";
import imgMO from "../../Images/momo.png";
import imgBI from "../../Images/bidv.png";

function CheckinConfirmationContent({ checkin }) {
  const tabButtons1 = "Return to previous";
  const tabButtons2 = "Check-in confirmation";
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionChange = (option) => {
    console.log(option);
    setSelectedOption(option);
  };

  const navigate = useNavigate();

  const [datas, setDatas] = useState([
    {
      id: 1,
      form: "Specialty examination at the hospital",
      customer: "Nguyễn Quang Hưng",
      date: "10/06/1975",
      email: "hung@gmail.com",
      gender: "Male",
      phone: "0931936165",
      reason:
        "Lorem ipsum dolor sit amet consectetur. Cursus mauris vitae posuere id lacus. Ipsum elementum mi at mauris dui. Consequat suspendisse sit vitae nunc sed nec adipiscing.",
      doctor: "Dr. Phan Nguyen Thanh Binh",
      examinationtime: "08:00, 12/06/2023",
      location: "Clinicmate Da Nang",
      specialty: "Nutrition",
    },
  ]);
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
  const [docName, setDocName] = useState();
  useEffect(() => {
    const confirm = async () => {
      // console.log(checkin);
     
       const response = await axios.get(publicPort + `api/${checkin?.doctorId}`);
      
      // console.log(response);
     setDocName(response.data.name)
    };
    confirm()
  }, [checkin]);
  // console.log(checkin);
  const confirm = async () => {
    // console.log(checkin);
    var response;
    if (role == "NURSE") {
      response = await axios.post(publicPort + `checkin/save`, checkin);
    }
    console.log(response);

    if (response.data === "success") {
      navigate("/examination-list");
    } else {
      alert(response.data);
    }
  };

  const goBack = () => {
    navigate("/checkin");
  };

  return (
    <div>
      <div className="bg-white p-5 rounded-3xl shadow-lg ">
        <div className="pl-[64px] pt-5 pb-10">
          {datas.map((data) => (
            <div key={data.id}>
              <div>
                <h1 className="text-[#4976f7] text-3xl font-semibold">
                  Sevices
                </h1>
                <div className="pt-8 flex">
                  <span className="w-[35%]">Form of Service</span>
                  <span className="w-[65%]">{data.form}</span>
                </div>
              </div>
              <div className="pt-3 flex">
                <span className="w-[35%]">Examination Fee</span>
                <span className="">300.000 VND</span>
              </div>
              <div className="pt-6">
                <h1 className="text-[#4976f7] text-3xl font-semibold">
                  Patient
                </h1>
                <div className="pt-8 flex">
                  <span className="w-[35%]">Customer</span>
                  <span className="w-[65%]">
                    {checkin != undefined ? checkin.name : ""}
                  </span>
                </div>
                <div className="pt-3 flex">
                  <span className="w-[35%]">Date of Birth</span>
                  <span className="w-[65%]">
                    {checkin != undefined ? checkin.birthday : ""}
                  </span>
                </div>
                <div className="pt-3 flex">
                  <span className="w-[35%]">Patient ID</span>
                  <span className="w-[65%]">
                    {checkin != undefined ? checkin.idC : ""}
                  </span>
                </div>
                <div className="pt-3 flex">
                  <span className="w-[35%]">Appointment ID</span>
                  <span className="w-[65%]">
                    {checkin != undefined ? checkin.idA : ""}
                  </span>
                </div>
                <div className="pt-3 flex">
                  <span className="w-[35%]">Gender</span>
                  <span className="w-[65%]">
                    {checkin != undefined ? checkin.gender : ""}
                  </span>
                </div>
                <div className="pt-3 flex">
                  <span className="w-[35%]">Phone Number</span>
                  <span>{checkin != undefined ? checkin.phone : ""}</span>
                </div>
                <div className="pt-3 flex">
                  <span className="w-[35%]">Symptom</span>
                  <span className="w-[65%]">
                    {checkin != undefined ? checkin.symtom : ""}
                  </span>
                </div>
                <div className="pt-3 flex">
                  <span className="w-[35%]">Description</span>
                  <span className="w-[65%]">
                    {checkin != undefined ? checkin.description : ""}
                  </span>
                </div>
              </div>
              <div className="pt-6">
                <h1 className="text-[#4976f7] text-3xl font-semibold">
                  Doctor
                </h1>
                <div className="pt-6 flex">
                  <span className="w-[35%]">Doctor</span>
                  <span className="w-[65%]">
                    {checkin != undefined ? docName : ""}
                  </span>
                </div>
                <div className="pt-3 flex">
                  <span className="w-[35%]">Specialty</span>
                  <span className="">
                    {checkin != undefined ? checkin.spec : ""}
                  </span>
                </div>

                <div className="pt-3 flex">
                  <span className="w-[35%]">Location</span>
                  <span className="">
                    {checkin != undefined ? checkin.bookPlace : ""}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-[100%] h-[50px] mt-3">
        <div className="w-[100%] h-[50px]">
          <select
            className="w-[100%] h-[50px] border-[1px] rounded-2xl pl-2"
            onChange={(e) => handleOptionChange(e.target.value)}
          >
            <option value="">Select a Payment Method</option>
            <option value="1">
              TP Bank - Clicmate Medical Center - 54010000677622
            </option>
            <option value="2">
              BIDV - Clicmate Medical Center - 54010000677622
            </option>
            <option value="3">
              MOMO - Clicmate Medical Center - 0817411123
            </option>
          </select>
        </div>
      </div>
      <div className="selected-option mt-[10px]">
        {selectedOption === "1" && (
          <div className="w-[100%] h-[250px]">
            <img src={imgTP} />
          </div>
        )}
        {selectedOption === "2" && (
          <div className="w-[100%] h-[250px]">
            <img src={imgBI} />
          </div>
        )}
        {selectedOption === "3" && (
          <div className="w-[100%] h-[250px]">
            <img src={imgMO} />
          </div>
        )}
      </div>
      <div className="button-container flex items-center justify-center w-[100%] h-40 ">
        <button
          key={tabButtons1}
          className="border-[3px] rounded-2xl h-[50px] pl-[30px] pr-[30px] w-[30%] mr-[35px]"
          style={{
            borderColor: "#5562f7",
            color: "#5562f7",
          }}
          onClick={() => goBack()}
        >
          {tabButtons1}
        </button>
        <button
          key={tabButtons2}
          className="border-[3px] rounded-2xl h-[50px] pl-[30px] pr-[30px] w-[30%] mr-[35px]"
          style={{
            borderColor: "#5562f7",
            color: "#5562f7",
          }}
          onClick={
            selectedOption != "" && selectedOption != null
              ? () => confirm()
              : () => {}
          }
        >
          {tabButtons2}
        </button>
      </div>
    </div>
  );
}
export default CheckinConfirmationContent;

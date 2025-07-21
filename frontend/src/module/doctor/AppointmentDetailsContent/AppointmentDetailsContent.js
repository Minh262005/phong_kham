import axios from "axios";
import { useEffect, useState } from "react";
import { publicPort } from "../../../components/url/link";
import { useNavigate } from "react-router-dom";
import React from "react";

function AppointmentDetailsContent({ appointment }) {
  const tabButtons1 = "Return to previous";
  const tabButtons2 = "Completion of Examination";
  var result = {
    appointment: {
      id: "",
    },
    doctorId: "",
    sumaryResult: "",
    clinicProcess: "",
    treatment: "",
    releaseDate: "",
  };
  // console.log(appointment);
  //
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formattedDateTime = currentDateTime
    .toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      fractionalSecondDigits: 3,
      hour12: false,
      timeZone: "UTC",
    })
    .replace(",", "");
  //
  const [type, setType] = useState("Appointment confirmation");
  const navigate = useNavigate();
  const [showMedicalSummary, setShowMedicalSummary] = useState(false);
  const [showConfirm, setshowConfirm] = useState(false);

  const [clinicProcess, setclinicProcess] = useState({
    Cprocess: "",
  });
  const [clinicSummary, setclinicSummary] = useState({
    Csummary: "",
  });
  const [clinicTreatment, setclinicTreatment] = useState({
    Ctreatment: "",
  });
  const handleAddMedicalRecord = () => {
    setShowMedicalSummary(true);
  };
  const handleReturnToPrevious = () => {
    setShowMedicalSummary(false);
  };
  const handleshowConfirm = () => {
    setshowConfirm(false);
  };
  const handleUnshowConfirm = () => {
    setshowConfirm(true);
  };
  const [datas, setDatas] = useState([
    {
      id: 1,
      status: "Approved",
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
  const handleCompletionOfExamination = async () => {
    setshowConfirm(false);
    setShowMedicalSummary(false);

    result.appointment.id = appointment.appointment.id;
    result.doctorId = appointment.inaccounts.id;
    result.clinicProcess = clinicProcess.Cprocess;
    result.sumaryResult = clinicSummary.Csummary;
    result.treatment = clinicTreatment.Ctreatment;
    result.releaseDate = formattedDateTime;

    if (result.process == "" || result.sumary == "" || result.treatment == "") {
      alert("Please fill all field");
    } else {
      console.log(result);
      const response = await axios.post(
        publicPort + `medicalrecord/create`,
        result
      );

      console.log(response);
      if (response.data === "cannot find patient") {
        window.alert("Cannot find patient");
      }

      if (response.data === "Medical record created successfully.") {
        navigate("/schedules");
      } else {
        alert(response.data);
      }
    }
  };

  const goBack = () => {
    navigate("/schedules");
  };

  const handleChangeInput = (event) => {
    const { name, value } = event.target;

    console.log(name);
    console.log(value);

    if (name == "Cprocess") {
      const newprocess = { ...clinicProcess, [name]: value };
      setclinicProcess(newprocess);
    }

    if (name == "Csummary") {
      const newsummary = { ...clinicSummary, [name]: value };
      setclinicSummary(newsummary);
    }

    if (name == "Ctreatment") {
      const newtreatment = { ...clinicTreatment, [name]: value };
      setclinicTreatment(newtreatment);
    }
  };

  return (
    <div>
      <div className="flex w-[100%] items-center pb-[30px]">
        <div className=" w-[50%]  text-6xl font-bold">
          <h1>Appointment Details</h1>
        </div>
      </div>
      <div className="bg-white p-5 rounded-3xl shadow-lg ">
        <div className="pl-[64px] pt-5 pb-10">
          <div key={appointment != undefined ? appointment.id : ""}>
            <div>
              <h1 className="text-[#4976f7] text-3xl font-semibold">Sevices</h1>
              <div className="pt-8 flex">
                <span className="w-[35%]">Form of Service</span>
                <span className="w-[65%]">
                  Specialty examination at the hospital
                </span>
              </div>
            </div>
            <div className="pt-6">
              <h1 className="text-[#4976f7] text-3xl font-semibold">Patient</h1>
              <div className="pt-8 flex">
                <span className="w-[35%]">Customer</span>
                <span className="w-[65%]">
                  {appointment != undefined
                    ? appointment.appointment.patientName
                    : ""}
                </span>
              </div>
              <div className="pt-3 flex">
                <span className="w-[35%]">Date of Birth</span>
                <span className="w-[65%]">
                  {appointment != undefined
                    ? appointment.appointment.birthday
                    : ""}
                </span>
              </div>
              <div className="pt-3 flex">
                <span className="w-[35%]">ID Card</span>
                <span className="w-[65%]">
                  {appointment != undefined
                    ? appointment.appointment.patient != null
                      ? appointment.appointment.patient.id
                      : ""
                    : ""}
                </span>
              </div>
              <div className="pt-3 flex">
                <span className="w-[35%]">Gender</span>
                <span className="w-[65%]">
                  {appointment != undefined
                    ? appointment.appointment.gender
                    : ""}
                </span>
              </div>
              <div className="pt-3 flex">
                <span className="w-[35%]">Phone Number</span>
                <span>
                  {appointment != undefined
                    ? appointment.appointment.phone
                    : ""}
                </span>
              </div>
              <div className="pt-3 flex">
                <span className="w-[35%]">Symptom</span>
                <span className="w-[65%]">
                  {appointment != undefined
                    ? appointment.appointment.symptom
                    : ""}
                </span>
              </div>
              <div className="pt-3 flex">
                <span className="w-[35%]">Description</span>
                <span className="w-[65%]">
                  {appointment != undefined
                    ? appointment.appointment.description
                    : " "}
                </span>
              </div>
            </div>
            <div className="pt-6">
              <h1 className="text-[#4976f7] text-3xl font-semibold">Doctor</h1>
              <div className="pt-6 flex">
                <span className="w-[35%]">Doctor</span>
                <span className="w-[65%]">
                  {appointment != undefined
                    ? appointment.appointment.doctorName
                    : ""}
                </span>
              </div>
              <div className="pt-3 flex">
                <span className="w-[35%]">Specialty</span>
                <span className="">
                  {appointment != undefined
                    ? appointment.appointment.speciatly
                    : ""}
                </span>
              </div>
              <div className="pt-3 flex">
                <span className="w-[35%]">Examination Date</span>
                <span className="">
                  {appointment != undefined
                    ? appointment.appointment.examDate
                    : ""}
                </span>
              </div>
              <div className="pt-3 flex">
                <span className="w-[35%]">Examination Time</span>
                <span className="">
                  {appointment != undefined
                    ? appointment.appointment.examTime
                    : ""}
                </span>
              </div>
              <div className="pt-3 flex">
                <span className="w-[35%]">Location</span>
                <span className="">
                  {appointment != undefined
                    ? appointment.appointment.bookPlace
                    : ""}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: "20px",
          }}
        >
          <button
            key={tabButtons1}
            className="border-[3px] rounded-2xl h-[50px] pl-[30px] pr-[30px] w-[30%] mr-[35px]"
            onClick={goBack}
            style={{
              borderColor: "#5562f7",
              color: "#5562f7",
            }}
          >
            {tabButtons1}
          </button>
          {showMedicalSummary ? (
            <button
              key={tabButtons2}
              className="border-[3px] rounded-2xl h-[50px] pl-[30px] pr-[30px] w-[30%] mr-[35px]"
              style={{
                borderColor: "#5562f7",
                color: "white",
                backgroundColor: "#4e6df7",
              }}
              onClick={handleUnshowConfirm}
            >
              {tabButtons2}
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default AppointmentDetailsContent;

import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { BsFillFileTextFill } from "react-icons/bs";
import { publicPort } from "../../../components/url/link";
import { useNavigate } from "react-router-dom";
import React from "react";

function CheckinDetailsContent({ checkin, role }) {
  const tabButtons1 = "Return to previous";
  const tabButtons2 = "Completion of Examination";
  var result = {
    checkinId: "",
    doctorId: "",
    sumaryResult: "",
    clinicProcess: "",
    treatment: "",
    releaseDate: "",
  };
  // console.log(appointment);
  //

  const [check, setCheck] = useState();
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const listApp = async () => {
      try {
        let response1;
        if (checkin != undefined) {
          response1 = await axios.get(publicPort + `api/${checkin.doctorId}`);
        }
        // console.log(response1.data);
        setCheck(response1.data);
      } catch (error) {
        console.log(error);
      }
    };
    listApp();
  }, [checkin]);

  const [showConfirmCancel, setshowConfirmCancel] = useState(false);
  const [showConfirmApprove, setshowConfirmApprove] = useState(false);
  //cancel
  const handleshowConfirmCancel = () => {
    setshowConfirmCancel(true);
  };
  const handleUnshowConfirmCancel = () => {
    setshowConfirmCancel(false);
  };
  //approve
  const handleshowConfirmApprove = () => {
    setshowConfirmApprove(true);
  };
  const handleUnshowConfirmApprove = () => {
    setshowConfirmApprove(false);
  };

  const StartExamining = async () => {
    // console.log(checkin);
    const response = await axios.put(
      publicPort +
        `checkin/commandFlag?checkinid=${checkin.id}&command=examining`
    );
    console.log(response);
    if (response.data === "CommandFlag updated successfully.") {
      navigate("/examination-list");
    } else {
      alert(response.data);
    }
  };
  const Cancel = async () => {
    console.log(checkin);
    const response = await axios.put(
      publicPort + `checkin/commandFlag?checkinid=${checkin.id}&command=cancel`
    );
    console.log(response);
    if (response.data === "CommandFlag updated successfully.") {
      navigate("/examination-list");
    } else {
      alert(response.data);
    }
  };

  const goBack = () => {
    navigate("/examination-list");
  };

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
  const [type, setType] = useState("Check-in Details");
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
    setDatas((prevDatas) => {
      const updatedDatas = prevDatas.map((data) => {
        if (data.id === 1) {
          return { ...data, status: "Completed" };
        }
        return data;
      });
      return updatedDatas;
    });
    result.checkinId = checkin.id;
    result.doctorId = checkin.doctorId;
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
      if (response.data === "Medical record created successfully.") {
        navigate("/examination-list");
      } else {
        alert(response.data);
      }
    }
  };
  // console.log(checkin);
  const handleChangeInput = (event) => {
    const { name, value } = event.target;

    // console.log(name);
    // console.log(value);

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
          <h1>Checked-in Details</h1>
        </div>
        {role == "DOCTOR" ? (
          checkin != undefined && checkin.commandFlag == 1 ? (
            !showMedicalSummary ? (
              <div className="h-[50px] w-[50%] flex justify-end items-center">
                <div
                  className="border-[1px] border-[#dddddd]  w-[40%] h-[40px] flex items-center justify-center rounded-3xl cursor-pointer"
                  onClick={handleAddMedicalRecord}
                >
                  <span className="w-[10%] text-[30px] text-gradientLeft ]">
                    <AiOutlinePlusCircle />
                  </span>
                  <span className="font-medium text-gradientLeft ">
                    Add Medical Record
                  </span>
                </div>
              </div>
            ) : null
          ) : (
            <></>
          )
        ) : (
          <></>
        )}
      </div>
      <div className="bg-white p-5 rounded-3xl shadow-lg ">
        <div className="pl-[64px] pt-5 pb-10">
          <div key={checkin != undefined ? checkin.appointmentId : ""}>
            <div className="min-h-[80px]">
              <h1 className="text-[#4976f7] text-3xl font-semibold">Status</h1>
              <div className="pt-8 flex">
                <span className="w-[35%]">Check-in status</span>
                <span className="w-[65%]">
                  {checkin != undefined && checkin.commandFlag == "0" ? (
                    <p
                      className={`w-[14%] h-[30px] rounded-2xl ml-[14%] pt-[3px] text-white ${"bg-[#9747ff]"}`}
                    >
                      Checked-in
                    </p>
                  ) : checkin != undefined && checkin.commandFlag == "1" ? (
                    <p
                      className={`w-[12%] h-[30px] rounded-2xl ml-[14%] pt-[3px] text-white ${"bg-[#6c87ae]"}`}
                    >
                      Examining
                    </p>
                  ) : checkin != undefined && checkin.commandFlag == "2" ? (
                    <p
                      className={`w-[13.5%] h-[30px] rounded-2xl ml-[14%] pt-[3px] text-white ${"bg-success"}`}
                    >
                      Completed
                    </p>
                  ) : (
                    <p
                      className={`w-[11%] h-[30px] rounded-2xl ml-[14%] pt-[3px] text-white ${"bg-error"}`}
                    >
                      Canceled
                    </p>
                  )}
                </span>
              </div>
            </div>
            <div>
              <h1 className="text-[#4976f7] text-3xl font-semibold">Sevices</h1>
              <div className="pt-8 flex">
                <span className="w-[35%]">Form of Service</span>
                <span className="w-[65%]">
                  Specialty examination at the hospital
                </span>
              </div>
              <div className="pt-3 flex">
                <span className="w-[35%]">Examination Fee</span>
                <span className="">300.000 VND</span>
              </div>
            </div>
            <div className="pt-6">
              <h1 className="text-[#4976f7] text-3xl font-semibold">Patient</h1>
              <div className="pt-8 flex">
                <span className="w-[35%]">Customer</span>
                <span className="w-[65%]">
                  {checkin != undefined ? checkin.patientName : ""}
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
                  {checkin != undefined
                    ? checkin.patient != null
                      ? checkin.patient.id
                      : ""
                    : ""}
                </span>
              </div>
              <div className="pt-3 flex">
                <span className="w-[35%]">Appointment ID </span>
                <span className="w-[65%]">
                  {checkin != undefined ? checkin.appointmentId : ""}
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
                  {checkin != undefined ? checkin.symptom : ""}
                </span>
              </div>
              <div className="pt-3 flex">
                <span className="w-[35%]">Description</span>
                <span className="w-[65%]">
                  {checkin != undefined ? checkin.note : " "}
                </span>
              </div>
            </div>
            <div className="pt-6">
              <h1 className="text-[#4976f7] text-3xl font-semibold">Doctor</h1>

              <div className="pt-3 flex">
                <span className="w-[35%]">Doctor name</span>
                <span className="">{check != undefined ? check.name : ""}</span>
              </div>
              <div className="pt-3 flex">
                <span className="w-[35%]">Specialty</span>
                <span className="">
                  {checkin != undefined ? checkin.speciatly : ""}
                </span>
              </div>
              <div className="pt-3 flex">
                <span className="w-[35%]">Examination Date</span>
                <span className="">
                  {checkin != undefined ? checkin.examDate : ""}
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
        </div>
      </div>
      {showMedicalSummary ? (
        <div className="w-[100%] min-h-[600px] bg-white mt-[50px] shadow-xl rounded-3xl">
          <div className=" w-[100%] h-[80px] flex justify-end">
            <h1 className="font-semibold text-gradientLeft w-[93.5%] mt-[20px] text-[20px]">
              Medical Summary
            </h1>
          </div>
          <div className=" w-[100%] min-h-[500px]">
            <div className="font-medium w-[80%] h-[150px] ml-[79px]">
              <h1 className="mb-[10px]">Clinical Course and Progress</h1>
              <div className="w-[100%] h-[126px] border-[1px] border-[#dddddd] rounded-3xl flex">
                <div className="w-[1%]"></div>
                <textarea
                  onChange={handleChangeInput}
                  name="Cprocess"
                  className="w-[98%] h-[120px] pt-[20px] pl-[20px] text-[#42b874]"
                />
              </div>
            </div>
            <div className="font-medium w-[80%] h-[150px] ml-[79px] m-[20px]">
              <h1 className="mb-[10px]">Summary of Diagnostic Test Results</h1>
              <div className="w-[100%] h-[126px] border-[1px] border-[#dddddd] rounded-3xl flex">
                <div className="w-[1%]"></div>
                <textarea
                  onChange={handleChangeInput}
                  name="Csummary"
                  className="w-[98%] h-[120px] pt-[20px] pl-[20px] text-[#42b874]"
                />
              </div>
            </div>
            <div className="font-medium w-[80%] h-[200px] ml-[79px]">
              <h1 className="mb-[10px]">Treatment Approach</h1>
              <div className="w-[100%] h-[126px] border-[1px] border-[#dddddd] rounded-3xl flex">
                <div className="w-[1%]"></div>
                <textarea
                  onChange={handleChangeInput}
                  name="Ctreatment"
                  className="w-[98%] h-[120px] pt-[20px] pl-[20px] text-[#42b874]"
                />
              </div>
            </div>
          </div>
        </div>
      ) : null}
      {showConfirm ? (
        <div className="w-[100%] h-[100vh] fixed bg-gray2 inset-0 bg-opacity-50 ">
          <div className="w-[40%] h-[300px] bg-white shadow-xl rounded-3xl fixed top-1/2 left-1/2 z-1000  transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center  ">
            <div>
              <div className="w-[100%] h-[50px]  text-[70px] text-gradientLeft flex justify-center items-center">
                <BsFillFileTextFill />
              </div>
              <div className="w-[100%] h-[100px] flex justify-center items-center">
                <div>
                  <h1 className="font-bold text-[18px] w-[100%] flex justify-center">
                    Completion of Patient Examination
                  </h1>
                  <p>Do you want to complete Patient Examination?</p>
                </div>
              </div>
              <div className="w-[100%] h-[50px] flex justify-center">
                <div className="w-[100%]  flex justify-between items-center">
                  <span
                    className="w-[40%] h-[50px] flex justify-center items-center  rounded-2xl bg-[#dddddd] cursor-pointer"
                    onClick={handleshowConfirm}
                  >
                    <button>No, close!</button>
                  </span>
                  <span
                    className="w-[40%] cursor-pointer h-[50px] flex justify-center items-center text-white rounded-2xl bg-gradientLeft"
                    onClick={handleCompletionOfExamination}
                  >
                    <button>Yes, completed!</button>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
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
          {role == "DOCTOR" ? (
            checkin != undefined && checkin.commandFlag == "0" ? (
              <>
                <button
                  className=" rounded-2xl h-[50px] pl-[30px] pr-[30px] w-[30%] mr-[35px] bg-error"
                  style={{ color: "white" }}
                  onClick={() => handleshowConfirmCancel()}
                >
                  Cancel the Check-in
                </button>
                <button
                  className=" rounded-2xl h-[50px] pl-[30px] pr-[30px] w-[30%] mr-[35px] bg-success"
                  onClick={() => handleshowConfirmApprove()}
                  style={{ color: "white" }}
                >
                  Start examining
                </button>
              </>
            ) : (
              <></>
            )
          ) : (
            <></>
          )}
          {showConfirmCancel ? (
            <div className="w-[100%] h-[100vh] fixed bg-gray2 inset-0 bg-opacity-50 ">
              <div className="w-[40%] h-[300px] bg-white shadow-xl rounded-3xl fixed top-1/2 left-1/2 z-1000  transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center  ">
                <div>
                  <div
                    className="w-[100%] h-[50px]  text-[70px] text-gradientLeft flex justify-center items-center"
                    style={{ color: "#eb5757" }}
                  >
                    <BsFillFileTextFill />
                  </div>
                  <div className="w-[100%] h-[100px] flex justify-center items-center">
                    <div>
                      <h1 className="font-bold text-[18px] w-[100%] flex justify-center">
                        Check-in
                      </h1>
                      <p>Do you want to cancel this check-in?</p>
                    </div>
                  </div>
                  <div className="w-[100%] h-[50px] flex justify-center">
                    <div className="w-[100%]  flex justify-between items-center">
                      <span
                        className="w-[40%] h-[50px] flex justify-center items-center  rounded-2xl bg-[#dddddd] cursor-pointer"
                        onClick={handleUnshowConfirmCancel}
                      >
                        <button onClick={handleUnshowConfirmCancel}>
                          No, close!
                        </button>
                      </span>
                      <span
                        className="w-[40%] cursor-pointer h-[50px] flex justify-center items-center text-white rounded-2xl bg-gradientLeft"
                        onClick={Cancel}
                        style={{ backgroundColor: "#eb5757" }}
                      >
                        <button>Yes, completed!</button>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
          {showConfirmApprove ? (
            <div className="w-[100%] h-[100vh] fixed bg-gray2 inset-0 bg-opacity-50 ">
              <div className="w-[40%] h-[300px] bg-white shadow-xl rounded-3xl fixed top-1/2 left-1/2 z-1000  transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center  ">
                <div>
                  <div
                    className="w-[100%] h-[50px]  text-[70px] text-gradientLeft flex justify-center items-center"
                    style={{ color: "#27ae60" }}
                  >
                    <BsFillFileTextFill />
                  </div>
                  <div className="w-[100%] h-[100px] flex justify-center items-center">
                    <div>
                      <h1 className="font-bold text-[18px] w-[100%] flex justify-center">
                        Start Examining
                      </h1>
                      <p>Do you want to start examining?</p>
                    </div>
                  </div>
                  <div className="w-[100%] h-[50px] flex justify-center">
                    <div className="w-[100%]  flex justify-between items-center">
                      <span
                        className="w-[40%] h-[50px] flex justify-center items-center  rounded-2xl bg-[#dddddd] cursor-pointer"
                        onClick={handleUnshowConfirmApprove}
                      >
                        <button onClick={handleUnshowConfirmApprove}>
                          No, close!
                        </button>
                      </span>
                      <span
                        className="w-[40%] cursor-pointer h-[50px] flex justify-center items-center text-white rounded-2xl bg-gradientLeft"
                        onClick={StartExamining}
                        style={{ backgroundColor: "#27ae60" }}
                      >
                        <button>Yes, completed!</button>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
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

export default CheckinDetailsContent;

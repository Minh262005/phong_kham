import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";

function MedicalRecordDetailsContent({ checkin, role }) {
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
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentDateTime(new Date());
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, []);

  const goBack = () => {
    navigate("/medicalhistory");
  };

  const navigate = useNavigate();
  const [showMedicalSummary, setShowMedicalSummary] = useState(true);
  const formatDateToRight = (dateString) => {
    let date = new Date(dateString);
    let formattedDate = date.toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
    // console.log(formattedDate);
    return formattedDate;
  };

  const handlePrint = () => {
    console.log("Print");
    let printContents = document.getElementById("printablediv").innerHTML;
    let originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    window.location.href = "/medicalhistory";
    // document.body.innerHTML = originalContents;
  };
  return (
    <div className="pt-[5rem]">
      <div id="printablediv">
        <div className="flex w-[100%] items-center pb-[30px]">
          <div className=" w-[70%]  text-6xl font-bold">
            <h1>Medical Record Details</h1>
          </div>
        </div>
        <div className="bg-white p-5 rounded-3xl shadow-lg ">
          <div className="pl-[64px] pt-5 pb-10">
            <div key={checkin != undefined ? checkin.appointmentId : ""}>
              <div className="min-h-[80px]">
                <h1 className="text-[#4976f7] text-3xl font-semibold">
                  Status
                </h1>
                <div className="pt-8 flex">
                  <span className="w-[35%]">Check-in status</span>
                  <span className="w-[65%]">
                    {checkin != undefined &&
                    checkin.checkin.commandFlag == "0" ? (
                      <p
                        className={`w-[14%] h-[30px] rounded-2xl ml-[14%] pt-[3px] text-white ${"bg-[#9747ff]"}`}
                      >
                        Checked-in
                      </p>
                    ) : checkin != undefined &&
                      checkin.checkin.commandFlag == "1" ? (
                      <p
                        className={`w-[12%] h-[30px] rounded-2xl ml-[14%] pt-[3px] text-white ${"bg-[#6c87ae]"}`}
                      >
                        Examining
                      </p>
                    ) : checkin != undefined &&
                      checkin.checkin.commandFlag == "2" ? (
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
                <h1 className="text-[#4976f7] text-3xl font-semibold">
                  Sevices
                </h1>
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
                <h1 className="text-[#4976f7] text-3xl font-semibold">
                  Patient
                </h1>
                <div className="pt-8 flex">
                  <span className="w-[35%]">Customer</span>
                  <span className="w-[65%]">
                    {checkin != undefined ? checkin.checkin.patientName : ""}
                  </span>
                </div>
                <div className="pt-3 flex">
                  <span className="w-[35%]">Date of Birth</span>
                  <span className="w-[65%]">
                    {checkin != undefined ? checkin.checkin.birthday : ""}
                  </span>
                </div>
                <div className="pt-3 flex">
                  <span className="w-[35%]">Patient ID</span>
                  <span className="w-[65%]">
                    {checkin != undefined ? checkin?.checkin?.patient?.id : ""}
                  </span>
                </div>
                <div className="pt-3 flex">
                  <span className="w-[35%]">Appointment ID </span>
                  <span className="w-[65%]">
                    {checkin != undefined ? checkin.checkin.appointmentId : ""}
                  </span>
                </div>
                <div className="pt-3 flex">
                  <span className="w-[35%]">Gender</span>
                  <span className="w-[65%]">
                    {checkin != undefined ? checkin.checkin.gender : ""}
                  </span>
                </div>
                <div className="pt-3 flex">
                  <span className="w-[35%]">Phone Number</span>
                  <span>
                    {checkin != undefined ? checkin.checkin.phone : ""}
                  </span>
                </div>
                <div className="pt-3 flex">
                  <span className="w-[35%]">Symptom</span>
                  <span className="w-[65%]">
                    {checkin != undefined ? checkin.checkin.symptom : ""}
                  </span>
                </div>
                <div className="pt-3 flex">
                  <span className="w-[35%]">Description</span>
                  <span className="w-[65%]">
                    {checkin != undefined ? checkin.checkin.note : " "}
                  </span>
                </div>
              </div>
              <div className="pt-6">
                <h1 className="text-[#4976f7] text-3xl font-semibold">
                  Doctor
                </h1>
                <div className="pt-6 flex">
                  <span className="w-[35%]">Doctor ID</span>
                  <span className="w-[65%]">
                    {checkin != undefined ? checkin.doctorId : ""}
                  </span>
                </div>
                <div className="pt-3 flex">
                  <span className="w-[35%]">Specialty</span>
                  <span className="">
                    {checkin != undefined ? checkin.checkin.speciatly : ""}
                  </span>
                </div>
                <div className="pt-3 flex">
                  <span className="w-[35%]">Examination Date</span>
                  <span className="">
                    {checkin != undefined ? checkin.checkin.examDate : ""}
                  </span>
                </div>

                <div className="pt-3 flex">
                  <span className="w-[35%]">Location</span>
                  <span className="">
                    {checkin != undefined ? checkin.checkin.bookPlace : ""}
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
                    disabled={true}
                    value={checkin != undefined ? checkin.clinicProcess : ""}
                    className="w-[98%] h-[120px] pt-[20px] pl-[20px] text-[#42b874]"
                  />
                </div>
              </div>
              <div className="font-medium w-[80%] h-[150px] ml-[79px] m-[20px]">
                <h1 className="mb-[10px]">
                  Summary of Diagnostic Test Results
                </h1>
                <div className="w-[100%] h-[126px] border-[1px] border-[#dddddd] rounded-3xl flex">
                  <div className="w-[1%]"></div>
                  <textarea
                    disabled={true}
                    value={checkin != undefined ? checkin.sumaryResult : ""}
                    className="w-[98%] h-[120px] pt-[20px] pl-[20px] text-[#42b874]"
                  />
                </div>
              </div>
              <div className="font-medium w-[80%] h-[200px] ml-[79px]">
                <h1 className="mb-[10px]">Treatment Approach</h1>
                <div className="w-[100%] h-[126px] border-[1px] border-[#dddddd] rounded-3xl flex">
                  <div className="w-[1%]"></div>
                  <textarea
                    disabled={true}
                    value={checkin != undefined ? checkin.treatment : ""}
                    className="w-[98%] h-[120px] pt-[20px] pl-[20px] text-[#42b874]"
                  />
                </div>
              </div>
              <div className="font-medium w-[80%] h-[200px] ml-[79px]">
                <h1 className="mb-[10px]">Release Time</h1>
                <div className="w-[100%] h-[126px] border-[1px] border-[#dddddd] rounded-3xl flex">
                  <div className="w-[1%]"></div>
                  <input
                    disabled={true}
                    value={
                      checkin != undefined
                        ? formatDateToRight(checkin.releaseTime)
                        : ""
                    }
                    className="w-[98%] h-[120px] pt-[20px] pl-[20px] text-[#42b874]"
                  />
                </div>
              </div>
            </div>
          </div>
        ) : null}
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
          <button
            className="border-[3px] rounded-2xl h-[50px] pl-[30px] pr-[30px] w-[30%] mr-[35px]"
            onClick={handlePrint}
            style={{
              borderColor: "#5562f7",
              color: "#5562f7",
            }}
          >
            Print Result
          </button>
        </div>
      </div>
    </div>
  );
}

export default MedicalRecordDetailsContent;

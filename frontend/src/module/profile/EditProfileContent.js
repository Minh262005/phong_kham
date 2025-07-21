import axios from "axios";
import { publicPort } from "components/url/link";
import jwtDecode from "jwt-decode";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function EditProfileContent() {
  const tabButtons1 = "Cancel ";
  const tabButtons2 = "Save profile";
  // @ts-ignore
  const [active, setActive] = useState(false);
  // @ts-ignore
  const [selectedStaff, setSelectedStaff] = useState(null);
  const navigate = useNavigate();
  const [staffs] = useState([
    { id: 1, month: "January" },
    { id: 2, month: "February" },
    { id: 3, month: "March" },
    { id: 4, month: "April" },
    { id: 5, month: "May" },
    { id: 6, month: "June" },
    { id: 7, month: "July" },
    { id: 8, month: "August" },
    { id: 9, month: "September" },
    { id: 10, month: "October" },
    { id: 11, month: "November" },
    { id: 12, month: "December" },
  ]);

  const [males] = useState([
    { id: "male", maless: "male" },
    { id: "female", maless: "female" },
    { id: "other", maless: "other" },
  ]);

  const [idCard, setIdCard] = useState([
    {
      idC: "",
    },
  ]);
  const [fullName, setFullName] = useState([
    {
      fname: "",
    },
  ]);
  const [emailP, setEmailp] = useState([
    {
      emp: "",
    },
  ]);
  const [birthday, setBirthDay] = useState([
    {
      bday: "",
    },
  ]);
  const [year, setYear] = useState([
    {
      bY: "",
    },
  ]);
  const [month, setMonth] = useState([
    {
      bM: "",
    },
  ]);
  const [date, setDate] = useState([
    {
      bD: "",
    },
  ]);
  const [addresss, setAddresss] = useState([
    {
      adr: "",
    },
  ]);
  const [gender, setGender] = useState([
    {
      gd: "",
    },
  ]);
  const [avatar, setAvatar] = useState([
    {
      avt: "",
    },
  ]);
  const [phonee, setPhonee] = useState([
    {
      pnum: "",
    },
  ]);

  const handleCancel = () => {
    // Go back to the previous page
    window.history.back();
  };

  const handleChangeName = (event) => {
    const { name, value } = event.target;

    console.log(name);
    console.log(value);
    if (name === "idC") {
      const newIDs = {
        ...idCard,
        [name]: value,
      };
      console.log("set ID");
      setIdCard(newIDs);
    }
    if (name === "fname") {
      const newName = {
        ...fullName,
        [name]: value,
      };
      console.log("set name");
      setFullName(newName);
    }
    if (name === "emp") {
      const newMail = {
        ...emailP,
        [name]: value,
      };
      console.log("set mail");
      setEmailp(newMail);
    }
    if (name === "bday") {
      const newBday = {
        ...birthday,
        [name]: value,
      };
      console.log("set birth day");
      setBirthDay(newBday);
    }
    if (name === "adr") {
      const newAdress = {
        ...addresss,
        [name]: value,
      };
      console.log("set Adress");
      setAddresss(newAdress);
    }
    if (name === "gd") {
      const newGender = {
        ...gender,
        [name]: value,
      };
      console.log("set gender");
      setGender(newGender);
    }
    if (name === "avt") {
      const newAvt = {
        ...avatar,
        [name]: value,
      };
      console.log("set avatar");
      setAvatar(newAvt);
    }
    if (name === "pnum") {
      const newPhone = {
        ...phonee,
        [name]: value,
      };
      console.log("set phone");
      setPhonee(newPhone);
    }
    if (name === "bY") {
      const newYear = {
        ...year,
        [name]: value,
      };
      console.log("set year");
      setYear(newYear);
    }
    if (name === "bM") {
      const newMonth = {
        ...month,
        [name]: value,
      };
      console.log("set month");
      setMonth(newMonth);
    }
    if (name === "bD") {
      const newDate = {
        ...date,
        [name]: value,
      };
      console.log("set date");
      setDate(newDate);
    }
  };

  useEffect(() => {
    const listApp = async () => {
      let response;
      const storedName = localStorage.getItem("token");
      if (storedName == null) {
        navigate("/login-user");
      } else {
        try {
          const decoded = jwtDecode(storedName);
          // @ts-ignore
          const role = decoded.roles[0].authority;
          // @ts-ignore
          const mal = decoded.sub;
          response = await axios.get(
            publicPort + `patient/profile?email=${mal}`
          );
          console.log("log at edit content");
          // console.log(response.data);
          const profile = response.data;
          if (profile != undefined) {
            // console.log(profile);
            // @ts-ignore
            setIdCard({ idC: profile.id });
            // @ts-ignore
            setFullName({ fname: profile.name });
            // @ts-ignore
            setEmailp({ emp: profile.email });
            // @ts-ignore
            setBirthDay({ bday: profile.birthDate });
            // @ts-ignore
            setAddresss({ adr: profile.address });
            // @ts-ignore
            setGender({ gd: profile.gender });
            // @ts-ignore
            setAvatar({ avt: profile.avatar });
            // @ts-ignore
            setPhonee({ pnum: profile.phone });

            const [year, month, day] = profile.birthDate.split("/");
            // @ts-ignore
            setYear({ bY: year });
            // @ts-ignore
            setMonth({ bM: month });
            // @ts-ignore
            setDate({ bD: day });
          }
        } catch (error) {
          console.log(error);
        }
      }
    };
    listApp();
  }, []);

  // @ts-ignore
  const handleSelectChange = (event) => {
    const selectID = parseInt(event.target.value);
    const selected = staffs.find((staff) => staff.id === selectID);
    setSelectedStaff(selected);
    if (selectID !== 0) {
      setActive(true);
    } else {
      setActive(false);
    }
  };

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (
      file &&
      file.type.startsWith("image/") &&
      file.size <= 5 * 1024 * 1024
    ) {
      setSelectedFile(file);
    } else {
      setSelectedFile(null);
    }
  };

  var profileSave = {
    id: "",
    name: "",
    email: "",
    birthdate: "",
    address: "",
    gender: "",
    avatar: "",
    phone: "",
  };
  const handleSave = async () => {
    console.log("Enter save");
    // @ts-ignore
    profileSave.id = idCard.idC;
    // @ts-ignore
    profileSave.name = fullName.fname;
    // @ts-ignore
    profileSave.email = emailP.emp;
    // @ts-ignore
    let monthString = month.bM < 10 ?  month.bM.toString().padStart(2, '0') : month.bM.toString();
    profileSave.birthdate = year.bY + "/" + monthString + "/" + date.bD;
    // @ts-ignore
    profileSave.address = addresss.adr;
    // @ts-ignore
    profileSave.gender = gender.gd;
    // @ts-ignore
    profileSave.avatar = avatar.avt;
    // profileSave.avatar = selectedFile;

    // @ts-ignore
    profileSave.phone = phonee.pnum;

    // console.log(profileSave);
    const formData = new FormData();

    formData.append("fileData", selectedFile); // Thêm file vào formData
    formData.append("patient", JSON.stringify(profileSave)); // Thêm thông tin bệnh nhân vào formData

    var response;
    console.log(formData);
    response = await axios.post(
      publicPort + "patient/updateprofile",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data", // Đặt header để server hiểu là gửi dữ liệu dạng multipart/form-data
        },
      }
    );
    // console.log(response);

    if (
      response.data !== "Patient not exists" &&
      response.data != "Update no success"
    ) {
      // console.log(response.data);
      // console.log("true");
      localStorage.setItem("token", response.data);
      navigate("/profilepage");
    } else {
      window.alert(response.data);
    }
  };
  return (
    <div className="w-[100%] min-h-[1000px] bg-white">
      <div className="w-[100%] h-[120px] mb-[10px]">
        <div className="w-[100%] h-[50px]">
          <h1 className=" text-[25px] font-bold">Full Name</h1>
        </div>
        <div className=" flex justify-start w-[100%]">
          <div className="h-[70px] w-[80%] border-[1px] rounded-2xl border-[#c5c4c4]">
            <input
              placeholder="Full name"
              onChange={handleChangeName}
              // @ts-ignore
              value={fullName.fname}
              name="fname"
              className="w-[90%] h-[100%] ml-[10px] text-[20px] "
            />
          </div>
        </div>
      </div>
      <div className="w-[100%] h-[120px] mb-[10px]">
        <div className="w-[100%] h-[50px]">
          <h1 className=" text-[25px] font-bold">Email for communication</h1>
        </div>
        <div className=" flex justify-start w-[100%]">
          <div className="h-[70px] w-[80%] border-[1px] rounded-2xl border-[#c5c4c4] flex">
            <input
              // disabled={true}
              placeholder="Email"
              // @ts-ignore
              value={emailP.emp}
              name="emp"
              onChange={handleChangeName}
              className="w-[80%] h-[100%] ml-[10px] text-[20px] "
            />
          </div>
        </div>
      </div>
      <div>
        <div className="w-[100%] h-[50px]">
          <h1 className=" text-[25px] font-bold">Date of Birth</h1>
        </div>
        <div className="flex w-[100%] mb-[15px]">
          <div className="w-[15%] ">
            <select
              className="h-[70px]  pl-[20px] bg-white text-[20px] border-[1px] rounded-[10px] border-[#c5c4c4]"
              // @ts-ignore
              value={parseInt(month.bM, 10)}
              name="bM"
              onChange={handleChangeName}
            >
              {staffs.map((staff) => (
                <option className="" key={staff.id} value={staff.id}>
                  {staff.month}
                </option>
              ))}
            </select>
          </div>
          <div className="h-[70px] w-[10%] border-[1px] rounded-2xl border-[#c5c4c4]">
            <input
              placeholder="Day"
              onChange={handleChangeName}
              name="bD"
              // @ts-ignore
              value={date.bD}
              className="w-[80%] h-[100%] ml-[10px] text-[20px] "
            />
          </div>
          <div className="h-[70px] w-[10%] border-[1px] rounded-2xl border-[#c5c4c4] ml-[20px]">
            <input
              placeholder="Year"
              onChange={handleChangeName}
              // @ts-ignore
              value={year.bY}
              name="bY"
              className="w-[80%] h-[100%] ml-[10px] text-[20px] "
            />
          </div>
          <div className="w-[65%] ml-[20px] ">
            <select
              className="h-[70px] w-[68%] pl-[20px] bg-white text-[20px] border-[1px] rounded-[10px] border-[#c5c4c4]"
              onChange={handleChangeName}
              // @ts-ignore
              value={gender.gd}
              name="gd"
            >
              <option className="" selected={true} disabled={true}>
                -- Select gender --
              </option>
              {males.map((male) => (
                <option className="" key={male.id} value={male.maless}>
                  {male.maless}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="w-[100%] h-[120px] mb-[10px]">
          <div className="w-[100%] h-[50px]">
            <h1 className=" text-[25px] font-bold">Phone Number</h1>
          </div>
          <div className=" flex justify-start w-[100%]">
            <div className="h-[70px] w-[80%] border-[1px] rounded-2xl border-[#c5c4c4] flex">
              <input
                placeholder="Phone number"
                onChange={handleChangeName}
                // @ts-ignore
                value={phonee.pnum}
                name="pnum"
                className="w-[80%] h-[100%] ml-[10px] text-[20px] "
              />
            </div>
          </div>
        </div>
        <div className="w-[100%] h-[120px] mb-[10px]">
          <div className="w-[100%] h-[50px]">
            <h1 className=" text-[25px] font-bold">Address</h1>
          </div>
          <div className=" flex justify-start w-[100%]">
            <div className="h-[70px] w-[80%] border-[1px] rounded-2xl border-[#c5c4c4] flex">
              <input
                placeholder="Address"
                onChange={handleChangeName}
                // @ts-ignore
                value={addresss.adr}
                name="adr"
                className="w-[80%] h-[100%] ml-[10px] text-[20px] "
              />
            </div>
          </div>
        </div>
        <div className="w-[100%] h-[120px] mb-[10px]">
          <div className="w-[100%] h-[50px]">
            <h1 className=" text-[25px] font-bold">
              Identity card/Citizenship card
            </h1>
          </div>
          <div className=" flex justify-start w-[100%]">
            <div className="h-[70px] w-[80%] border-[1px] rounded-2xl border-[#c5c4c4] flex">
              <input
                disabled={true}
                placeholder="ID Card"
                onChange={handleChangeName}
                // @ts-ignore
                value={idCard.idC}
                name="idC"
                className="w-[80%] h-[100%] ml-[10px] text-[20px] "
              />
            </div>
          </div>
        </div>
        <div className="w-[100%] h-[120px] mb-[10px]">
          <div className="w-[100%] h-[50px]">
            <h1 className=" text-[25px] font-bold">Avatar</h1>
          </div>
          <div className=" flex justify-start w-[100%]">
            <div className="h-[70px] w-[80%] border-[1px] rounded-2xl border-[#c5c4c4] flex">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-[80%] pt-[1.5rem] h-[100%] ml-[10px] text-[20px] "
              />
              {/* {selectedFile && <p>Selected file: {selectedFile.name}</p>} */}
            </div>
          </div>
        </div>
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "start",
              paddingTop: "20px",
            }}
          >
            <button
              key={tabButtons1}
              className="border-[3px] rounded-2xl h-[50px] pl-[30px] pr-[30px] w-[20%] mr-[35px]"
              style={{
                borderColor: "#5562f7",
                color: "#5562f7",
              }}
              onClick={handleCancel}
            >
              {tabButtons1}
            </button>
            <button
              key={tabButtons2}
              className="border-[3px] bg-[#5562f7] rounded-2xl h-[50px] pl-[30px] pr-[30px] w-[20%] mr-[35px]"
              style={{
                borderColor: "#5562f7",
                color: "#ffffff",
              }}
              onClick={handleSave}
            >
              {tabButtons2}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default EditProfileContent;

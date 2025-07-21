import axios from "axios";
import { publicPort } from "components/url/link";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateNewInternalContent() {
  const tabButtons1 = "Cancel ";
  const tabButtons2 = "Create account";
  const [active, setActive] = useState(false);
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

  const [sysRole, setSysRole] = useState();
  const [sysSpec, setSysSpec] = useState();
  const [sysLocation, setSysLocation] = useState();

  useEffect(() => {
    const initData = async () => {
      try {
        const responseLocation = await axios.get(publicPort + "location/list");
        const responseSpec = await axios.get(publicPort + "spec/list");
        const responseRole = await axios.get(publicPort + "role/list");

        //setdata
        setSysLocation(responseLocation.data);
        setSysRole(responseRole.data);
        setSysSpec(responseSpec.data);
      } catch (error) {
        console.log(error);
      }
    };
    initData();
  }, []);

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
  const [password, setpassword] = useState([
    {
      pwd: "",
    },
  ]);
  const [passwordCnfm, setpasswordCnfm] = useState([
    {
      pwdC: "",
    },
  ]);
  const [roleI, setroleI] = useState([
    {
      rlI: "",
    },
  ]);
  const [specialtyD, setspecialtyD] = useState([
    {
      splD: "",
    },
  ]);
  const [workPlc, setworkPlc] = useState([
    {
      wpc: "",
    },
  ]);

  const [avatar, setAvatar] = useState([
    {
      avt: "",
    },
  ]);

  const handleChangeName = (event) => {
    const { name, value } = event.target;

    console.log(name);
    console.log(value);

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

    if (name === "pwd") {
      const newpwd = {
        ...password,
        [name]: value,
      };
      console.log("set password");
      setpassword(newpwd);
    }

    if (name === "pwdC") {
      const newpwdC = {
        ...passwordCnfm,
        [name]: value,
      };
      console.log("set password confirm");
      setpasswordCnfm(newpwdC);
    }

    if (name === "rlI") {
      const newrlI = {
        ...roleI,
        [name]: value,
      };
      console.log("set role");
      setroleI(newrlI);
    }

    if (name === "splD") {
      const newsplD = {
        ...specialtyD,
        [name]: value,
      };
      console.log("set specialty");
      setspecialtyD(newsplD);
    }

    if (name === "wpc") {
      const newwpc = {
        ...workPlc,
        [name]: value,
      };
      console.log("set work place");
      setworkPlc(newwpc);
    }

    if (name === "avt") {
      const newAvt = {
        ...avatar,
        [name]: value,
      };
      console.log("set avatar");
      setAvatar(newAvt);
    }
  };

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
    name: "",
    email: "",
    password: "",
    role: "",
    specialty: "",
    location: "",
    avatar: "",
  };
  const handleSave = async () => {
    console.log("Enter save");
    profileSave.name = fullName.fname;
    profileSave.email = emailP.emp;
    profileSave.password = password.pwd;
    profileSave.role = roleI.rlI;
    profileSave.specialty = specialtyD.splD;
    profileSave.location = workPlc.wpc;
    profileSave.avatar = avatar.avt;
    // profileSave.avatar = selectedFile;

    console.log(profileSave);
     const formData = new FormData();

    formData.append("fileData", selectedFile); // Thêm file vào formData
    formData.append("internal", JSON.stringify(profileSave)); // Thêm thông tin bệnh nhân vào formData

    var response;
    response = await axios.post(
      publicPort + "api/createinter", //thay doi api save
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data", // Đặt header để server hiểu là gửi dữ liệu dạng multipart/form-data
        },
      }
    );
    console.log(response);

    if (response.data === "Create success") {
      navigate("/internals");
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
              name="fname"
              className="w-[90%] h-[100%] ml-[10px] text-[20px] "
            />
          </div>
        </div>
      </div>
      <div className="w-[100%] h-[120px] mb-[10px]">
        <div className="w-[100%] h-[50px]">
          <h1 className=" text-[25px] font-bold">Email</h1>
        </div>
        <div className=" flex justify-start w-[100%]">
          <div className="h-[70px] w-[80%] border-[1px] rounded-2xl border-[#c5c4c4] flex">
            <input
              onChange={handleChangeName}
              placeholder="Email"
              name="emp"
              className="w-[80%] h-[100%] ml-[10px] text-[20px] "
            />
          </div>
        </div>
      </div>
      <div className="w-[100%] h-[120px] mb-[10px]">
        <div className="w-[100%] h-[50px]">
          <h1 className=" text-[25px] font-bold">Password</h1>
        </div>
        <div className=" flex justify-start w-[100%]">
          <div className="h-[70px] w-[80%] border-[1px] rounded-2xl border-[#c5c4c4] flex">
            <input
              onChange={handleChangeName}
              type="password"
              placeholder="Password"
              name="pwd"
              className="w-[80%] h-[100%] ml-[10px] text-[20px] "
            />
          </div>
        </div>
      </div>
      <div className="w-[100%] h-[120px] mb-[10px]">
        <div className="w-[100%] h-[50px]">
          <h1 className=" text-[25px] font-bold">Confirm Password</h1>
        </div>
        <div className=" flex justify-start w-[100%]">
          <div className="h-[70px] w-[80%] border-[1px] rounded-2xl border-[#c5c4c4] flex">
            <input
              onChange={handleChangeName}
              type="password"
              placeholder="RePassword"
              name="pwdC"
              className="w-[80%] h-[100%] ml-[10px] text-[20px] "
            />
          </div>
        </div>
      </div>
      <div>
        <div className="flex w-[100%] mb-[60px]">
          <div className="h-[70px] w-[40%] bg-white text-[20px] mr-[6rem]">
            <div className="w-[100%] h-[50px]">
              <h1 className=" text-[25px] font-bold">Roles and permissions</h1>
            </div>
            <div className="w-[100%] ">
              <select
                className="h-[70px] w-[100%] pl-[20px] bg-white text-[20px] border-[1px] rounded-[10px] border-[#c5c4c4]"
                name="rlI"
                onChange={handleChangeName}
              >
                <option selected={true} disabled={true}>
                  -- Select Role --
                </option>
                {sysRole != undefined &&
                  sysRole.map((role) => (
                    <option className="" key={role.id} value={role.id}>
                      {role.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <div className="h-[70px] w-[100%] pl-[20px] bg-white text-[20px] ">
            <div className="w-[100%] pl-[20px] h-[50px]">
              <h1 className=" text-[25px] font-bold">Specialty</h1>
            </div>
            <div className="w-[98%] ml-[20px] ">
              <select
                className="h-[70px] w-[68%] pl-[20px] bg-white text-[20px] border-[1px] rounded-[10px] border-[#c5c4c4]"
                onChange={handleChangeName}
                name="splD"
              >
                <option selected={true} disabled={true}>
                  -- Select Specialty --
                </option>
                {sysSpec != undefined &&
                  sysSpec.map((specialty) => (
                    <option
                      className=""
                      key={specialty.id}
                      value={specialty.id}
                    >
                      {specialty.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>
        </div>

        <div className="w-[100%] h-[120px] mb-[10px]">
          <div className="w-[100%] h-[50px]">
            <h1 className=" text-[25px] font-bold">Work location</h1>
          </div>
          <div className=" flex justify-start w-[100%]">
            <div className="h-[70px] w-[80%] border-[1px] rounded-2xl border-[#c5c4c4] flex">
              <select
                className="h-[70px] w-[100%] pl-[20px] bg-white text-[20px] border-[1px] rounded-[10px] border-[#c5c4c4]"
                onChange={handleChangeName}
                name="wpc"
              >
                <option selected={true} disabled={true}>
                  -- Select Location --
                </option>
                {sysLocation != undefined &&
                  sysLocation.map((location) => (
                    <option
                      className=""
                      key={location.id}
                      value={location.maless}
                    >
                      {location.name} - {location.description}
                    </option>
                  ))}
              </select>
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
                className="w-[80%] h-[100%] pt-[1.5rem] ml-[10px] text-[20px] "
              />
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
export default CreateNewInternalContent;

import axios from "axios";
import { publicPort } from "components/url/link";
import jwtDecode from "jwt-decode";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function EditProfileContentForDoctor() {
  const [role, setRole] = useState("");

  useEffect(() => {
    const storedName = localStorage.getItem("token");
    if (storedName == null) {
      navigate("/login-user");
    } else {
      try {
        const decoded = jwtDecode(storedName);
        const role = decoded.roles[0].authority;
        setRole(role);
        // if (role !== 'USER') {
        //   navigate("/")
        // }
      } catch (error) {
        console.log(error);
      }
    }
  }, []);
  const tabButtons1 = "Cancel ";
  const tabButtons2 = "Save profile";
  // @ts-ignore
  const [active, setActive] = useState(false);
  const navigate = useNavigate();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  // @ts-ignore
  const [selectedStaff, setSelectedStaff] = useState(null);
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
  const handleCancel = () => {
    // Go back to the previous page
    window.history.back();
  };
  const [sysRole, setSysRole] = useState();
  const [sysSpec, setSysSpec] = useState();
  const [sysLocation, setSysLocation] = useState();
  useEffect(() => {
    const listApp = async () => {
      let response;
      const storedName = localStorage.getItem("token");
      if (storedName == null) {
        navigate("/login");
      } else {
        try {
          const decoded = jwtDecode(storedName);
          // @ts-ignore
          const role = decoded.roles[0].authority;
          // @ts-ignore
          const mal = decoded.sub;
          response = await axios.get(
            publicPort + `api/internal-accounts/search-email?email=${mal}`
          );
          const profile = response.data;
          if (profile != undefined) {
            // @ts-ignore
            setIdCard({ id: profile.id });
            // @ts-ignore
            setFullName({ fname: profile.name });
            // @ts-ignore
            setEmailp({ emp: profile.email });
            // @ts-ignore
            setBirthDay({ bday: profile.birthDate });
            // @ts-ignore
            setworkPlc({
              wpc: `${profile.workingPlace.name} - ${profile.workingPlace.description}`,
            });
            // @ts-ignore
            setGender({ gd: profile.gender });
            // @ts-ignore
            setAvatar({ avt: profile.avatar });
            // @ts-ignore
            setPhonee({ pnum: profile.phone });
            // @ts-ignore
            setEducation({ pedu: profile.education });
            // @ts-ignore
            setExperience({ exp: profile.yearOfExp });
            // @ts-ignore
            setIntroduct({ pin: profile.introduct });
            const [year, month, day] = profile.birthDate.split("/");
            // @ts-ignore
            setYear({ bY: year });
            // @ts-ignore
            setMonth({ bM: month });
            // @ts-ignore
            setDate({ bD: day });
            // @ts-ignore
            setroleI({ rlI: profile.role });
            // @ts-ignore
            setspecialtyD({ splD: profile.specialty });
          }
        } catch (error) {
          console.log(error);
        }
      }
    };
    listApp();
  }, []);
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
  const [idCard, setIdCard] = useState([
    {
      id: "",
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
  const [gender, setGender] = useState([
    {
      gd: "",
    },
  ]);
  const [date, setDate] = useState([
    {
      bD: "",
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
  const [phonee, setPhonee] = useState([
    {
      pnum: "",
    },
  ]);
  const [introduct, setIntroduct] = useState([
    {
      pin: "",
    },
  ]);
  const [education, setEducation] = useState([
    {
      pedu: "",
    },
  ]);
  const [experience, setExperience] = useState([
    {
      exp: "",
    },
  ]);
  const handleChangeName = (event) => {
    const { name, value } = event.target;

    console.log(name);
    console.log(value);
    if (name === "id") {
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

    if (name === "pin") {
      const newIntro = {
        ...introduct,
        [name]: value,
      };
      setIntroduct(newIntro);
    }

    if (name === "pedu") {
      const newEdu = {
        ...education,
        [name]: value,
      };
      console.log("set edu");
      setEducation(newEdu);
    }

    if (name === "exp") {
      const newExp = {
        ...experience,
        [name]: value,
      };
      console.log("set exp");
      setExperience(newExp);
    }

    if (name === "emp") {
      const newMail = {
        ...emailP,
        [name]: value,
      };
      console.log("set mail");
      setEmailp(newMail);
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
    if (name === "gd") {
      const newGender = {
        ...gender,
        [name]: value,
      };
      console.log("set gender");
      setGender(newGender);
    }
    if (name === "bday") {
      const newBday = {
        ...birthday,
        [name]: value,
      };
      console.log("set birth day");
      setBirthDay(newBday);
    }
  };

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
  var profileSave = {
    id: "",
    name: "",
    email: "",
    birthdate: "",
    location: "",
    gender: "",
    avatar: "",
    role: "",
    specialty: "",
    phone: "",
    education: "",
    yearOfExp: "",
    introduct: "",
  };
  const handleSave = async () => {
    console.log("Enter save");
    // @ts-ignore
    profileSave.id = idCard.id;
    // @ts-ignore
    profileSave.name = fullName.fname;
    // @ts-ignore
    profileSave.email = emailP.emp;
    // @ts-ignore
    profileSave.role = roleI.rlI.id;
    // @ts-ignore
    profileSave.specialty = specialtyD.splD.id;
    // @ts-ignore
    profileSave.location = workPlc.wpc;
    // @ts-ignore
    profileSave.avatar = avatar.avt;
    // @ts-ignore
    profileSave.gender = gender.gd;
    // @ts-ignore
    let monthString = month.bM < 10 ?  month.bM.toString().padStart(2, '0') : month.bM.toString();
    profileSave.birthdate = year.bY + "/" + monthString + "/" + date.bD;
    // @ts-ignore
    profileSave.phone = phonee.pnum;
    // @ts-ignore
    profileSave.education = education.pedu;
    // @ts-ignore
    profileSave.yearOfExp = experience.exp;
    // @ts-ignore
    profileSave.introduct = introduct.pin;

    // profileSave.avatar = selectedFile;

    // console.log(profileSave);
    const formData = new FormData();

    formData.append("fileData", selectedFile); // Thêm file vào formData
    formData.append("internal", JSON.stringify(profileSave)); // Thêm thông tin bệnh nhân vào formData

    var response;
    response = await axios.post(
      publicPort + "api/updateprofile", //thay doi api save
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data", // Đặt header để server hiểu là gửi dữ liệu dạng multipart/form-data
        },
      }
    );
    // console.log(response);

    if (
      response.data !== "Internal not exists" &&
      response.data != "Update no success"
    ) {
      // console.log(response.data);
      // console.log("true");
      localStorage.setItem("token", response.data);
      navigate("/profilepage");
    } else {
      window.alert(response.data);
    }

    setIsButtonDisabled(false);
  };
  return (
    <div className="w-[100%] min-h-[1200px] ">
      <div className="w-[100%] min-h-[30%] bg-white flex ">
        <div className="w-[60%] ">
          <div className="w-[95%] h-[120px] mb-[10px] ">
            <div className="w-[90%] h-[50px]">
              <h1 className=" text-[25px] font-bold">Full Name</h1>
            </div>
            <div className=" flex justify-start w-[100%]">
              <div className="h-[70px] w-[100%] border-[1px] rounded-2xl border-[#c5c4c4]">
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
              <h1 className=" text-[25px] font-bold">
                Email for communication
              </h1>
            </div>
            <div className=" flex justify-start w-[100%]">
              <div className="h-[70px] w-[95%] border-[1px] rounded-2xl border-[#c5c4c4] flex">
                <input
                  disabled={true}
                  placeholder="sonlt.clinicmate@gmail.com"
                  // @ts-ignore
                  value={emailP.emp}
                  name="emp"
                  className="w-[90%] h-[100%] ml-[10px] text-[20px] "
                />
              </div>
            </div>
          </div>
          <div>
            <div className="w-[100%] h-[50px] ">
              <h1 className=" text-[25px] font-bold">Date of Birth</h1>
            </div>
            <div className="flex w-[99%] mb-[15px] justify-between ">
              <div className="w-[27%]  flex">
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
              <div className="h-[70px]  w-[28%] border-[1px] rounded-2xl border-[#c5c4c4]">
                <input
                  placeholder="Day"
                  onChange={handleChangeName}
                  name="bD"
                  // @ts-ignore
                  value={date.bD}
                  className="w-[80%] h-[100%] ml-[10px] text-[20px] "
                />
              </div>
              <div className="h-[70px] w-[28%]  border-[1px] rounded-2xl border-[#c5c4c4] mr-[25px]">
                <input
                  placeholder="Year"
                  onChange={handleChangeName}
                  // @ts-ignore
                  value={year.bY}
                  name="bY"
                  className="w-[80%] h-[100%] ml-[10px] text-[20px] "
                />
              </div>
            </div>
            <div className="w-[100%] h-[120px] mb-[14px]">
              <div className="w-[100%] h-[53px] mt-[2px]">
                <h1 className=" text-[25px] font-bold">Contact Number</h1>
              </div>
              <div className=" flex justify-start w-[100%]">
                <div className="h-[70px] w-[95%] border-[1px] rounded-2xl border-[#c5c4c4] flex">
                  <input
                    placeholder="0817411123"
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
              <div className="w-[100%] h-[60px]">
                <h1 className=" text-[25px] font-bold">Location</h1>
              </div>
              <div className=" flex justify-start w-[100%]">
                <div className="h-[70px] w-[95%] border-[1px] rounded-2xl border-[#c5c4c4] flex">
                  {role == "ADMIN" ? (
                    <select
                      className="h-[70px] w-[100%] pl-[20px] bg-white text-[20px] border-[1px] rounded-[10px] border-[#c5c4c4]"
                      onChange={handleChangeName}
                      // @ts-ignore
                      value={workPlc.wpc}
                      name="wpc"
                    >
                      <option selected={true} disabled={true}>
                        -- Select Location --
                      </option>
                      {sysLocation != undefined &&
                        // @ts-ignore
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
                  ) : (
                    <div className="h-[70px] w-[100%] border-[1px] rounded-2xl border-[#c5c4c4] flex">
                      <input
                        placeholder="phone"
                        disabled={true}
                        // @ts-ignore
                        value={workPlc.wpc}
                        name="pnum"
                        className="w-[80%] h-[100%] ml-[10px] text-[20px] "
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[40%] h-[40%]">
          <div className=" w-[100%] h-[250px]  mb-[10px] ">
            <div className="font-medium w-[100%] h-[150px]">
              <h1 className="h-[48px] text-[20px] font-bold">Introduction</h1>
              <div className="w-[100%] h-[200px] border-[1px] border-[#dddddd] rounded-3xl flex">
                <div className="w-[1%]"></div>
                <textarea
                  onChange={handleChangeName}
                  // @ts-ignore
                  value={introduct.pin}
                  name="pin"
                  className="w-[98%] h-[80px] pt-[20px] pl-[20px] "
                />
              </div>
            </div>
          </div>
          <div className=" w-[100%] h-[150px] mb-[10px] ">
            <div className="font-medium w-[100%] h-[150px]">
              <h1 className="h-[48px] text-[20px] font-bold">
                Education Background
              </h1>
              <div className="w-[100%] h-[100px] border-[1px] border-[#dddddd] rounded-3xl flex">
                <div className="w-[1%]"></div>
                <textarea
                  onChange={handleChangeName}
                  // @ts-ignore
                  value={education.pedu}
                  name="pedu"
                  className="w-[98%] h-[80px] pt-[20px] pl-[20px] "
                />
              </div>
            </div>
          </div>
          <div className=" w-[100%] h-[120px] mb-[10px]  ">
            <div className="font-medium w-[100%] h-[150px]">
              <h1 className="h-[48px] text-[20px] font-bold">Experience</h1>
              <div className=" flex justify-start w-[100%]">
                <div className="h-[60px] w-[100%] ">
                  <input
                    type="number"
                    onChange={handleChangeName}
                    // @ts-ignore
                    value={experience.exp}
                    name="exp"
                    className="h-[70px] w-[100%] pl-[20px] bg-white text-[20px] border-[1px] rounded-[10px] border-[#c5c4c4]"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="w-[95%] h-[120px] mb-[10px]">
            <div className="w-[90%] h-[30px] mb-[15px]">
              <h1 className=" text-[20px] font-bold">Gender</h1>
            </div>
            <div className=" flex justify-start w-[100%]">
              <div className="h-[70px] w-[100%] ">
                <select
                  className="h-[70px] w-[100%] pl-[20px] bg-white text-[20px] border-[1px] rounded-[10px] border-[#c5c4c4]"
                  onChange={handleChangeName}
                  // @ts-ignore
                  value={gender.gd}
                  name="gd"
                >
                  <option className="" selected={true} disabled={true}>
                    -- Select gender --
                  </option>
                  {males.map((male) => (
                    <option className="" key={male.id} value={male.id}>
                      {male.maless}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="w-[100%] h-[120px] mb-[10px]">
          <div className="w-[100%] h-[50px]">
            <h1 className=" text-[25px] font-bold">Specialty</h1>
          </div>
          <div className=" flex justify-start w-[100%]">
            {role == "ADMIN" ? (
              <select
                className="h-[70px] w-[98%] pl-[20px] bg-white text-[20px] border-[1px] rounded-[10px] border-[#c5c4c4]"
                onChange={handleChangeName}
                // @ts-ignore
                value={specialtyD.splD}
                name="splD"
              >
                <option selected={true} disabled={true}>
                  -- Select Specialty --
                </option>
                {sysSpec != undefined &&
                  // @ts-ignore
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
            ) : (
              <div className="h-[70px] w-[100%] border-[1px] rounded-2xl border-[#c5c4c4] flex">
                <input
                  placeholder="specialty"
                  disabled={true}
                  // @ts-ignore
                  value={specialtyD?.splD?.name}
                  name="splD"
                  className="w-[80%] h-[100%] ml-[10px] text-[20px] "
                />
              </div>
            )}
          </div>
        </div>
        <div className="w-[100%] h-[120px] mb-[10px]">
          <div className="w-[100%] h-[50px]">
            <h1 className=" text-[25px] font-bold">Roles and permissions</h1>
          </div>
          <div className=" flex justify-start w-[100%]">
            <div className="h-[70px] w-[98%] border-[1px] rounded-2xl border-[#c5c4c4] flex">
              {role == "ADMIN" ? (
                <select
                  className="h-[70px] w-[100%] pl-[20px] bg-white text-[20px] border-[1px] rounded-[10px] border-[#c5c4c4]"
                  name="rlI"
                  // @ts-ignore
                  value={roleI.rlI}
                  onChange={handleChangeName}
                >
                  <option selected={true} disabled={true}>
                    -- Select Role --
                  </option>
                  {sysRole != undefined &&
                    // @ts-ignore
                    sysRole.map((role) => (
                      <option className="" key={role.id} value={role.id}>
                        {role.name}
                      </option>
                    ))}
                </select>
              ) : (
                <div className="h-[70px] w-[100%] border-[1px] rounded-2xl border-[#c5c4c4] flex">
                  <input
                    placeholder="phone"
                    disabled={true}
                    // @ts-ignore
                    name="rlI"
                    // @ts-ignore
                    value={roleI?.rlI?.name}
                    className="w-[80%] h-[100%] ml-[10px] text-[20px] "
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="w-[100%] h-[120px] mb-[10px]">
          <div className="w-[100%] h-[50px]">
            <h1 className=" text-[25px] font-bold">Choose an image</h1>
          </div>
          <div className=" flex justify-start w-[100%]">
            <div className="h-[70px] w-[98%] border-[1px] rounded-2xl border-[#c5c4c4] flex">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-[80%] h-[100%] pt-[1.5rem] ml-[10px] text-[20px] "
              />
            </div>
          </div>
        </div>
      </div>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "start",
            paddingTop: "20px",
            marginBottom: "2%",
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
            disabled={isButtonDisabled}
          >
            {tabButtons2}
          </button>
        </div>
      </div>
    </div>
  );
}
export default EditProfileContentForDoctor;

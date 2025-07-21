import React, { useState, useEffect } from "react";
import Header from "../../components/header/Header";
import IconSpecialty from "../../icon/IconSpecialty";
import IconClinic from "../../icon/IconClinic";
import IconDoctor from "../../icon/IconDoctor";
import ButtonIcon from "../../components/button/ButtonIcon";
import IconCal from "../../icon/IconCal";
import CreatePortalSpecialty from "../../components/createPortal/CreatePortalSpecialty";
import InputInfo from "../../components/input/InputInfo";
import IconPen from "../../icon/IconPen";
import IconPhone from "../../icon/IconPhone";
import IconBirthday from "../../icon/IconBirthday";
import IconGender from "../../icon/IconGender";
import IconDown from "../../icon/IconDown";
import Booking from "../../components/booking/Booking";
import IconPolyclinicvl from "../../icon/IconPolyclinicvl";
import IconDoctorvl from "../../icon/IconDoctorvl";
import IconSysptomvl from "../../icon/IconSysptomvl";
import IconSysptom from "../../icon/IconSysptom";
import CreatePortalSysptom from "../../components/createPortal/CreatePortalSysptom";
import CreatePortalDoctor from "../../components/createPortal/CreatePortalDoctor";
import CreatePortalPlace from "../../components/createPortal/CreatePortalPlace";
import SelectCardSymtom from "./part/SelectCardSymtom";
import SelectCardSpec from "./part/SelectCardSpec";
import SelectCardDoctor from "./part/SelectCardDoctor";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import IconSearch from "../../icon/IconSearch";
import { publicPort } from "../../components/url/link";

const hoursList = [
  {
    id: 1,
    from: "09h00AM",
    to: "09h30AM",
  },
  {
    id: 2,
    from: "09h30AM",
    to: "10h00AM",
  },
  {
    id: 3,
    from: "10h00AM",
    to: "10h30AM",
  },
  {
    id: 4,
    from: "10h30AM",
    to: "11h00AM",
  },
  {
    id: 5,
    from: "11h00AM",
    to: "11h30AM",
  },
  {
    id: 6,
    from: "01h00PM",
    to: "01h30PM",
  },
  {
    id: 7,
    from: "01h30PM",
    to: "02h00PM",
  },
  {
    id: 8,
    from: "02h00PM",
    to: "02h30PM",
  },
  {
    id: 9,
    from: "02h30PM",
    to: "03h00PM",
  },
  {
    id: 10,
    from: "03h00PM",
    to: "03h30PM",
  },
  {
    id: 11,
    from: "03h30PM",
    to: "04h00PM",
  },
  {
    id: 12,
    from: "04h00PM",
    to: "04h30PM",
  },
  {
    id: 13,
    from: "04h30PM",
    to: "05h00PM",
  },
];

const CIContent = () => {
  const navigate = useNavigate();
  const [value, onChange] = useState();
  const [selectedCheckbox, setSelectedCheckbox] = useState("");
  const location = useLocation();
  const [doct, setDoct] = useState();
  const [check, setCheck] = useState();

  useEffect(() => {
    const check_in = location?.state?.appointment;
    setCheck(check_in);
    if (check_in) {
      setFullName({ fname: check_in.patientName });
      if (check_in.patient != null) {
        setIdCard({ idC: check_in.patient.id });
      }
      if (check_in.id != null) {
        setIdApp({ idA: check_in.id });
      }
      setBirthDay({ bday: check_in.birthday });
      setPhone({ pnum: check_in.phone });
      setDescription({ ds: check_in.note });
      setSelectedCheckbox(check_in.gender);
    }
  }, [check]);

  const handleCheckboxChange = (event) => {
    setSelectedCheckbox(event.target.value);
  };

  const [numberOfSym, setNumberOfSym] = useState(0);

  const [fullName, setFullName] = useState([
    {
      fname: "",
    },
  ]);
  const [phone, setPhone] = useState([
    {
      pnum: "",
    },
  ]);
  const [birthday, setBirthDay] = useState([
    {
      bday: "",
    },
  ]);
  const [description, setDescription] = useState([
    {
      ds: "",
    },
  ]);
  const [idCard, setIdCard] = useState([
    {
      idC: "",
    },
  ]);
  const [idApp, setIdApp] = useState([
    {
      idA: "",
    },
  ]);

  const [showSpec, setShowSpec] = useState(false);
  const [showSysptom, setShowSysptom] = useState(false);
  const [showDoctor, setShowDoctor] = useState(false);
  const [showPlace, setShowPlace] = useState(false);
  const [showMore, setShowMore] = useState(true);

  const [symtomArr, setSymtomArr] = useState([]);
  const [spec, setSpec] = useState();
  const [doctor, setDoctor] = useState();
  const [place, setPlace] = useState();
  const [hour, setHour] = useState("");
  const [scheOfDoc, setScheOfDoc] = useState([]);

  const schArr = [];

  useEffect(() => {
    if (value !== undefined && doctor) {
      // console.log(value);
      // Get the offset between UTC and your local time zone in minutes
      const offsetMinutes = value.getTimezoneOffset();

      // Convert the original date to your local time zone
      const localDate = new Date(value.getTime() - offsetMinutes * 60 * 1000);

      // Format the local date as a string with the desired format
      const formattedDate = localDate
        .toISOString()
        .slice(0, 10)
        .replace(/-/g, "/");
      const sche = async () => {
        try {
          const response = await axios.get(
            publicPort + `schedule/list_date/${doctor.id}?date=${formattedDate}`
          );
          // console.log(response.data);
          setScheOfDoc(response.data);
        } catch (error) {
          console.log(error);
        }
      };
      sche();
    }
    // Your code here
  }, [doctor, value]);

  var registers = {
    name: "",
    phone: "",
    idC: "",
    idA: "",
    birthday: "",
    gender: "",
    bookPlace: "",
    symtom: "",
    spec: "",
    doctorId: "",
    description: "",
  };

  /////////////////////input
  const handleChangeName = (event) => {
    const { name, value } = event.target;

    // console.log(name);
    // console.log(value);

    if (name === "fname") {
      const newName = {
        ...fullName,
        [name]: value,
      };
      // console.log("set name");
      setFullName(newName);
    }

    if (name === "pnum") {
      const newPhone = {
        ...phone,
        [name]: value,
      };
      // console.log("set phone");
      setPhone(newPhone);
    }

    if (name === "bday") {
      const newBday = {
        ...birthday,
        [name]: value,
      };
      // console.log("set birth day");
      setBirthDay(newBday);
    }

    if (name === "idC") {
      const newIDs = {
        ...idCard,
        [name]: value,
      };
      setIdCard(newIDs);
    }
    if (name === "idA") {
      const newIDa = {
        ...idApp,
        [name]: value,
      };
      // console.log("set ID appointment");
      setIdApp(newIDa);
    }

    if (name === "ds") {
      const newDs = {
        ...description,
        [name]: value,
      };
      // console.log("set description");
      setDescription(newDs);
    }
  };

  //////////////////////////////////// place
  useEffect(() => {
    // setShowMore(!showMore)
    if (place) {
      setShowMore(true);
    } else {
      setShowMore(false);
    }
  }, [place]);

  const addPlaceItem = (item) => {
    setPlace(item);

    setShowPlace(false);
  };

  const deletePlaceItem = () => {
    setPlace();

    setShowPlace(false);
  };

  const changePlaceList = (item) => {
    if (place === item) {
      deletePlaceItem();
    } else {
      addPlaceItem(item);
    }
  };

  //////////////////////////////////// symtom
  const addSymtomItem = (item) => {
    // console.log(item);
    const newArr = [...symtomArr, item];
    setSymtomArr((pre) => [...pre, item]);

    // setShowSysptom(false);
    // setShowSpec(true)
  };

  const nextSpec = () => {
    setShowSysptom(false);
    setShowSpec(true);
    setDoctor();
    setSpec();
  };

  useEffect(() => {
    if (showSysptom == true) {
      setDoctor();
      setSpec();
    }
  }, [showSysptom]);

  useEffect(() => {
    if (showSpec == true) {
      setDoctor();
      setSpec();
    }
  }, [showSpec]);

  useEffect(() => {
    setNumberOfSym(symtomArr.length);
  }, [symtomArr]);

  const deleteSymtomItem = (sym) => {
    const index = symtomArr.findIndex((item) => item.name === sym.name);

    const newItems = [...symtomArr];
    newItems.splice(index, 1);
    setSymtomArr(newItems);

    setShowPlace(false);
  };
  function checkIdExists(idToCheck) {
    return symtomArr.some((item) => item.id === idToCheck);
  }

  const changeSymtomList = (item) => {
    if (checkIdExists(item.id)) {
      deleteSymtomItem(item);
    } else {
      addSymtomItem(item);
    }
  };

  //////////////////////////////////// spec
  const addSpecItem = (item) => {
    setSpec(item);
    setShowSpec(false);
    setShowDoctor(true);
  };

  const deleteSpecItem = () => {
    setSpec();
    setShowSpec(false);
  };

  const changeSpecList = (item) => {
    if (spec === item) {
      deleteSpecItem();
    } else {
      addSpecItem(item);
    }
  };
  //////////////////////////////////// doctor
  const addDoctorItem = (item) => {
    // console.log(item);
    setDoctor(item);
    setShowDoctor(false);
  };

  const deleteDoctorItem = () => {
    setDoctor();
    setShowDoctor(false);
  };

  const changeDoctorList = (item) => {
    if (doctor === item) {
      deleteDoctorItem();
    } else {
      addDoctorItem(item);
    }
  };

  const addHour = (item) => {
    let h = item.from + " - " + item.to;
    // console.log(h);
    setHour(h);
  };

  const bookAppointment = async () => {
    console.log(idCard.idC);
    if (idCard.idC == "") {
      console.log(true);
      setIdCard((prevState) => {
        return {
          ...prevState,
          idC: null,
        };
      });
    }
    if (
      fullName.fname === undefined ||
      phone.pnum === undefined ||
      birthday.bday === undefined ||
      selectedCheckbox === "" ||
      place === undefined ||
      spec === undefined ||
      doctor === undefined
    ) {
      alert("Please fill all field");
      return;
    }

    if (phone.pnum == "" || phone.pnum.length != 10) {
      alert("Phone number must be 10 numbers");
      return;
    }
    if (idCard.idC != undefined) {
      if (idCard.idC != "" && idCard.idC.length != 12) {
        alert("Identity number must be 12 numbers");
        return;
      }
    }

    registers.name = fullName.fname;
    registers.phone = phone.pnum;
    registers.idC = idCard.idC;
    registers.idA = idApp.idA;
    registers.birthday = birthday.bday;
    registers.gender = selectedCheckbox;
    // registers.foreign = selectedForeign;
    registers.bookPlace = place.name + " - " + place.description;
    if (symtomArr != undefined) {
      registers.symtom = symtomArr.map((item) => `${item.name}`).join(", ");
    }
    registers.spec = spec.name;
    registers.doctorId = doctor.id;
    registers.description = description.ds;

    const currentDate = new Date();
    // console.log("log: " + registers);

    const bdatee = new Date(registers.birthday);
    if (bdatee > currentDate) {
      alert("Birthdate is not valid");
      return;
    }
    console.log(registers);
    navigate("/checkinConfirmation", { state: { registers } });
  };

  return (
    <>
      <div className="max-w-[1156px] mx-auto mt-[8rem]">
        <CreatePortalPlace
          checkinplace={check?.bookPlace}
          changePlaceList={changePlaceList}
          open={showPlace}
          onClose={() => setShowPlace(false)}
          visible={showPlace}
          handleClose={() => setShowPlace(false)}
        ></CreatePortalPlace>
        <CreatePortalSysptom
          setSymtom={setSymtomArr}
          checkinsymptom={check?.symptom}
          symtomArr={symtomArr}
          nextSpec={nextSpec}
          numberOfSym={numberOfSym}
          changeSymtomList={changeSymtomList}
          open={showSysptom}
          onClose={() => setShowSysptom(false)}
          visible={showSysptom}
          handleClose={() => setShowSysptom(false)}
        ></CreatePortalSysptom>
        <CreatePortalSpecialty
          checkinSpec={check?.speciatly}
          symtomArr={symtomArr}
          spec={spec}
          changeSpecList={changeSpecList}
          open={showSpec}
          onClose={() => setShowSpec(false)}
          visible={showSpec}
          handleClose={() => setShowSpec(false)}
        ></CreatePortalSpecialty>
        <CreatePortalDoctor
          checkindoc={check?.doctorName}
          place={place}
          doctor={doctor}
          spec={spec}
          changeDoctorList={changeDoctorList}
          open={showDoctor}
          onClose={() => setShowDoctor(false)}
          visible={showDoctor}
          handleClose={() => setShowDoctor(false)}
        ></CreatePortalDoctor>
        <h3 className="text-[32px] font-semibold text-gradient">Check-in</h3>
        <div className="mt-[10rem]">
          <Header number={1}>Personal information</Header>
          <div className="mt-[4.4rem]">
            <div className="grid grid-cols-2 gap-x-[12.2rem] gap-y-[3rem]">
              <InputInfo
                handleChangeName={handleChangeName}
                icon={<IconPen />}
                name={"fname"}
                placeholder="Your name"
                value={fullName.fname}
              ></InputInfo>
              <InputInfo
                handleChangeName={handleChangeName}
                name={"pnum"}
                icon={<IconPhone />}
                placeholder="Your phone"
                value={phone.pnum}
              ></InputInfo>
              <InputInfo
                handleChangeName={handleChangeName}
                name={"idC"}
                type={"number"}
                icon={<IconSearch />}
                placeholder="Your patient ID"
                value={idCard.idC}
              ></InputInfo>
              <InputInfo
                handleChangeName={handleChangeName}
                name={"idA"}
                type={"number"}
                icon={<IconSearch />}
                placeholder="Your appointment ID"
                value={idApp.idA}
              ></InputInfo>
              <InputInfo
                handleChangeName={handleChangeName}
                type={"date"}
                name={"bday"}
                icon={<IconBirthday />}
                placeholder="Your Birthday"
                value={birthday.bday}
              ></InputInfo>
              <div className="relative flex gap-[2.4rem] py-[1.6rem] items-center border-b border-grayborder">
                <span>
                  <IconGender />
                </span>
                <div className="flex gap-[3.3rem] items-center">
                  <div className="flex items-center gap-[0.8rem]">
                    <input
                      className="w-[1.6rem] h-[1.6rem]"
                      type="checkbox"
                      checked={selectedCheckbox === "male"}
                      onChange={handleCheckboxChange}
                      name="gender"
                      value="male"
                      id="male"
                    />
                    <label htmlFor="male" className="font-semibold">
                      {" "}
                      Male
                    </label>
                  </div>
                  <div className="flex items-center gap-[0.8rem]">
                    <input
                      id="female"
                      className="w-[1.6rem] h-[1.6rem]"
                      type="checkbox"
                      checked={selectedCheckbox === "female"}
                      onChange={handleCheckboxChange}
                      name="gender"
                      value="female"
                    />
                    <label htmlFor="female" className="font-semibold">
                      Female
                    </label>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-[0.8rem]"></div>
            </div>
          </div>
        </div>
        <Header number={2} className="mt-[6.4rem]">
          Appointment information
        </Header>

        <div className="mt-[4.4rem]" onClick={() => setShowPlace(true)}>
          <div className="flex items-center justify-between border border-grayborder p-[1.9rem_2.4rem] rounded-[1.6rem]">
            <div className="flex items-center gap-[1.6rem]">
              <span className="text-black1">
                <IconClinic />
              </span>
              <span className="text-gradient font-bold text-[1.8rem]">
                {!place ? (
                  <> choose place</>
                ) : (
                  <>
                    {place.description} - {place.name}
                  </>
                )}
              </span>
            </div>
            <span>
              <IconDown></IconDown>{" "}
            </span>
          </div>
        </div>
        {showMore ? (
          <>
            <h4 className="text-[1.8rem] my-[3.2rem]">
              Preferred method booking <span className="text-error">*</span>
            </h4>
            <div className="flex items-center gap-[59px] justify-between">
              <SelectCardSymtom
                numberOfSym={numberOfSym}
                styleIcon="text-[#27AE60] bg-[#27AE60]"
                icon={<IconSysptom />}
                title="Sysptom"
                describe="Select a Sysptom"
                onClick={() => setShowSysptom(true)}
              ></SelectCardSymtom>
              <SelectCardSpec
                spec={spec}
                onClick={() => setShowSpec(true)}
                styleIcon="text-[#855FCE] bg-[#855FCE]"
                icon={<IconSpecialty />}
                title="Specialty"
                describe="Select a Specialty"
              ></SelectCardSpec>

              <SelectCardDoctor
                doctor={doctor}
                onClick={() => setShowDoctor(true)}
                styleIcon="text-[#2F80ED] bg-[#2F80ED]"
                icon={<IconDoctor />}
                title="Doctor"
                describe="Select a doctor"
              ></SelectCardDoctor>
            </div>

            <div className="mt-[3.2rem] shadow-md p-[3.6rem_2.6rem] rounded-[3.2rem]">
              <div className="grid grid-cols-3 gap-[4rem]">
                {symtomArr.length <= 0 ? (
                  <></>
                ) : symtomArr.length > 2 ? (
                  <Booking
                    icon={<IconSysptomvl />}
                    value={
                      symtomArr[0].name +
                      "; " +
                      symtomArr[1].name +
                      ";" +
                      "......"
                    }
                  ></Booking>
                ) : symtomArr.length == 2 ? (
                  <Booking
                    icon={<IconSysptomvl />}
                    value={symtomArr[0].name + "; " + symtomArr[1].name}
                  ></Booking>
                ) : (
                  <Booking
                    icon={<IconSysptomvl />}
                    value={symtomArr[0].name}
                  ></Booking>
                )}
                {spec == undefined ? (
                  <></>
                ) : (
                  <Booking
                    icon={<IconPolyclinicvl />}
                    value={spec.name}
                  ></Booking>
                )}
                {!doctor ? (
                  <></>
                ) : (
                  <Booking
                    icon={<IconDoctorvl />}
                    value={doctor.name}
                  ></Booking>
                )}
              </div>
              <div className="mt-[2.4rem] text-[1.8rem] gap-[10.4rem] flex justify-end font-bold">
                <span className="text-gradient">Estimated examination fee</span>
                {spec == null || doctor == null ? (
                  <>0đ</>
                ) : (
                  <span className="text-warning">300.000đ</span>
                )}
              </div>
            </div>
          </>
        ) : (
          <></>
        )}

        <div className="mt-[6.4rem] ">
          <Header number={3}>Reasons for medical examination</Header>
          <div className="flex gap-[3rem] mt-[4.4rem] shadow-md rounded-[2.4rem] p-[2.8rem_3.2rem]">
            <span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.2808 19.3922L20.1557 10.5173C18.6625 9.89388 17.3065 8.98305 16.1646 7.83658C15.0176 6.69448 14.1064 5.338 13.4827 3.84433L4.60783 12.7192C3.91545 13.4116 3.56867 13.7584 3.27108 14.14C2.91962 14.5903 2.61825 15.0775 2.37231 15.5931C2.16472 16.0299 2.00992 16.4955 1.70033 17.4242L0.0659923 22.3237C-0.00922858 22.548 -0.0203887 22.7889 0.033766 23.0192C0.0879207 23.2495 0.205244 23.4601 0.372547 23.6275C0.53985 23.7948 0.750502 23.9121 0.980824 23.9662C1.21115 24.0204 1.45201 24.0092 1.67633 23.934L6.57576 22.2997C7.50573 21.9901 7.97011 21.8353 8.40689 21.6277C8.92288 21.3817 9.41006 21.0805 9.86004 20.7289C10.2416 20.4313 10.5884 20.0845 11.2808 19.3922ZM22.618 8.05498C23.5029 7.17009 24 5.96992 24 4.7185C24 3.46707 23.5029 2.26691 22.618 1.38202C21.7331 0.497126 20.5329 9.32383e-09 19.2815 0C18.0301 -9.32383e-09 16.8299 0.497126 15.945 1.38202L14.8807 2.44638L14.9263 2.57957C15.4508 4.08038 16.3091 5.44255 17.4366 6.56343C18.591 7.72463 20.0008 8.59989 21.5536 9.11934L22.618 8.05498Z"
                  fill="black"
                />
              </svg>
            </span>
            <textarea
              onChange={handleChangeName}
              className="w-full h-[24rem]"
              name="ds"
              value={description.ds}
              id=""
              placeholder="Detailed description your symptoms or your needs "
            ></textarea>
          </div>
        </div>
        <div className="pb-[6.4rem]">
          <ButtonIcon
            iconLeft={<IconCal />}
            className="!rounded-[1.6rem] p-[1.6rem_4rem] w-max mt-[6.4rem] "
            onClick={bookAppointment}
          >
            Check-in
          </ButtonIcon>
        </div>
      </div>
    </>
  );
};

export default CIContent;

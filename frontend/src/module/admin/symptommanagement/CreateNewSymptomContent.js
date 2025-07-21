import axios from "axios";
import { publicPort } from "components/url/link";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateNewSymptomContent() {
  const tabButtons1 = "Cancel ";
  const tabButtons2 = "Create symptom";
  const navigate = useNavigate();

  const [Name, setName] = useState([
    {
      name: "",
    },
  ]);
  const [desciption, setDescription] = useState([
    {
      des: "",
    },
  ]);
  const [spec, setSpec] = useState([
    {
      spc: "",
    },
  ]);

  const [listSymptom, setListSymptom] = useState();

  useEffect(() => {
    const app = async () => {
      const response = await axios.get(publicPort + `spec/list`);
      setListSymptom(response.data);
    };
    app();
  }, []);

  const handleChangeName = (event) => {
    const { name, value } = event.target;

    console.log(name);
    console.log(value);

    if (name === "name") {
      const newName = {
        ...Name,
        [name]: value,
      };
      setName(newName);
    }

    if (name === "des") {
      const newDes = {
        ...desciption,
        [name]: value,
      };
      setDescription(newDes);
    }

    if (name === "spc") {
      const newSpc = {
        ...spec,
        [name]: value,
      };
      setSpec(newSpc);
    }
  };

  var objectSave = {
    name: "",
    description: "",
    specid: "",
  };
  const handleSave = async () => {
    console.log("Enter save");
    objectSave.name = Name.name;
    objectSave.description = desciption.des;
    objectSave.specid = spec.spc;

    console.log(objectSave);
    if (
      objectSave.name == "" ||
      objectSave.name == undefined ||
      objectSave.description == "" ||
      objectSave.description == undefined ||
      objectSave.specid == null ||
      objectSave.specid == undefined
    ) {
      alert("Please fill all fields");
    } else {
      const response = await axios.post(
        publicPort + `symptom/save`,
        objectSave
      );
      console.log(response);
      if (response.data == "success") {
        navigate("/symptoms");
      } else {
        alert(response.data);
      }
    }
  };
  const goBack = () => {
    navigate("/symptoms");
  };
  return (
    <div className="w-[100%] min-h-[1000px] bg-white">
      <div className="w-[100%] h-[120px] mb-[10px]">
        <div className="w-[100%] h-[50px]">
          <h1 className=" text-[25px] font-bold">Name</h1>
        </div>
        <div className=" flex justify-start w-[100%]">
          <div className="h-[70px] w-[80%] border-[1px] rounded-2xl border-[#c5c4c4]">
            <input
              placeholder="Name"
              onChange={handleChangeName}
              name="name"
              className="w-[90%] h-[100%] ml-[10px] text-[20px] "
            />
          </div>
        </div>
      </div>
      <div className="w-[100%] h-[120px] mb-[10px]">
        <div className="w-[100%] h-[50px]">
          <h1 className=" text-[25px] font-bold">Description</h1>
        </div>
        <div className=" flex justify-start w-[100%]">
          <div className="h-[70px] w-[80%] border-[1px] rounded-2xl border-[#c5c4c4] flex">
            <input
              onChange={handleChangeName}
              placeholder="Description"
              name="des"
              className="w-[80%] h-[100%] ml-[10px] text-[20px] "
            />
          </div>
        </div>
      </div>
      <div className="w-[100%] h-[120px] mb-[10px]">
        <div className="w-[100%] h-[50px]">
          <h1 className=" text-[25px] font-bold">Specialty</h1>
        </div>
        <div className=" flex justify-start w-[100%]">
          <div className="h-[60px] w-[22%] border-[1px] rounded-2xl border-[#c5c4c4] flex">
            <select
              className="h-[60px] w-[100%] pl-[10px] bg-white text-[20px] border-[1px] rounded-[10px] border-[#c5c4c4]"
              // value={status.sT}
              name="spc"
              onChange={handleChangeName}
            >
              <option selected={true} disabled={true}>
                -- Choose Specialty --
              </option>
              {listSymptom != undefined &&
                listSymptom.map((staff) => (
                  <option className="" key={staff.id} value={staff.id}>
                    {staff.name}
                  </option>
                ))}
            </select>
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
            onClick={goBack}
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
  );
}
export default CreateNewSymptomContent;

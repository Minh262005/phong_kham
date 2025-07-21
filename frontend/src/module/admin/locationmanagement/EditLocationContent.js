import axios from "axios";
import { publicPort } from "components/url/link";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function EditLocationContent({ item }) {
  const tabButtons1 = "Cancel ";
  const tabButtons2 = "Update Location";
  const navigate = useNavigate();

  const [idLo, setIdLo] = useState([
    {
      idL: "",
    },
  ]);
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
  const [status, setStatus] = useState([
    {
      sT: "",
    },
  ]);

  useEffect(() => {
    if (item != undefined) {
      setIdLo({ idL: item.id });
      setName({ name: item.name });
      setDescription({ des: item.description });
      setStatus({ sT: item.commandFlag });
    }
  }, [item]);

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
    if (name === "sT") {
      const newSt = {
        ...status,
        [name]: value,
      };
      setStatus(newSt);
    }
  };

  var objectSave = {
    id: "",
    name: "",
    desciption: "",
    commandFlag: "",
  };
  const handleSave = async () => {
    console.log("Enter save");
    objectSave.id = idLo.idL;
    objectSave.name = Name.name;
    objectSave.description = desciption.des;
    objectSave.commandFlag = status.sT;

    console.log(objectSave);
    if (
      objectSave.name == "" ||
      objectSave.name == undefined ||
      objectSave.description == "" ||
      objectSave.description == undefined ||
      objectSave.commandFlag == "" ||
      objectSave.commandFlag == undefined
    ) {
      alert("Please fill all fields");
    } else {
      const response = await axios.post(
        publicPort + `location/save`,
        objectSave
      );
      console.log(response);
      if (response.data == "success") {
        navigate("/locations");
      } else {
        alert(response.data);
      }
    }
  };
  const [flags] = useState([
    { id: "0", value: "Active" },
    { id: "2", value: "Block" },
  ]);
  const goBack = () => {
    navigate("/locations");
  };
  return (
    <div className="w-[100%] min-h-[1000px] bg-white">
      <div className="w-[100%] h-[120px] mb-[10px]">
        <div className="w-[100%] h-[50px]">
          <h1 className=" text-[25px] font-bold">ID</h1>
        </div>
        <div className=" flex justify-start w-[100%]">
          <div className="h-[70px] w-[80%] border-[1px] rounded-2xl border-[#c5c4c4]">
            <input
              disabled={true}
              placeholder="ID"
              onChange={handleChangeName}
              value={idLo.idL}
              name="idL"
              className="w-[90%] h-[100%] ml-[10px] text-[20px] "
            />
          </div>
        </div>
      </div>
      <div className="w-[100%] h-[120px] mb-[10px]">
        <div className="w-[100%] h-[50px]">
          <h1 className=" text-[25px] font-bold">Name</h1>
        </div>
        <div className=" flex justify-start w-[100%]">
          <div className="h-[70px] w-[80%] border-[1px] rounded-2xl border-[#c5c4c4] flex">
            <input
              onChange={handleChangeName}
              placeholder="Name"
              value={Name.name}
              name="name"
              className="w-[80%] h-[100%] ml-[10px] text-[20px] "
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
              value={desciption.des}
              name="des"
              className="w-[80%] h-[100%] ml-[10px] text-[20px] "
            />
          </div>
        </div>
      </div>
      <div className="w-[100%] h-[120px] mb-[10px]">
        <div className="w-[100%] h-[50px]">
          <h1 className=" text-[25px] font-bold">Status</h1>
        </div>
        <div className=" flex justify-start w-[100%]">
          <div className="h-[60px] w-[20%] border-[1px] rounded-2xl border-[#c5c4c4] flex">
            <select
              className="h-[60px] w-[100%] pl-[10px] bg-white text-[20px] border-[1px] rounded-[10px] border-[#c5c4c4]"
              value={status.sT}
              name="sT"
              onChange={handleChangeName}
            >
              <option selected={true} disabled={true}>
                -- Choose Status --
              </option>
              {flags.map((staff) => (
                <option className="" key={staff.id} value={staff.id}>
                  {staff.value}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div>
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
    </div>
  );
}
export default EditLocationContent;

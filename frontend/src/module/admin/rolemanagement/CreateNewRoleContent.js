import axios from "axios";
import { publicPort } from "components/url/link";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateNewRoleContent() {
  const tabButtons1 = "Cancel ";
  const tabButtons2 = "Create role";
  const navigate = useNavigate();

  const [Name, setName] = useState([
    {
      name: "",
    },
  ]);

  const handleChangeName = (event) => {
    const { name, value } = event.target;

    if (name === "name") {
      const newName = {
        ...Name,
        [name]: value,
      };
      setName(newName);
    }
  };

  var objectSave = {
    name: "",
  };
  const handleSave = async () => {
    console.log("Enter save");
    objectSave.name = Name.name;

    console.log(objectSave);
    if (objectSave.name == "" || objectSave.name == undefined) {
      alert("Please fill name");
    } else {
      const response = await axios.post(publicPort + `role/save`, objectSave);
      console.log(response);
      if (response.data == "success") {
        navigate("/roles");
      } else {
        alert(response.data);
      }
    }
  };
  const goBack = () => {
    navigate("/roles");
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
export default CreateNewRoleContent;

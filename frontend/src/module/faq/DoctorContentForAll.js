import React, { useEffect, useState } from "react";
import DoctorList from "./DoctorListContentComponent/DoctorList";
import DoctorSearch from "./DoctorListContentComponent/DoctorSearch";
import DoctorSpecialty from "./DoctorListContentComponent/DoctorSpecialty";
import DoctorUserful from "./DoctorListContentComponent/DoctorUserful";
import axios from "axios";
import { publicPort } from "components/url/link";

function DoctorContentForAll({ role }) {
  const [searchspec, setsearchspec] = useState({
    spc: "",
  });
  const [searchlocation, setsearchlocation] = useState({
    lo: "",
  });
  const [searchname, setsearchname] = useState({
    sn: "",
  });

  const [docList, setdocList] = useState();

  useEffect(() => {
    const listApp = async () => {
      try {
        let response;

        response = await axios.get(publicPort + "api/doctors");
        setdocList(response.data);
        // console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    listApp();
  }, []);

  const handleSearchInputChange = (event) => {
    const { name, value } = event.target;
    const newSn = {
      ...searchname,
      [name]: value,
    };
    setsearchname(newSn);
  };

  const handleChangeName = (event) => {
    const { name, value } = event.target;

    console.log(name);
    console.log(value);

    if (name === "spc") {
      const newSpc = {
        ...searchspec,
        [name]: value,
      };
      setsearchspec(newSpc);
    }

    if (name === "lo") {
      const newLoca = {
        ...searchlocation,
        [name]: value,
      };
      setsearchlocation(newLoca);
    }
  };

  return (
    <div className="flex w-[100%]">
      <div className="w-[75%] mr-[25px]">
        <div>
          <DoctorSearch
            handleChangeName={handleChangeName}
            handleSearchInputChange={handleSearchInputChange}
          />
        </div>
        <div className="pt-16 bg-[#fff]">
          <DoctorList
            role={role}
            docList={docList}
            searchspec={searchspec}
            searchlocation={searchlocation}
            searchname={searchname}
          />
        </div>
      </div>
      <div className="w-[25%] mt-[90px]">
        <div>
          <DoctorSpecialty />
        </div>
        <div className="pt-[30px]">
          <DoctorUserful />
        </div>
      </div>
    </div>
  );
}
export default DoctorContentForAll;

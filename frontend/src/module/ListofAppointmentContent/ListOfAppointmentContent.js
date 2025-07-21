import { useEffect, useState } from "react";
import { GoSearch } from "react-icons/go";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import AppointmentConfirm from "./Content/AppointmentConfirm";
import AppointmentRequested from "./Content/AppointmentRequested";
import React from "react";
import axios from "axios";
import { publicPort } from "components/url/link";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";

function ListOfAppointmentContent({ role, mail }) {
  const [showA, setShowA] = useState(true);
  const [showB, setShowB] = useState(false);
  const [listData, setListData] = useState([]);
  const [listOrigin, setListOrigin] = useState([]);
  const navigate = useNavigate();
  const [Email, setMail] = useState();
  const [rol, setRol] = useState();
  const [listConFirm, setListConFirm] = useState();
  const [listRequested, setListRequested] = useState();
  useEffect(() => {
    // console.log(mail);
    if (mail == undefined) {
      setMail(mail);
    }
    let r;
    let m;

    const storedName = localStorage.getItem("token");
    try {
      const decoded = jwtDecode(storedName);
      const role = decoded.roles[0].authority;
      r = role;
      setRol(role);
      setMail(decoded.sub);
      m = decoded.sub;
      // console.log(decoded.sub);
    } catch (error) {
      console.log(error);
    }

    const listApp = async () => {
      try {
        let response;
        let response1;
        let id;
        if (r == "USER") {
          response1 = await axios.get(
            publicPort + `patient/profile?email=${m}`
          );
          // console.log(response1.data);
          id = response1.data.id;

          // console.log(id);
          response = await axios.get(
            publicPort + `appointment/listBypaintedId?painted_id=${id}`
          );
          setListOrigin(response.data);
          setListData(response.data);

          const confirm = response.data.filter(
            (item) => item.commandFlag === 1
          );
          console.log(confirm);
          setListConFirm(confirm);

          const request = response.data.filter(
            (item) => item.commandFlag === 0
          );
          console.log(request);
          setListRequested(request);

          // console.log(response.data);
        } else {
          response = await axios.get(publicPort + "appointment/list");
          setListOrigin(response.data);
          setListData(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    listApp();
  }, [Email, rol]);

  const handleConfirmedClick = () => {
    setShowA(true);
    setShowB(false);
  };

  const handleRequestedClick = () => {
    setShowA(false);
    setShowB(true);
  };

  return (
    <div className="min-h-[700px] w-[100%] shadow-xl ">
      <div className="w-[100%] h-[100px] flex justify-center">
        <div className="w-[90%]  flex ">
          <div
            className="w-[12%] h-[20px] cursor-pointer"
            onClick={handleConfirmedClick}
            style={{ color: showA ? "#3a8ef6" : "black" }}
          >
            <h1 className="font-bold">Confirmed</h1>
          </div>
          <div
            className="w-[90%] h-[20px] cursor-pointer"
            onClick={handleRequestedClick}
            style={{ color: showB ? "#3a8ef6" : "black" }}
          >
            <h1 className="font-bold">Requested</h1>
          </div>
        </div>
      </div>
      <div>
        {showA && (
          <div>
            <AppointmentConfirm listConFirm={listConFirm} />
          </div>
        )}
        {showB && (
          <div>
            <AppointmentRequested listRequested={listRequested} />
          </div>
        )}
      </div>
    </div>
  );
}
export default ListOfAppointmentContent;

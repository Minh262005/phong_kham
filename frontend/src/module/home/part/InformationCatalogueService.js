import React from "react";
import Vectorneurology from "../../../ImageService/Vectorneurology.png";
import MdChildCare from "../../../ImageService/Paediatric.png";
import GiBrokenBone from "../../../ImageService/GroupXray.png";
import FaTooth from "../../../ImageService/dentalcare.png";
import FaMicroscope from "../../../ImageService/Laboratory.png";
import FaEye from "../../../ImageService/eyeEyeCare.png";
import { useNavigate } from "react-router-dom";
const listCmt = [
  {
    id: 1,
    comment:
      "“Fast application, useful and secure linking feature to look up examination history”",
    avatar: Vectorneurology,
    fullname: "Neurology",
  },
  {
    id: 2,
    comment: "“Easy appointment. Smart application and utility for users”",
    avatar: MdChildCare,
    fullname: "Peadiatric",
  },
  {
    id: 3,
    comment: "“Very convenient. Save a lot of time. Simple but effective”",
    avatar: GiBrokenBone,
    fullname: "X-ray",
  },
  {
    id: 4,
    comment:
      "“Beautiful interface. Waiting for the next versions. Thanks ClinicMate”",
    avatar: FaTooth,
    fullname: "Dental Care",
  },
  {
    id: 5,
    comment:
      "“Beautiful interface. Waiting for the next versions. Thanks ClinicMate”",
    avatar: FaMicroscope,
    fullname: "Laboratory",
  },
  {
    id: 6,
    comment:
      "“Beautiful interface. Waiting for the next versions. Thanks ClinicMate”",
    avatar: FaEye,
    fullname: "Eye care",
  },
];

const InformationCatalogueService = () => {
  const navigate = useNavigate();
  const handleNewPage = () => {
    navigate("/newspage");
  };
  return (
    <div className="grid grid-cols-3 gap-10 py-[20px]">
      {listCmt.length > 0 &&
        listCmt?.map((item) => {
          return (
            <div
              className="p-[32px] shadow-lg bg-white flex flex-col gap-8 rounded-[32px]"
              key={item.id}
              onClick={handleNewPage}
            >
              <div className="w-[80px] h-[80px] overflow-hidden">
                <img src={item.avatar} alt="" />
              </div>
              <div className="">
                <div className="flex flex-col gap-1">
                  <span className="font-medium text-black2 text-[20px]">
                    {item.fullname}
                  </span>
                </div>
              </div>
              <span className="font-light italic text-[20px] text-black2">
                {item.comment}
              </span>
            </div>
          );
        })}
    </div>
  );
};

export default InformationCatalogueService;

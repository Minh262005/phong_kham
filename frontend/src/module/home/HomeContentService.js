import React, { useEffect, useState } from "react";
import imgDoctor from "../../Images/Doctor2.png";
import HomeDoctorLookupSevirce from "./part/HomeDoctorLookupSevirce";
import InformationCatalogueService from "./part/InformationCatalogueService";
import { useNavigate } from "react-router-dom";
import FeaturedSeliderSevirce from "./part/FeaturedSeliderSevirce";
import LatestNewService from "./part/LatestNewService";
import { publicPort } from "../../components/url/link";

const HomeContentService = () => {
  const tabButtons = ["In-Person", "E - consultations"];
  const [type, setType] = useState("In-Person");
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      const currentIndex = tabButtons.indexOf(type);
      const nextIndex = (currentIndex + 1) % tabButtons.length;
      setType(tabButtons[nextIndex]);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [type, tabButtons]);

  const handleBook = () => {
    navigate("/book_appointment");
  };

  return (
    <div className="bg-white pt-[3rem] ">
      <div className="flex items-center gap-[141px] justify-between max-w-[1156px] mx-auto h-[580px] ">
        <div className="flex flex-col w-[590px] h-[300px] ">
          <div>
            <span className="text-[32px] font-bold">
              Book Appointments Online with Doctors for
            </span>
            <span className="text-[32px] mt-6 text-[#fff0] ml-[10px] font-bold bg-clip-text w-max bg-gradient-to-tr from-gradientLeft to-gradientRight">
              {type}
            </span>
          </div>
          <span className="mt-2 text-textColor2">
            Top healthcare application for your family
          </span>
          <p className="mt-8 text-textColor2">
            As a busy day passes by, we have grown neglectful of our most
            valuable possession: Health. Let ClinicMate become the trusted
            keeper of that asset for you and your family.
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              paddingTop: "20px",
            }}
          >
            {tabButtons.map((tabButton) => (
              <button
                key={tabButton}
                className="border-[3px] rounded-2xl h-[50px] pl-[30px] pr-[30px] w-[40%] mr-[35px]"
                style={
                  type === tabButton
                    ? {
                        color: "#ffff",
                        backgroundColor: "#3681f8",
                      }
                    : {
                        borderColor: "#5562f7",
                        color: "#5562f7",
                      }
                }
                onClick={handleBook}
              >
                {tabButton}
              </button>
            ))}
          </div>
        </div>
        <div className="w-[46%]">
          <img src={imgDoctor} style={{ marginLeft: "96px" }} alt="" />
        </div>
      </div>
      <div className="bg-[#e2edff] pb-[80px] pt-[40px]">
        <div className="max-w-[1156px] mx-auto">
          <HomeDoctorLookupSevirce></HomeDoctorLookupSevirce>
        </div>
      </div>
      <div className="max-w-[1156px] mx-auto pt-[70px]">
        {/* <FeaturedComment></FeaturedComment> */}
        <div>
          <h1 className="pb-[50px] font-bold" style={{ fontSize: "40px" }}>
            Hot announcements
          </h1>
          <FeaturedSeliderSevirce />
        </div>
        <div>
          <h1 className="pb-[50px] font-bold" style={{ fontSize: "40px" }}>
            Information Catalogue
          </h1>
          <InformationCatalogueService />
        </div>
        <div>
          <h1
            className="font-bold pb-[30px]"
            style={{ fontSize: "40px", marginTop: "100px" }}
          >
            Latest News
          </h1>
          <LatestNewService />
        </div>
      </div>
    </div>
  );
};

export default HomeContentService;

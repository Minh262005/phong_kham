import React, { useState } from "react";
import Slider from "react-slick";
import { TbSpeakerphone } from "react-icons/tb";

const AsNavFor = (props) => {
  const [nav1, setNav1] = useState();
  const ListHotNews = [
    {
      id: 1,
      news: "Clinicmate Hospital Introduces New Telemedicine Services for Enhanced Patient Care",
    },
    {
      id: 2,
      news: "Clinicmate Hospital Achieves Accreditation for Exceptional Healthcare Standards",
    },
    {
      id: 3,
      news: "Clinicmate Hospital Launches Innovative Research Initiative to Advance Medical",
    },
    {
      id: 4,
      news: "Clinicmate Hospital Expands Specialized Departments to Meet Growing Patient Needs",
    },
    {
      id: 5,
      news: "Clinicmate Hospital Collaborates with Local Community to Provide Free Health Screenings",
    },
  ];

  return (
    <div className="pb-[150px]">
      <Slider
        asNavFor={nav1}
        ref={(c) => setNav1(c)}
        slidesToShow={2}
        swipeToSlide={true}
        focusOnSelect={true}
        arrows={false}
      >
        {ListHotNews.map((ListHotNew) => (
          <div key={ListHotNew} className="pl-[30px] mt-[20px] relative">
            <div
              className="flex p-[12px] rounded-2xl absolute"
              style={{
                backgroundColor: "#457bf6",
                zIndex: "1",
                top: "-20px",
                left: "60px",
              }}
            >
              <span
                style={{
                  color: "white",
                  fontSize: "35px",
                  paddingRight: "10px",
                }}
              >
                <TbSpeakerphone />
              </span>
              <h2 style={{ fontWeight: "500", color: "white" }}>
                NEW SERVICES
              </h2>
            </div>
            <div className=" bg-sky-100 pb-[70px] rounded-[30px] pl-[10px] pr-[80px] bg-[aliceblue]">
              <h3
                key={ListHotNew.id}
                className="pl-[50px] pt-[60px]"
                style={{ color: "#4e6cf7", fontWeight: "600" }}
              >
                {ListHotNew.news}
              </h3>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default AsNavFor;

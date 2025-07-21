import vietnam from "../../../ImageService/VietNam.png";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";
import React, { useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

const listCmt = [
  {
    id: 1,
    comment:
      "As the first member to enter into operation and mark the presence of the Clinicmate Healthcare brand, Clinicmate plays a uniquely important role in the system's development. Each...",
    photo:
      "https://retailinsider.b-cdn.net/wp-content/uploads/2020/08/the-health-clinic-shoppers-exterior.jpg",
    fullname:
      "Clinicmate's Birthday: Breakthroughs with Special Professional Milestones",
    title: "read more",
  },
  {
    id: 2,
    comment:
      "Clinicmate collaborates with the International Liver Cancer Epidemiology Consortium (ILCEC) and the Asian Coordinating Council for Epidemiology (ACC) to organize the annual conference...",
    photo:
      "https://sahyadrihospital.com/wp-content/uploads/2021/05/speciality-clinic.jpg",
    fullname:
      "Clinicmate shares numerous scientific studies at the ACC & ILCEC Conference",
    title: "read more",
  },
  {
    id: 3,
    comment:
      "Each year, over 9.6 million people die from cancer worldwide, surpassing the number of deaths from HIV/AIDS, malaria, and tuberculosis combined. It is estimated that by 2030, the number of deaths from cancer...",
    photo:
      "https://img.freepik.com/free-photo/pediatrician-doctor-nurse-sitting-desk-medical-office-talking-with-child-healthcare-practitioner-specialist-medicine-providing-professional-radiographic-treatment-hospital-clinic_482257-6769.jpg",
    fullname:
      "World Cancer Day on February 4th: Clinicmate commits to providing differentiated and effective care for cancer patients in Vietnam",
    title: "read more",
  },
];

const listnew = [
  {
    id: 1,
    name: "Neurology",
  },
  {
    id: 2,
    name: "Paediatric",
  },
  {
    id: 3,
    name: "Dental Care",
  },
  {
    id: 4,
    name: "X-ray",
  },
  {
    id: 5,
    name: "Laboratory",
  },
  {
    id: 6,
    name: "Eye Care",
  },
];

function NewsPageContent() {
  const [showDiv, setShowDiv] = useState(false);

  const handleClick = () => {
    setShowDiv(!showDiv);
  };
  return (
    <div className="min-h-[1000px] w-[100%] flex justify-center">
      <div className=" flex w-[80%] bg-white">
        <div className="w-[20%] min-h-[100px] ">
          <div className="flex w-[100%] items-center justify-center ">
            <h1 className="text-[20px] font-bold w-[80%] text-gradientLeft cursor-pointer">
              Health News
            </h1>
            <button
              type="button"
              className="mt-2  w-[20%] rounded"
              onClick={handleClick}
              style={{ color: "#3A8EF6", fontSize: "50px" }}
            >
              {showDiv ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
            </button>
            <button onClick={handleClick}></button>
          </div>

          {showDiv && (
            <div>
              {listnew.map((news) => (
                <div key={news.id}>
                  <h2 className="text-[18px] font-bold pb-[8px] cursor-pointer">
                    {news.name}
                  </h2>
                </div>
              ))}
            </div>
          )}
          <div className="w-[100%] pb-[20px] pt-[20px]">
            <h1 className="text-[18px] font-bold  text-gradientLeft cursor-pointer">
              Hot Announcement
            </h1>
          </div>
          <div className="w-[100%]">
            <h1 className="text-[20px] font-bold w-[100%] text-gradientLeft cursor-pointer">
              Testimonials
            </h1>
          </div>
        </div>
        <div className="w-[80%] min-h-[100px">
          <div className="w-[100%] min-h-[300px">
            <div>
              <div className="w-[100%] h-[40px] font-semibold">
                <h1 className="text-[22px]">Health news</h1>
              </div>
              <div className="flex">
                <div className="w-[50%] min-h-[300px]">
                  <img src="https://thumbs.dreamstime.com/b/doctor-explain-to-patient-medical-clinic-hospital-healthcare-wellness-living-163682454.jpg" />
                </div>
                <div className="w-[40%] min-h-[260px] flex justify-center">
                  <div className="w-[80%] min-h-[30px]">
                    <div>
                      <h1 className="text-[20px] font-semibold">
                        Important notes before a general health check
                      </h1>
                    </div>
                    <div>
                      <p>
                        Lorem ipsum dolor sit amet consectetur. Maecenas iaculis
                        dignissim bibendum sit cras non sagittis enim. Sapien at
                        nunc fusce viverra dolor elementum sem quam. Quisque
                        morbi mi congue facilisis.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                <hr className=" text-[#dddddd] mt-[20px] w-[95%] h-5" />
              </div>
            </div>
            <div className="pt-[10px]">
              {listCmt.length > 0 &&
                listCmt?.map((item) => {
                  return (
                    <div className=" bg-white  gap-8 " key={item.id}>
                      <div className=" flex gap-4">
                        <div className="w-[30%] h-[200px] rounded-[20px] overflow-hidden">
                          <img src={item.photo} alt="" />
                        </div>
                        <div className="w-[90%]">
                          <div className="flex flex-col gap-1 w-[80%] ml-[10px]">
                            <span className="font-semibold text-black2 text-[18px]">
                              {item.fullname}
                            </span>
                            <span className="font-light italic text-[18px] text-black2">
                              {item.comment}
                            </span>
                          </div>
                        </div>
                      </div>
                      <hr className="m-[2%] text-[#dddddd] w-[90%] " />
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="pb-[20px]" style={{ textAlign: "center" }}>
            <button className="button text-[30px] w-10 h-10 bg-gradientLeft mr-[30px]">
              <MdKeyboardArrowLeft className="ml-[2px]" />
            </button>
            <button className="button text-[30px] w-10 h-10 bg-gradientLeft">
              <MdKeyboardArrowRight className="ml-[3px]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default NewsPageContent;

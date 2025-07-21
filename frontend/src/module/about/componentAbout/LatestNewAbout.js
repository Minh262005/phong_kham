import imgAbout3 from "../../../Images/Rectangle 1127.png"
import imgAbout4 from "../../../Images/Rectangle 1128.png"
import imgAbout5 from "../../../Images/Rectangle 1129.png"

import React from "react";
const listCmt = [
  {
    id: 1,
    comment:
      "As the first member to enter into operation and mark the presence of the Clinicmate Healthcare brand, Clinicmate plays a uniquely important role in the system's development. Each...",
    photo:
      imgAbout3,
    fullname:
      "Clinicmate's Birthday: Breakthroughs with Special Professional Milestones",
    title: "read more",
  },
  {
    id: 2,
    comment:
      "Clinicmate collaborates with the International Liver Cancer Epidemiology Consortium (ILCEC) and the Asian Coordinating Council for Epidemiology (ACC) to organize the annual conference...",
    photo:
      imgAbout4,
    fullname:
      "Clinicmate shares numerous scientific studies at the ACC & ILCEC Conference",
    title: "read more",
  },
  {
    id: 3,
    comment:
      "Each year, over 9.6 million people die from cancer worldwide, surpassing the number of deaths from HIV/AIDS, malaria, and tuberculosis combined. It is estimated that by 2030, the number of deaths from cancer...",
    photo:
      imgAbout5,
    fullname:
      "World Cancer Day on February 4th: Clinicmate commits to providing differentiated and effective care for cancer patients in Vietnam",
    title: "read more",
  },
];
const LatestNewService = () => {
  return (
    <div>
      {listCmt.length > 0 &&
        listCmt?.map((item) => {
          return (
            <div className="pb-[50px] bg-white  gap-8 " key={item.id}>
              <div className=" flex items-center gap-4">
                <div className="w-[35%] h-[200px] rounded-[20px] overflow-hidden">
                  <img src={item.photo} alt="" />
                </div>
                <div className="flex flex-col gap-1 w-[90%] pl-[96px] mt-[10px]">
                  <span className="font-bold text-black2 text-[20px]">
                    {item.fullname}
                  </span>
                  <span className="font-light italic text-[20px] text-black2 py-[5px]">
                    {item.comment}
                  </span>
                  <div className="flex items-center gap-[2px] cursor-pointer">
                    <span className="font-light text-gradientLeft text-[20px] pt-5 ">
                      {item.title}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default LatestNewService;

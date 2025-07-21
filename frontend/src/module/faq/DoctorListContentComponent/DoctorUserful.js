import React from "react";
import { BsFillPeopleFill } from "react-icons/bs";
import { MdKeyboardArrowRight } from "react-icons/md";

const Listdata = [
  {
    id: 1,
    title:
      "Regular exercise reduces the risk of chronic diseases and improves mental well-being.",
    img: "https://draxe.com/wp-content/uploads/2016/08/shutterstock_1758007151-1.jpg",
  },
  {
    id: 2,
    title:
      "A balanced diet rich in fruits, vegetables, and lean proteins supports overall health.",
    img: "https://www.simplehealthnh.com/wp-content/uploads/2021/03/balancing-web.jpg",
  },
  {
    id: 3,
    title:
      "Prioritizing mental health through stress management and self-care is essential.",
    img: "https://cdn.sketchbubble.com/pub/media/catalog/product/optimized1/6/1/616d9f89b27217be977cb70038a68bb6d7121e8d6d28ce03ad283e4d946f72b8/mental-health-for-teachers-mc-slide1_5.png",
  },
  {
    id: 4,
    title:
      "Adequate sleep boosts immune function and promotes optimal cognitive performance.",
    img: "https://journals.physiology.org/cms/10.1152/physrev.00010.2018/asset/images/medium/z9j002192902r001.png",
  },
];

function DoctorUserful() {
  return (
    <div className="w-[100%] h-[300px] rounded-3xl bg-white shadow-xl">
      <div className="w-[100%] rounded-3xl h-[35px]">
        <h1 className="p-3 ml-1 font-bold text-3xl">Useful Information</h1>
      </div>
      <hr className="w-[90%] ml-5 text-[#d4d4d4]" />
      <div>
        {Listdata.map((data) => (
          <div
            className="flex justify-around w-[100%] h-[28px] ml-2 mb-[30px]"
            key={data.id}
          >
            <div className=" w-[25%]">
              <img
                className="p-[7px] w-[100%] h-[60px]"
                src={data.img}
                alt=""
              />
            </div>
            <div className=" w-[75%]">
              <div className="h-[45px] mt-[7px]">
                <p className="text-[10px] pr-[10%]">{data.title}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="w-[100%] flex pt-2 cursor-pointer">
        <span className="w-[70%] font-normal text-xl">
          <h5 className="ml-[30%] mt-1 text-gradientLeft">
            View all Information
          </h5>
        </span>
        <span className="text-[35px] text-gradientLeft w-[30%]">
          <MdKeyboardArrowRight />
        </span>
      </div>
    </div>
  );
}
export default DoctorUserful;

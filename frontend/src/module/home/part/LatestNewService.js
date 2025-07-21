import React, { useEffect, useState } from "react";
import axios from "axios";
import { publicPort } from "../../../components/url/link";
import { BiLike } from "react-icons/bi";
import { GrLike } from "react-icons/gr";
const listCmt = [
  {
    id: 1,
    comment:
      "Lorem ipsum dolor sit amet consectetur. Sed sagittis amet mauris eleifend proin nulla felis. Pellentesque tristique volutpat sit non purus tincidunt tur dolor consectetur. Quis egestas maecenas morbi pharetra...",
    photo:
      "https://demoda.vn/wp-content/uploads/2022/03/anh-anime-co-don-1.jpg",
    avatar:
      "https://demoda.vn/wp-content/uploads/2022/03/anh-anime-co-don-1.jpg",
    fullname: "3D Technology in medicine center - FPT University",
    title: "P.W",
  },
  {
    id: 2,
    comment:
      "Lorem ipsum dolor sit amet consectetur. Sed sagittis amet mauris eleifend proin nulla felis. Pellentesque tristique volutpat sit non purus tincidunt tur dolor consectetur. Quis egestas maecenas morbi pharetra...",
    photo:
      "https://demoda.vn/wp-content/uploads/2022/03/anh-anime-co-don-1.jpg",
    avatar:
      "https://demoda.vn/wp-content/uploads/2022/03/anh-anime-co-don-1.jpg",
    fullname: "How to reduce feelings of stress",
    title: "vn_ninja",
  },
  {
    id: 3,
    comment:
      "Lorem ipsum dolor sit amet consectetur. Sed sagittis amet mauris eleifend proin nulla felis. Pellentesque tristique volutpat sit non purus tincidunt tur dolor consectetur. Quis egestas maecenas morbi pharetra...",
    photo:
      "https://demoda.vn/wp-content/uploads/2022/03/anh-anime-co-don-1.jpg",
    avatar:
      "https://demoda.vn/wp-content/uploads/2022/03/anh-anime-co-don-1.jpg",
    fullname: "How to relieve stomach pain without medicine",
    title: "P.W",
  },
];
const LatestNewService = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const news = async () => {
      try {
        const response = await axios.get(publicPort + "news/random");
        setNews(response.data);
        // console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    news();
  }, []);

  return (
    <div>
      {news.length > 0 &&
        news?.map((item) => {
          return (
            <div className="pb-[50px] bg-white  gap-8 " key={item.id}>
              <div className=" flex items-center gap-4">
                <div className="w-[35%] h-[200px] rounded-[20px] overflow-hidden">
                  <img src={item.image} alt="imageTitle" />
                </div>
                <div className="flex flex-col gap-1 w-[90%] pl-[96px] mt-[10px]">
                  <span className="font-bold text-black2 text-[20px]">
                    {item.content}
                  </span>
                  <span className="font-light italic text-[20px] text-black2 py-[5px]">
                    {item.description}
                  </span>
                  <div className="flex items-center gap-[2px]">
                    <div className="">
                      <GrLike></GrLike>
                    </div>
                    <span className="font-medium text-black2 text-[20px] ml-[10px]">
                      {item.like}
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

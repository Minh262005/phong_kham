import React from "react";
import Slider from "react-slick";
import sliderimg from "../../../Images/Group 9547.png";
import sliderimg1 from "../../../Images/Group8.png";
import sliderimg2 from "../../../Images/Group2.png";
import {
  ArrowNextSlider,
  ArrowPrevSlider,
} from "../../../components/ArrowSlider/ArrowSlider";
const arrSlider = [
  {
    url: sliderimg,
  },
  {
    url: sliderimg1,
  },
  {
    url: sliderimg2,
  },
];
const HomeSlider = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    centerMode: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    adaptiveHeight: true,
    initialSlide: 0,
    autoplaySpeed: 4000,
    nextArrow: <ArrowNextSlider />,
    prevArrow: <ArrowPrevSlider />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
    ],
  };
  return (
    <div className="home-slider">
      <Slider {...settings}>
        {arrSlider.length > 0 &&
          arrSlider.map((item, index) => {
            return (
              <div key={index} className="w-full">
                <img className="object-cover" src={item.url} alt="" />
              </div>
            );
          })}
      </Slider>
    </div>
  );
};

export default HomeSlider;

import React from "react";
import "../HomeSlider/HomeSlider.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import jordan1 from "../../Img/jordan1.jpg"
import jordan2 from "../../Img/jordan2.jpg"
import airmax from "../../Img/airmax1.jpg"

export const HomeSlider = () => {
  return (
    <div className="container-sm caraouselHeader">
    <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide><img src={jordan1} alt="jordan1"/></SwiperSlide>
        <SwiperSlide><img src={jordan2} alt="jordan1"/></SwiperSlide>
        <SwiperSlide><img src={airmax} alt="jordan1"/></SwiperSlide>

      </Swiper>
    </div>
  );
};

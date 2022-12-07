import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";


// import required modules
import { FreeMode, Pagination } from "swiper";

export default function App() {
  return (
    <>
      <Swiper
        slidesPerView={4}
        spaceBetween={0}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination]}
        className="mySwiper flex justify-center"
      >
        <SwiperSlide className="flex flex-col items-center ">
            <img className="rounded-xl w-full h-80 object-cover object-top w-72" src="https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="usuario" />
            <p className="font-semibold text-[#222] my-4">Oscar Perez</p>
        </SwiperSlide>
        <SwiperSlide className="flex flex-col items-center ">
            <img className="rounded-xl w-full h-80 object-cover object-top w-72" src="https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="usuario" />
            <p className="font-semibold text-[#222] my-4">Oscar Perez</p>
        </SwiperSlide>
        <SwiperSlide className="flex flex-col items-center ">
            <img className="rounded-xl w-full h-80 object-cover object-top w-72" src="https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="usuario" />
            <p className="font-semibold text-[#222] my-4">Oscar Perez</p>
        </SwiperSlide>
        <SwiperSlide className="flex flex-col items-center ">
            <img className="rounded-xl w-full h-80 object-cover object-top w-72" src="https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="usuario" />
            <p className="font-semibold text-[#222] my-4">Oscar Perez</p>
        </SwiperSlide>
        <SwiperSlide className="flex flex-col items-center ">
            <img className="rounded-xl w-full h-80 object-cover object-top w-72" src="https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="usuario" />
            <p className="font-semibold text-[#222] my-4">Oscar Perez</p>
        </SwiperSlide>
        <SwiperSlide className="flex flex-col items-center ">
            <img className="rounded-xl w-full h-80 object-cover object-top w-72" src="https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="usuario" />
            <p className="font-semibold text-[#222] my-4">Oscar Perez</p>
        </SwiperSlide>

      </Swiper>
    </>
  );
}

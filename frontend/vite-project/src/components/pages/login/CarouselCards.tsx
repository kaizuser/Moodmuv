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
  let array = [1,2,3,4,5,6]
  return (
    <div className="w-full min-h-28 p-4">
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination]}
        className="mySwiper"
      >
        {
array.map(item=>{
  return(
    <SwiperSlide style={{padding:".7rem",width:"20rem",  height:"20rem"}} className="flex flex-col justify-start items-start rounded-3xl bg-[#fefefe] shadow m-4" key={item}>
    <img className="h-52 shadow w-full object-cover rounded-3xl" src="https://images.unsplash.com/photo-1603525311500-eb9c62e3173f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=800" alt="img" />
    <div className="p-2 flex justify-between items-center w-full">
    <p className=" uppercase font-bold text-[#999] text-sm py-[.1rem]  px-1">Acroyoga</p>
    <p className="text-xs font-bold bg-gradient-to-r from-[#563D81] to-[#6E5E8B] px-1 py-[.1rem] text-white rounded">Price</p>
    </div>
    <p className="px-2 font-bold text-[#222]">Como hacer tu propia vertical en 5 dias</p>
  </SwiperSlide>
  )
})          
        }
      </Swiper>
    </div>
  );
}

import React, { useRef, useState, useEffect } from "react";
import axios from 'axios'
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import CarouselCardsDetail from "./CarouselCardsDetail";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
// import required modules
import { FreeMode, Pagination } from "swiper";

const CarouselContainer = ({activity}:any) => {    
  return (
    <div className="w-full min-h-28 p-4 ">
      <Swiper
        slidesPerView={2.5}
        spaceBetween={15}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination]}
        className="mySwiper"
      >
        { 
activity?.map((activity:any)=>{
  return(
    <SwiperSlide  style={{padding:".7rem",width:"20rem",  minHeight:"20rem"}} className="flex flex-col justify-start items-start rounded-3xl bg-[#fefefe] shadow m-4" key={activity._id} >
      <CarouselCardsDetail activity={activity} />
  </SwiperSlide>
  )})          
}
      </Swiper>
    </div>
  );
}
export default CarouselContainer

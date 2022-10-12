import React, { useState } from "react";
import { TbArrowNarrowLeft } from "react-icons/tb/";
import { TbArrowNarrowRight } from "react-icons/tb";
/* Aca van los talleres  */
const GridTalleres = () => {
  const [taller, setTaller] = useState({})
  return (
    <div className="taller-container relative flex w-full h-full">
      <div className="first-child flex flex-col items-start text-start justify-center px-8 gap-4 w-1/2">
        <p className="uppercase text-neutral-500 text-xs font-black">The grand moment</p>
        <h3 className="font-serif font-bold text-6xl text-[#222]">Le tour</h3>
        <p className="text-gray-500">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.</p>
        <button className="text-[#222] uppercase w-auto font-black text-xs border border-[#f8f8f9] hover:border-[#222]">Explore the tour</button>
      </div>
      <div className="second-child">
        <img className="object-cover h-full" src="https://images.pexels.com/photos/991012/pexels-photo-991012.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="taller" />
        <div className="flex items-center justify-center w-16 h-8 bg-white absolute bottom-0 right-0">
          <TbArrowNarrowLeft/>
          <hr className="rotate-90 w-4"/>
          <TbArrowNarrowRight/>
        </div>
      </div>
    </div>
  );
};

export default GridTalleres;

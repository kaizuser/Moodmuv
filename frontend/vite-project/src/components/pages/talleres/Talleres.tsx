import React, { useState } from "react";
import { TbArrowNarrowLeft } from "react-icons/tb/";
import { TbArrowNarrowRight } from "react-icons/tb";

//UTILITIES
import {Slide, Fade} from 'react-awesome-reveal'
/* Aca van los talleres  */
const GridTalleres = () => {
  const [taller, setTaller] = useState({})
  return (
    <div className="taller-container relative flex w-full h-full">
	
      <div className="first-child flex flex-col items-start text-start justify-center px-8 gap-4 w-1/2">

    <Slide triggerOnce>
        <p className="uppercase text-[#999] text-xs font-black">The grand moment</p>
        <h3 className="font-bold text-6xl text-transparent bg-clip-text bg-gradient-to-r from-[#563D81] to-[#6E5E8B] py-2">Acroyoga</h3>
        <p className="text-[#999] text-sm">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.</p>
        <button className="shadow-sm rounded text-[#767676] uppercase w-fit font-black text-xs border border-[#d1d1d1] p-4">Explorar taller</button>

    </Slide>
      </div>

      <div className="second-child relative">
        <img className="object-cover h-full rounded-xl" src="https://images.pexels.com/photos/991012/pexels-photo-991012.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="taller" />

	      <Slide triggerOnce direction='right'>
        <div className="flex items-center justify-center w-16 h-8 bg-white absolute bottom-0 left-1/2 mb-2 rounded-xl">
          <TbArrowNarrowLeft/>
          <hr className="rotate-90 w-4"/>
          <TbArrowNarrowRight/>
        </div>
	      </Slide>

      </div>
    </div>
  );
};

export default GridTalleres;

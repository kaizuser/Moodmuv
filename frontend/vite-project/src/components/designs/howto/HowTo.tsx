import React from "react";
import HowToImage from "../../../assets/vectores/Recurso 1.png";
import Section from './Section'
import Faq from './Faq'
import Vector from '../../../assets/Vector.png'
//CSS
import '../../../styles/mediaqueriesHowTo.css'

const HowTo = () => {

  return (
    
    <div className="min-h-screen w-full break-all flex flex-col items-center gap-28">
      <div className="flex w-full h-full justify-center items-center flex-wrap">
        <div className="flex flex-col gap-4 h-full w-1/3 justify-center section-1">
          <h2 className="outline-4 flex flex-col font-bold text-4xl tracking-widest text-transparent bg-clip-text bg-gradient-to-t from-[#dd941e] to-[#e6b243]">
            Como usar{" "}
            <span className="flex flex-col font-bold text-6xl text-transparent bg-clip-text bg-gradient-to-t from-[#563D81] to-[#6E5E8B] tracking-tighter">
              MOODMUV?
            </span>
          </h2>
          <p className="text-gray-500 ">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laboriosam
            qui totam doloribus. Esse unde, id error magni magnam totam eaque!
          </p>
        </div>
        <img
          className="h-76 object-contain"
          src={HowToImage}
          alt="howToImage"
        />
      </div>
      <Section/>
      <h2 className="text-howto text-[#323232] px-6 relative z-20 text-6xl w-80 font-bold flex flex-col break-normal">Preguntas <span className="text-4xl font-light text-[#323232]">Frecuentes</span></h2>
      <div className="w-[90%] h-full pb-28 ">
        <Faq/>
      </div>
    </div>
  );
};

export default HowTo;

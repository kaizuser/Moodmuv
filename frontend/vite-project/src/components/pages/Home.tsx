import React from "react";
import BotonPrimario from "../generales/BotonPrimario";
import BotonSecundario from "../generales/BotonSecundario";
import imagenInicio from "../../assets/home-img.png";
import Why from '../Why'

const Home = () => {
  return (
    <>
    <div className="min-h-screen flex justify-center sm:flex-wrap md:flex-nowrap md:items-start ">
      {/* 100vh */}
      <div className="gap-8  ml-4 md:ml-12 flex flex-col gap-4 items-start lg:justify-center justify-start translate-y-40">
        <h1 className="text-6xl sm:w-[25rem] lg:w-[42rem] font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#563D81] to-[#6E5E8B]">
          El lugar para impulsar tu creatividad interior
        </h1>
        <div className="buttons flex gap-4 ">
          <BotonSecundario text="Clases disponibles" />
          <BotonPrimario text="Ver planes" />
        </div>
      </div>
      <div className="w-fit translate-y-40 md:translate-y-52 sm:block md:block xsm">
        <img
          className="object-contain relative lg:w-[40rem] sm:w-96 md:right-16 md:w-[32rem] lg:translate-y-20"
          src={imagenInicio}
          alt="imagen de inicio"
        />
      </div>
      {/* 200vh */}
    </div>
      <Why/>
    </>
  );
};

export default Home;

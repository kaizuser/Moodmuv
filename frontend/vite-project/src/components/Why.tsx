import React from "react";
import bkgPresencial from "../assets/imagePresencial.jpg";
import bkgOnline from "../assets/backgroundOnline.png";
const Why = () => {
  return (
    <div className="flex flex-col w-full items-center min-h-screen">
      <h2 className="p-4 text-center text-5xl sm:w-[25rem] lg:w-[32rem] font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#563D81] to-[#6E5E8B]">
        ¿Porque Moodmuv?
      </h2>
      <p className="text-[#666] text-sm text-center">
        Porque nuestro compromiso con los usuarios son constantes
      </p>
      <h6 className="p-4 font-semibold text-md text-transparent bg-clip-text bg-gradient-to-r from-[#563D81] to-[#6E5E8B]">
        Modalidades
      </h6>
      <div className="flex justify-center gap-16 items-baseline flex-wrap mx-4">
        {/* Profe */}
        <div className="flex flex-col justify-center items-center">
          <h3 className="text-center font-semibold text-4xl text-transparent bg-clip-text bg-gradient-to-r from-[#563D81] to-[#6E5E8B]">
            Profesor
          </h3>
          <p className="py-4 w-[16rem] text-center text-sm text-[#666]">
            Contamos con un seleccionado de profesores listos para poder
            instruirte. Tenemos clases de yoga, danza, partner, acrobatic
          </p>
          <div className='w-[28rem] h-[16rem] bg-black rounded-2xl relative bg-[url("https://user-images.githubusercontent.com/91817152/192928635-0462d44e-a9fc-4566-a446-0b53d374b3c1.jpg")] bg-cover bg-[center_-9rem]'>
            <p className="pointer-events-none bg-white py-1 bg-gradient-to-r from-[#F79AD3] to-[#C86FC9] px-4 font-bold text-sm text-white absolute z-10 rounded-2xl m-4">
              Profesor
            </p>
          </div>
        </div>
        {/* Alumno */}
        <div className="flex flex-col justify-center items-center">
          <h3 className="text-center font-semibold text-4xl text-transparent bg-clip-text bg-gradient-to-r from-[#563D81] to-[#6E5E8B]">
            Alumno
          </h3>
          <p className="py-4 w-[16rem] text-center text-sm text-[#666]">
            Disfruta de las mejores clases online o presencial, contamos con
            multiples actividades para desenvolverte.
          </p>
          <div className='w-[28rem] h-[16rem] bg-black rounded-2xl relative bg-[url("https://user-images.githubusercontent.com/91817152/192928760-1f880cc5-6d0f-404f-9fc8-cd79b90a9085.jpg")] bg-cover'>
            <p className="pointer-events-none bg-white py-1 bg-gradient-to-r from-[#83EAD1] to-[#63A4FF] px-4 font-bold text-sm text-white absolute z-10 rounded-2xl m-4">
              Alumno
            </p>
          </div>
        </div>
      </div>
      <h2 className="p-8 font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#563D81] to-[#6E5E8B] text-5xl">
        Talleres
      </h2>
      <div className='flex justify-between p-4 flex w-[42rem] h-[20rem] rounded-2xl  bg-[url("https://user-images.githubusercontent.com/65744660/192929398-c64c48a9-fa66-4282-9022-95d5f99abd18.jpg")] bg-top bg-cover mb-8'>
        <h3 className="leading-tight pointer-events-none text-white font-black text-6xl w-1/2 uppercase">
          Sé tu mismo sin excusas
        </h3>
        <button className="font-black uppercase text-[#222] bg-white self-end py-5 px-8 rounded-[4rem]">
          Play Now
        </button>
      </div>
      <div className="flex flex-col justify-center items-center text-center">
        <div className="flex flex-col items-center justify-center">
          <h2 className="p-8 font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#563D81] to-[#6E5E8B] text-5xl">
            No damos solo clases presencial
          </h2>
          <p className="py-2 w-2/4  text-center text-sm self-center text-[#666]">
            También brindamos clases en linea. Nos preparamos para poder
            ofrecerte la mejor experiencia de tus clases desde la comodidad de
            tu casa
          </p>
        </div>
        <img className="w-2/4 self-end" src={bkgOnline} alt="background online" />
      </div>
    </div>
  );
};

export default Why;

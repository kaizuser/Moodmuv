import React from "react";
import bkgPresencial from "../../assets/imagePresencial.jpg";
import bkgOnline from "../../assets/backgroundOnline.png";

import { Slide } from "react-awesome-reveal";
const Why = () => {
  return (
    <div className="flex flex-col w-full items-center min-h-screen bg-[#f3f3f3]">
      <h2 className="p-4 text-center text-5xl sm:w-[25rem] lg:w-[32rem] font-bold text-transparent bg-clip-text bg-gradient-to-t from-[#563D81] to-[#6E5E8B]">
        ¿Por qué Moodmuv?
      </h2>
      <p className="p-why self-center text-[#666] text-sm text-center">
        Porque nuestro compromiso con los usuarios son constantes
      </p>
      <h6 className="p-4 font-semibold text-md text-transparent bg-clip-text bg-gradient-to-t from-[#563D81] to-[#6E5E8B]">
        Modalidades
      </h6>
      <div className="flex justify-center gap-16 items-baseline flex-wrap mx-4">
        {/* Profe */}
<Slide triggerOnce>
        <div className="flex flex-col justify-center items-center">
          <h3 className="text-center font-semibold text-4xl text-transparent bg-clip-text bg-gradient-to-t from-[#563D81] to-[#6E5E8B]">
            Profesor/a/Escuela
          </h3>
          <p className="p-why2 py-4 my-4 w-[20rem] text-center text-sm text-[#666]">
            Contamos con un seleccionado de profesores listos para poder
            instruirte. Tenemos clases de yoga, danza, partner, acrobatic
          </p>
          <div className='div-background_why w-[28rem] h-[20rem] bg-black rounded-2xl relative bg-[url("https://user-images.githubusercontent.com/91817152/192928635-0462d44e-a9fc-4566-a446-0b53d374b3c1.jpg")] bg-cover bg-[center_-9rem]'>
            <p className="pointer-events-none bg-white py-1 bg-gradient-to-t from-[#F79AD3] to-[#C86FC9] px-4 font-bold text-sm text-white absolute z-10 rounded-2xl m-4">
              Profesor/a
            </p>
          </div>
        </div>
</Slide>
        {/* Alumno */}
<Slide triggerOnce>
        <div className="flex flex-col justify-center items-center">
          <h3 className="text-center font-semibold text-4xl text-transparent bg-clip-text bg-gradient-to-t from-[#563D81] to-[#6E5E8B]">
            Alumno/a
          </h3>
          <p className="p-why2 my-4 py-4 w-[20rem] text-center text-sm text-[#666]">
            Disfruta de las mejores clases online o presencial, contamos con
            multiples actividades para desenvolverte.
          </p>
          <div className='div-background_why w-[28rem] h-[20rem] bg-black rounded-2xl relative bg-[url("https://user-images.githubusercontent.com/91817152/192928760-1f880cc5-6d0f-404f-9fc8-cd79b90a9085.jpg")] bg-cover'>
            <p className="pointer-events-none bg-white py-1 bg-gradient-to-t from-[#83EAD1] to-[#63A4FF] px-4 font-bold text-sm text-white absolute z-10 rounded-2xl m-4">
              Alumno/a
            </p>
          </div>
        </div>
</Slide>
        {/* Terapia */}
<Slide triggerOnce>
        <div className="flex flex-col justify-center items-center">
          <h3 className="text-center font-semibold text-4xl text-transparent bg-clip-text bg-gradient-to-t from-[#563D81] to-[#6E5E8B]">
            Terapia
          </h3>
          <p className="p-why2 my-4 py-4 w-[20rem] text-center text-sm text-[#666]">
          También nos enfocamos en tu salud mental.
                    </p>
          <div className='div-background_why w-[28rem] h-[20rem] bg-black rounded-2xl relative bg-[url("https://user-images.githubusercontent.com/91817152/194885486-324a2abe-192d-4e9c-a197-5d847f320579.jpg")] bg-cover'>
            <p className="pointer-events-none bg-white py-1 bg-gradient-to-t from-[#ffdd00] to-[#fbb034] px-4 font-bold text-sm text-white absolute z-10 rounded-2xl m-4">
              Terapia
            </p>
          </div>
        </div>
</Slide>
      </div>
      <div className="flex flex-col justify-center items-center text-center">
<Slide triggerOnce className="relative flex justify-end">

        <div className="flex flex-col items-center justify-center">
          <h2 className="pt-16 pb-8 font-bold text-transparent bg-clip-text bg-gradient-to-t from-[#563D81] to-[#6E5E8B] text-5xl">
            No damos solo clases presencial
          </h2>
          <p className="py-2 w-2/4  text-center text-sm self-center text-[#666]">
            También brindamos clases en linea. Nos preparamos para poder
            ofrecerte la mejor experiencia de tus clases desde la comodidad de
            tu casa
          </p>
        </div>
        <img
          className="img-cp w-2/4"
          src={bkgOnline}
          alt="Background"
        />
</Slide>
      </div>
    </div>
  );
};

export default Why;

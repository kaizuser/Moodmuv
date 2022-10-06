import BotonPrimario from "../generales/BotonPrimario";
import BotonSecundario from "../generales/BotonSecundario";
import Why from "../Why";
import sample from "../../assets/video.mp4";
import GridTalleres from './GridTalleres'
const Home = ({title}) => {
  document.title = title
  return (
    <>
      <div
        className="div-home relative min-h-screen flex flex-col
       justify-center items-center sm:flex-wrap md:flex-nowrap bg-transparent gap-8 bg-[#f8f8f9]"
      >
        {/* 100vh */}
        <video
          className="grayscale -top-24 absolute h-full object-cover w-full"
          autoPlay
          loop
          muted
        >
          <source src={sample} type="video/mp4" />
        </video>
        <h1 className="text-main z-10 text-6xl sm:w-[25rem] lg:w-[42rem] font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#563D81] to-[#6E5E8B]">
          El lugar para impulsar tu creatividad interior
        </h1>
        <div className="z-10 buttons flex gap-4 ">
          <BotonSecundario text="Clases disponibles" />
          <BotonPrimario text="Conocer Plataforma" />
        </div>

        {/* 200vh */}
      </div>
      <Why />
      <GridTalleres/>
    </>
  );
};

export default Home;

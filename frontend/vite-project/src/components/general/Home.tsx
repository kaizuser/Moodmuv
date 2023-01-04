import BotonPrimario from "../designs/Buttons/PrimaryButton";
import { Fade, Slide, } from "react-awesome-reveal";
import BotonSecundario from "../designs/Buttons/SecondaryButton";
import Why from "../designs/Why";
import sample from "../../assets/video.mp4";
import GridTalleres from '../designs/EventsHome'
//STYLES
import '../../styles/mediaqueriesTalleresSection.css'
import '../../styles/mediaqueriesHome.css'
const Home = ({title}:any) => {
  document.title = title
  return (
    <>
      <div
        className="div-home relative min-h-[86vh] flex flex-col
       justify-center items-center sm:flex-wrap md:flex-nowrap bg-transparent gap-8 bg-[#f3f3f3]"
      >
        {/* 100vh */}
        <video
          className="-bottom-0 absolute h-full object-cover w-full opacity-70"
          autoPlay
          loop
          muted
        >
          <source src={sample} type="video/mp4" />
        </video>
        <h1 className=" text-main text-6xl sm:w-[25rem] lg:w-[62rem] font-bold text-[#323232] drop-shadow-2xl">
        Una ventana de exhibición para expandir tus conocimientos.
        </h1>
        <Fade>

        <div className="z-10 buttons flex gap-2 ">
          <BotonSecundario text="Clases disponibles" />
          <BotonPrimario text="Conocer Plataforma" />
        </div>
        </Fade>
        {/* 200vh */}
      </div>
      <div className="py-16 px-12 bg-[#f3f3f3]">
       <Slide direction="down" triggerOnce>
        <h2 className="p-8 pb-14 text-center text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-t from-[#563D81] to-[#6E5E8B]">Eventos / Festivales</h2>
       </Slide>
        <GridTalleres/>
      </div>
      <Why />
    </>
  );
};

export default Home;

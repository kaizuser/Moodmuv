import React from 'react'
import CarouselTeam from './CarouselTeam'
//utils
import Bgviolet from '../../../assets/aboutus/bg-violet.png'
import rectangule from '../../../assets/aboutus/rectangule.png'
import mapa from '../../../assets/aboutus/mapa.png'
//css
import '../../../styles/mediaqueriesAboutUs.css'
const AboutContainer = () => {
  return (
    <div className='min-h-screen w-full flex flex-col items-center'>
      <h1 className='text-center text-3xl font-bold text-[#262626] my-4'>Porque <span className='text-transparent bg-clip-text bg-gradient-to-t from-[#563D81] to-[#6E5E8B]'>Moodmuv?</span></h1>
      <hr className='w-[33rem] h-[.3rem] bg-[#D0D5DD]'/>
      <div className='container relative w-[80%] h-[10rem] mt-8 p-4'>
        <img className="absolute w-full h-68" src={Bgviolet} alt="bg" />
        <p className='p text-violet relative text-center text-white  py-8 px-12 text-xl leading-8 font-thin '>Por que en esta plataforma podrás expandir tus conocimientos hacia otras comunas, regiones, ciudades, países. Es una gran oportunidad para dar a conocertus habilidades y entregar información sobre tus eventos. Es un espacio dedifusión para tu disciplina.</p>
      </div>
      <img className='relative z-10 w-[60%] h-fit my-4 bg-transparent rectangule' src={rectangule} alt="rectangule" />
      <p className='p flex flex-col text-center text-3xl font-bold text-[#262626] my-4'>Estamos aquí por tí
      <span className='text-transparent bg-clip-text bg-gradient-to-t from-[#563D81] to-[#6E5E8B]'>No importa dónde estés
      </span>
      </p>
      <hr className='w-[38rem] h-[.3rem] bg-[#D0D5DD] '/>
      <img className="my-16 w-[60%]" src={mapa} alt="mapita" />
      <div className='flex flex-col items-start'>
        <h1 className='h2 text-center text-3xl font-bold text-[#262626] my-4'>Nuestra <span className='text-transparent bg-clip-text bg-gradient-to-t from-[#563D81] to-[#6E5E8B]'>Misión</span></h1>
        <hr className='w-[33rem] h-[.3rem] bg-[#D0D5DD]'/>
      </div>
      <p className='p w-[30rem] text-[#666] my-4'>Moodmuv tiene como misión ser una gran ventana de exhibición parainstructores independientes, escuelas y centro que se relacionen con disciplinas,deportes o artes que tengan que ver con el movimiento corporal. Como tambiénes una espacio para terapeutas y profesionales de la salud.¿El cómo? ¿El cuando? ¿El donde?</p>
      <div className='flex flex-col items-start'>
        <h1 className='h2 text-center text-3xl font-bold text-[#262626] my-4'>Nuestra <span className='text-transparent bg-clip-text bg-gradient-to-t from-[#563D81] to-[#6E5E8B]'>Visión</span></h1>
        <hr className='w-[33rem] h-[.3rem] bg-[#D0D5DD]'/>
      </div>
      <p className='p w-[30rem] text-[#666] my-4'>Moodmuv, quiere ser una ventana de exhibición al mundo. Nuestra meta esllegar con tus clases, talleres, eventos, festivales a otras regiones y una de lasgrandes metas de Moomuv es expedir tus conocimientos al extranjero.</p>
      <div className='flex flex-col items-start'>
        <h1 className='h2 text-center text-3xl font-bold text-[#262626] my-4'>Nuestros <span className='text-transparent bg-clip-text bg-gradient-to-t from-[#563D81] to-[#6E5E8B]'>Objetivos</span></h1>
        <hr className='w-[33rem] h-[.3rem] bg-[#D0D5DD]'/>
      </div>
      <p className='p w-[30rem] text-[#666] my-4'>Queremos posicionarnos como unas de la plataforma pionera enintegrar disciplinas de movimiento corporal, y llegar hacer una de las plataformamas cotizadas dentro del mercado. Queremos llegar al extranjero y lograrvisualizar a las personas que están dentro de la plataforma como instructores, escuelas o centros.</p>
      {/* CAROUSEL NUESTRO EQUIPO */}
      <h1 className='h2 text-center text-3xl font-bold text-[#262626] my-4 text-transparent bg-clip-text bg-gradient-to-t from-[#563D81] to-[#6E5E8B]'>Nuestro Equipo</h1>
      <div className='w-full min-h-[50%] px-4 my-4'>

        <CarouselTeam/>
        
        <div className='flex flex-col justify-center items-center my-28'>
            <h1 className='h2 text-center text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-t from-[#563D81] to-[#6E5E8B]'>Ponte en contacto</h1>
            <p className='p text-[#666] my-4'>Nos encantaría saber de usted. Por favor, llene este formulario.</p>
            {/* FORM */}
            <div className="flex flex-wrap -m-2 md:w-[30rem] ">
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label htmlFor="name" className="leading-7 text-sm text-[#666]">
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                    htmlFor="email"
                    className="leading-7 text-sm text-[#666]"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label htmlFor="name" className="leading-7 text-sm text-[#666]">
                    Numero
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                    htmlFor="email"
                    className="leading-7 text-sm text-[#666]"
                  >
                    Título/Puesto
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-full">
                <div className="relative">
                  <label
                    htmlFor="message"
                    className="leading-7 text-sm text-[#666]"
                  >
                    Asunto
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    className="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                  ></textarea>
                </div>
              </div>
              <div className="p-2 w-full">
                <button className="w-full text-center content-center self-center justify-center items-center text-sm flex mx-auto text-white bg-gradient-to-t from-[#563D81] to-[#6E5E8B] border-0 py-4 px-8 focus:outline-none rounded font-semibold">
                Conecta con nosotros
                </button>
              </div>
            </div>
            {/* CIERRE DE FORM */}
        </div>
      </div>
    </div>
  )
}

export default AboutContainer
import React from 'react'
//utils
import Bgviolet from '../../../assets/aboutus/bg-violet.png'
import rectangule from '../../../assets/aboutus/rectangule.png'
import mapa from '../../../assets/aboutus/mapa.png'
const AboutContainer = () => {
  return (
    <div className='min-h-screen w-full flex flex-col items-center'>
      <h1 className='text-center text-3xl font-bold text-[#262626] my-4'>Porque <span className='text-transparent bg-clip-text bg-gradient-to-t from-[#563D81] to-[#6E5E8B]'>Moodmuv?</span></h1>
      <hr className='w-[33rem] h-[.3rem] bg-[#D0D5DD]'/>
      <div className='relative w-[80%] h-[10rem] mt-8 p-4'>
        <img className="absolute w-full h-68" src={Bgviolet} alt="bg" />
        <p className='relative text-white py-8 px-12 text-xl leading-8 font-thin'>Por que en esta plataforma podrás expandir tus conocimientos hacia otrascomunas, regiones, ciudades, países. Es una gran oportunidad para dar a conocertus habilidades y entregar información sobre tus eventos. Es un espacio dedifusión para tu disciplina.</p>
      </div>
      <img className='relative z-10 w-[60%] h-fit my-4 bg-transparent' src={rectangule} alt="rectangule" />
      <p className='flex flex-col text-center text-3xl font-bold text-[#262626] my-4'>Estamos aquí por tí
      <span className='text-transparent bg-clip-text bg-gradient-to-t from-[#563D81] to-[#6E5E8B]'>No importa dónde estés
      </span>
      </p>
      <hr className='w-[38rem] h-[.3rem] bg-[#D0D5DD] '/>
      <img className="my-16 w-[60%]" src={mapa} alt="mapita" />
    </div>
  )
}

export default AboutContainer
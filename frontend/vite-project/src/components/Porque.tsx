import React from 'react'
import bkgPresencial from '../assets/imagePresencial.jpg'
import bkgOnline from '../assets/imageOnline.jpg'
const Porque = () => {
  return (
    <div className="flex flex-col w-full items-center min-h-screen">
        <h2 className="p-4 text-center text-5xl sm:w-[25rem] lg:w-[32rem] font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#563D81] to-[#6E5E8B]">¿Porque Moodmuv?</h2>
        <p className="text-[#666] text-sm text-center">Porque nuestro compromiso con los usuarios son constantes</p>
        <h6 className="p-4 font-semibold text-md text-transparent bg-clip-text bg-gradient-to-r from-[#563D81] to-[#6E5E8B]">Modalidades</h6>
        <div className='flex justify-center gap-16 items-baseline'>
            <div className="flex flex-col justify-center items-center">
                <h3 className='text-center font-semibold text-4xl text-transparent bg-clip-text bg-gradient-to-r from-[#563D81] to-[#6E5E8B]'>Presencial</h3>
                <p className='py-4 w-[16rem] text-center text-sm text-[#666]'>Disfruta de las mejores clases presenciales con tu profesor favorito. Tenemos clases de yoga, danza, partner, acrobatic</p>
                <div className='w-[28rem] h-[16rem] bg-black rounded-2xl relative bg-[url("/src/assets/imagePresencial.jpg")] bg-cover bg-center'>
                    <p className="pointer-events-none bg-white py-1 bg-gradient-to-r from-[#F79AD3] to-[#C86FC9] px-4 font-bold text-sm text-white absolute z-10 rounded-2xl m-4">
                    PRESENCIAL
                    </p>
                </div>
            </div>
            <div className="flex flex-col justify-center items-center">
            <h3 className='text-center font-semibold text-4xl text-transparent bg-clip-text bg-gradient-to-r from-[#563D81] to-[#6E5E8B]'>Online</h3>
            <p className='py-4 w-[16rem] text-center text-sm text-[#666]'>Disfruta de las mejores clases online con tu profesor favorito desde cualquier parte del mundo. Tenemos clases de yoga, danza,partner acrobatic</p>
            <div className='w-[28rem] h-[16rem] bg-black rounded-2xl relative bg-[url("/src/assets/imageOnline.jpg")] bg-cover'>
                <p className="pointer-events-none bg-white py-1 bg-gradient-to-r from-[#83EAD1] to-[#63A4FF] px-4 font-bold text-sm text-white absolute z-10 rounded-2xl m-4">
                ONLINE
                </p>
            </div>
            </div>            
        </div>
        <h2 className='p-8 font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#563D81] to-[#6E5E8B] text-5xl'>Clases personalizadas</h2>
        <div className='flex justify-between p-4 flex w-[42rem] h-[20rem] rounded-2xl  bg-[url("/src/assets/setumismo.jpg")] bg-top bg-cover mb-8'>
            <h3 className='leading-tight pointer-events-none text-white font-black text-6xl w-1/2 uppercase'>Sé tu mismo sin excusas</h3>
            <button className="font-black uppercase text-[#222] bg-white self-end py-5 px-8 rounded-[4rem]">Play Now</button>
        </div>
    </div>
  )
}

export default Porque
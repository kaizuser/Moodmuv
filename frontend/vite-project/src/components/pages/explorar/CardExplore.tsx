import React, { useState } from 'react'
import { Link } from 'react-router-dom'
const CardExplore = () => {
    const [open, setOpen] = useState(false);
    function setearOpen() {
      setOpen(!open);
    }
    
  return (
    <div className="max-w-[10rem] rounded overflow-hidden shadow-lg">
    <img className="w-full h-44 object-cover" src="https://algarabia.com/wp-content/uploads/2017/05/El-texto-del-pa%CC%81rrafo-36.jpg" alt="Sunset in the mountains"/>
    <div className="px-6 py-4">
      <div className='flex w-full justify-between text-gray-700 text-base text-xs pb-2'>
        <p>BioMoove Estudio</p>
        <p>1 week ago</p>
      </div>
      <div className="font-bold text-xl mb-2">Acrobacia</div>
      <p className="text-gray-700 text-base">
        Como hacer tu propia vertical en 5 minutos
      </p>
    </div>
    <div className='flex justify-between items-center m-4'>
    <div className='flex gap-2  items-center text-xs text-[#007AE9] font-bold cursor-pointer'>
      <img className="object-cover rounded-full w-8 h-8" src="https://i.pinimg.com/originals/86/08/70/860870066df05a7a29bcb5bb9ea2e9a7.jpg" alt="imagen" />
      <Link to={'/profile'}>Camila Domato</Link>
    </div>
    <p className='text-[#007AE9] text-xs cursor-pointer'>Ver mas</p>
    </div>
  </div>
  )
}

export default CardExplore

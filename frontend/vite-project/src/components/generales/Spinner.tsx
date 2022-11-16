import React from 'react'
import Logo from '../../assets/logoDegradeCircle.png'
import LetraLogo from '../../assets/logoDegradeLetra.png'
import '../../styles/spinner.css'
const Spinner = () => {
  return (
    <div className='h-screen w-full bg-[#f8f8f9] flex flex-col justify-center items-center gap-4'>
        <img className="w-28 h-28 object-cover spinner" src={Logo}/>
        <img className="w-28" src={LetraLogo} alt="letra" />
    </div>
  )
}

export default Spinner

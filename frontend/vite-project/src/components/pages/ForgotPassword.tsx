import React from 'react'

const ForgotPassword = () => {
  return (
    <div className="h-screen md:flex ">
    <div className="flex w-full :h-full formulario justify-center py-10 items-center bg-white">
      <form className="bg-white">
        <h1 className="text-gray-800 font-semibold text-2xl mb-1">Recuperar contraseña</h1>
        <p className="text-sm font-normal text-gray-600 mb-7 sm:mb-2">Inserte email aqui</p>
      
        <div className="flex items-center border-2 py-2 px-3 rounded mb-4 bg-[#F0EFFF]">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 " fill="none"
            viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
          </svg>
          <input className="pl-2 outline-none border-none bg-[#F0EFFF] placeholder-[#A7A3FF]" type="text" name="" id="" placeholder="Email Address" />
        </div>
        <button type="submit" className="block w-full bg-indigo-600 mt-4 py-2 rounded bg-[#4D47C3] text-white font-semibold mb-2">Enviar link</button>
      </form>
    </div>
  </div>
  )
}

export default ForgotPassword

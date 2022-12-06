import React from 'react'

const BotonPrimario = (props:any):any => {
  return (
    <button className="text-white font-semibold btn bg-[#323232] px-8 py-2 rounded-[.3rem]">{props.text}</button>
  )
}

export default BotonPrimario

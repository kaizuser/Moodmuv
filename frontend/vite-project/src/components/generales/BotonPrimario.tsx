import React from 'react'

const BotonPrimario = (props:any):any => {
  return (
    <button className="text-white font-semibold btn bg-gradient-to-r from-[#563D81] to-[#6E5E8B] px-8 py-2 rounded-[.3rem] hover:bg-gradient-to-r hover:from-[#443166] hover:to-[#59457B]">{props.text}</button>
  )
}

export default BotonPrimario

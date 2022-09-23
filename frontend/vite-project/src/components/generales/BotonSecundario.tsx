import React from 'react'
import { text } from 'stream/consumers'

const BotonSecundario = (props:any):any => {
  return (
    <button className="font-semibold border border-[#D0D5DD] text-[#563D81] btn px-8 py-2 rounded-[.3rem] bg-[#f1f1f1]">{props.text}</button>
  )
}

export default BotonSecundario
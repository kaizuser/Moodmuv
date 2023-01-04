import React, { useState } from "react";
import { TbArrowNarrowLeft } from "react-icons/tb/";
import { TbArrowNarrowRight } from "react-icons/tb";

//UTILITIES
import {Slide, Fade} from 'react-awesome-reveal'
//STYLES
import '../../styles/mediaqueriesTalleresSection.css'
/* Aca van los talleres  */
const GridTalleres = () => {
  const [taller, setTaller] = useState({})
  const [num, setNum] = useState(0)
  let arraycitoTalleres = [
    {
      name: 'Acroyoga',
      descripción:'lorem ipsum dolor sit amet, consectetur adipiscing',
      img:'https://images.unsplash.com/photo-1508081685193-835a84a79091?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
    },
    {
      name: 'Animal Flow',
      descripción:'lorem ipsum dolor sit amet, consectetur adipiscing',
      img:'https://animalflow.com/wp-content/uploads/2019/09/Home-page-9-1.jpg'
    },
    {
      name: 'Handstand',
      descripción:'lorem ipsum dolor sit amet, consectetur adipiscing',
      img:'https://www.yogajournal.com/wp-content/uploads/2021/11/Handstand_Andrew-Clark.jpg'
    }
  ]

  const suma = (num:number, array:Array<{}>) =>{
    (num==array.length-1) ? setNum(0) : setNum(num+1)
  }
  const resta = (num:number, array:Array<{}>) =>{
    setNum(num-1)
    if(num==(array.length-array.length)){
    setNum(array.length-1)
    }
  }

  return (
    <div className="taller-container relative flex w-full min-h-[60vh]">
	
      <div className="first-child flex flex-col items-start text-start justify-center px-8 gap-4 w-1/2">
    <Slide>
        <p className="uppercase text-[#999] text-xs font-black">The grand moment</p>
        <h3 className="titulo-evento font-bold text-6xl text-transparent bg-clip-text bg-gradient-to-t from-[#563D81] to-[#6E5E8B] py-2">{arraycitoTalleres[num].name}</h3>
        <p className="text-[#999] text-sm">{arraycitoTalleres[num].descripción}</p>
        <button className="shadow-sm rounded text-[#767676] uppercase w-fit font-black text-xs border border-[#d1d1d1] p-4">Explorar taller</button>
    </Slide>

      </div>

      <div className=" second-child relative h-full w-1/2 h-full">
        <img className="image- object-cover w-full h-full rounded-xl" src={arraycitoTalleres[num].img} alt="taller" />

	      <Slide triggerOnce direction='right' className="absolute w-full h-fit flex justify-center items-center m-auto">
        <div className="cosito-slide pointer-events-auto flex items-center justify-center w-16 h-8 bg-white absolute bottom-0 mb-2 rounded-xl m-auto">
          <TbArrowNarrowLeft className="cursor-pointer" onClick={()=>resta(num, arraycitoTalleres)}/>
          <hr className="rotate-90 w-4"/>
          <TbArrowNarrowRight className="cursor-pointer"onClick={()=> suma(num, arraycitoTalleres)}/>
        </div>
	      </Slide>

      </div>
    </div>
  );
};

export default GridTalleres;

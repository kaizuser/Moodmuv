import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'
import { SwiperSlide } from "swiper/react";
import {connect} from 'react-redux'
import userActions from "../../../redux/actions/userActions";
const CarouselCardsDetail = ({activi}):any => {
    console.log(activi)
  let [fileValue, setFile] = useState('')
  useEffect(() => {
	  async function fetchFile (){
		let file:string | any = await axios({
			method:'get',
			url:'http://localhost:4000/api/files/backgroundImageActivity/' + activi?._id,
		})
		setFile(file.data)
	  }
	  fetchFile()
	}, [])

  return (
    <>
    <img className="h-52 shadow w-full object-cover rounded-3xl" src={`data:image/png;base64,${fileValue}`} alt="img" />
    <div className="p-2 flex justify-between items-center w-full">
    <p className=" uppercase font-bold text-[#999] text-sm py-[.1rem]  px-1">{activi?.disciples}</p>
    <p className="text-xs font-bold bg-gradient-to-t from-[#563D81] to-[#6E5E8B] px-1 py-[.1rem] text-white rounded">{activi?.format}</p>
    </div>
    <p className="px-2 font-bold text-[#222]">{activi?.name}</p>
  </>
  )
}

const mapDispatch = {
    setMetadata:userActions.setMetadata,
    uploadFile:userActions.uploadFile
  }
  
  const connector = connect(null, mapDispatch)
  
  export default connector(CarouselCardsDetail)
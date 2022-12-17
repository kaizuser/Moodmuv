import React, {useState, useEffect} from 'react'

//UTILITIES
import axios from 'axios'

const CarouselCardsDetail = ({activity}:any) => {
  let [fileValue, setFile] = useState('')
  useEffect(() => {
	  async function fetchFile (){
		let file:string | any = await axios({
			method:'get',
			url:'http://localhost:4000/api/files/backgroundImageActivity/' + activity?._id,
		})
		setFile(file.data)
	  }
	  fetchFile()
	}, [])

  return (
    <>
    <img className="h-52 shadow w-full object-cover rounded-3xl" src={`data:image/png;base64,${fileValue}`} alt="img" />
    <div className="p-2 flex justify-between items-center w-full">
    <p className=" uppercase font-bold text-[#999] text-sm py-[.1rem]  px-1">{activity?.disciples}</p>
    <p className="text-xs font-bold bg-gradient-to-t from-[#563D81] to-[#6E5E8B] px-1 py-[.1rem] text-white rounded">{activity?.format}</p>
    </div>
    <p className="px-2 font-bold text-[#222]">{activity?.name}</p>
  </>
  )
}

export default CarouselCardsDetail

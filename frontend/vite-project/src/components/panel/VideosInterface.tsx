//BASICS
import React from 'react'
import { useEffect, useState } from 'react';

//UTILITIES
import databaseActions from '../../redux/actions/databaseActions'
import {connect} from 'react-redux'
import { RootState } from '../../main';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper";
import {List} from '@mui/material';
import Box from "@mui/material/Box";
import Swal from 'sweetalert2';

function VideosInterface(props:any){

	let [file, setFile] = useState([])
	let [videos, setVideos] = useState([])
	let [renderFlag, setRenderFlag] = useState(false)

	let navigate = useNavigate()

	let getVideos = async () => {
		let videos: any = await axios({
			method:'get',
			url:'http://localhost:4000/api/videos/' + props.currentUser?._id,
		})

		setVideos(videos.data)
		setRenderFlag(true)

	}

	useEffect(() => {
		if(props.currentUser){
			getVideos()
		}

	}, [props.currentUser])

	let uploadVideo = async () => {
			let data = new FormData()

			data.append('file', file[0])

			props.setMetadata(props.currentUser._id)

			setTimeout(async() => {
				await props.uploadVideo(data, videos.length)

				navigate('/account/panel')
			}, 500)
	}


	let deleteVideos = async () => {
		Swal.fire({
			title: 'Estas seguro de eliminar todos tus videos?',
			showDenyButton: true,
			confirmButtonText: 'Confirmar',
			denyButtonText: `Cancelar`,
		}).then(async(result) => {
			if(result.isConfirmed){
				await props.deleteVideo(props.currentUser._id)
				navigate('/account/panel')
			}

			else if (result.isDenied) {
				Swal.fire('No se ha efectuado ninguna operación', '', 'info')
			}
		})
	}

	return (
		<>
			{renderFlag ? (
		<div className='py-5 px-4 min-h-screen flex flex-col'>
		<Box className="flex w-[99.50%] min-h-[10rem] bg-[#333] rounded-b-md bg-[url('https://user-images.githubusercontent.com/91817152/203515449-37e392bc-a22e-48b9-a49d-c062443ba7c6.png')] flex flex-col justify-center items-start px-4">
		    <h1 className="drop-shadow-md text-3xl font-medium text-[#fff] relative">
		      Panel de videos
		    </h1>
		    <p className=" drop-shadow-md  font-medium text-[#fff] relative">
		      El panel donde podrás ver tus clinicas de videos
		    </p>
		  </Box>				
			    <label className="block text-sm font-medium text-gray-700">
			    </label>
			    <div className="mt-1 flex justify-center items-center rounded-md flex-col space-y-12">
			      <div className="w-[30vw] space-y-1 flex justify-center items-center text-center flex-col border-dashed border-gray-300 border-2 px-6 pt-5 pb-6 mt-5">
				<svg
				  className="mx-auto h-12 w-12 text-gray-400"
				  stroke="currentColor"
				  fill="none"
				  viewBox="0 0 48 48"
				  aria-hidden="true"
				>
				  <path
				    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
				    strokeWidth={2}
				    strokeLinecap="round"
				    strokeLinejoin="round"
				  />
				</svg>
				<div className="flex text-sm text-gray-600">
				  <label
				    htmlFor="file"
				    className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
				  >
				    <span>Upload a file</span>
				    <input
				      id="file"
				      name="file"
				      type="file"
				      className="sr-only"
					    onChange={(e:any) => setFile(e.target.files)}
				      multiple
				    />
				  </label>
				  <p className="pl-1">or drag and drop</p>
				</div>

				<p className="text-xs text-gray-500">
				  PNG, JPG, GIF up to 10MB
				</p>

			      <button className='text-white w-20 h-4 p-4 mx-auto flex self-center align-center content-center items-center bg-gradient-to-t from-[#563D81] to-[#6E5E8B]  font-semibold rounded' onClick={uploadVideo}>Submit</button>
			      </div>

			{/*VIDEOS*/}
				    {videos.length > 0 && (
					    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash cursor-pointer hover:text-violet-500 transition duration-300 ease-in" viewBox="0 0 16 16" onClick={deleteVideos}>
					  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
					  <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
					</svg>
				    )}


			    <div className="w-full min-h-28 p-4 mb-40">
			      <Swiper
				slidesPerView={2.5}
				spaceBetween={15}
				freeMode={true}
				breakpoints={{
				  "@0.00": {
				    slidesPerView: 1,
				    spaceBetween: 10,
				  },
				  "@0.75": {
				    slidesPerView: 1,
				    spaceBetween: 10,
				  },
				  "@1.00": {
				    slidesPerView: 2,
				    spaceBetween: 10,
				  },
				  "@1.50": {
				    slidesPerView: 2,
				    spaceBetween: 15,
				  },
				  "@1.75": {
				    slidesPerView: 2,
				    spaceBetween: 1,
				  },
				}}
				pagination={{
				  clickable: true,
				}}
				modules={[FreeMode, Pagination]}
				className="mySwiper"
			      >
				{ 
			videos && videos.map((video:any)=>{
			  return(
			    <SwiperSlide  style={{padding:".7rem",width:"25rem",  minHeight:"28rem"}} className="flex flex-col justify-center items-center rounded-3xl bg-[#fefefe] shadow m-4" key={Math.random()} >
					<>
						<video src={`data:video/mp4;base64,${video.replace('undefined', '')}`} className='object-cover w-[50rem] h-[30rem] rounded-xl border-4 border-[#6E5E8B]' controls/>
				
					</>
			  </SwiperSlide>
			  )})          
			}
			      </Swiper>
			    </div>
			    </div>
			</div>
			) : (
				<div className='py-5 px-4 min-h-screen flex items-center justify-center'>
					<p className='font-bold mt-4 text-[#222]'>Loading your videos</p>
				</div>
			)}

		</>
	)
}

let mapDispatch = {
  setMetadata: databaseActions.setMetadataVideo,
  uploadVideo: databaseActions.uploadVideo,
  deleteVideo: databaseActions.deleteVideo
};

let mapState = (state: RootState) => {
	return {
		currentUser:state.userReducer.currentUser
	};
};

let connector = connect(mapState, mapDispatch);

export default connector(VideosInterface);

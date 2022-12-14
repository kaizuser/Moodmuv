//BASICS
import React from 'react'
import { useEffect, useState } from 'react';
import Box from "@mui/material/Box";

//UTILITIES
import databaseActions from '../../../redux/actions/databaseActions'
import {connect} from 'react-redux'
import { RootState } from '../../../main';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

function VideosInterface(props:any){

	let [file, setFile] = useState(undefined)

	let navigate = useNavigate()

	let uploadVideo = () => {
		let data = new FormData()

		data.append('file', file[0])

		props.setMetadata(props.currentUser._id)

		setTimeout(async() => {
			await props.uploadVideo(data)

			navigate('/account/panel')
		}, 500)

	}

	return (

	<div className='py-5 px-4'>
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
		    <div className="mt-1 flex justify-center items-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
		      <div className="space-y-1 text-center">
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
		    </div>
		  </div>

	)
}

let mapDispatch = {
  setMetadata: databaseActions.setMetadataVideo,
  uploadVideo: databaseActions.uploadVideo
};

let mapState = (state: RootState) => {
	return {
		currentUser:state.userReducer.currentUser
	};
};

let connector = connect(mapState, mapDispatch);

export default connector(VideosInterface);

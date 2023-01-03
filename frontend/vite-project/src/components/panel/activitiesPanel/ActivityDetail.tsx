import React, {useEffect, useState} from "react";

//UTILITIES
import { Fade, } from "react-awesome-reveal";
import { useParams } from "react-router-dom";
import {connect} from 'react-redux'
import activityActions from "../../../redux/actions/activityActions";
import {RootState} from "../../../main";
import axios from "axios";
import '../../../styles/mediaqueriesActivityDetail.css'
import teacherActions from '../../../redux/actions/teacherActions'
import { FaTiktok, FaInstagram, FaFacebookSquare } from "react-icons/fa";
import { Link as NavLink } from '@mui/material';

const ActivityDetail = (props:any) => {
	let id = useParams().id
	let textColor;
	let [fileValue, setFile] = useState('')
	let [profileImage, setProfileImage] = useState('')

	useEffect(() => {
		if(!props.activity){
			props.fetchActivity(id)
		}

		async function fetchFile (){
			let file:string | any = await axios({
			method:'get',
				url:'http://localhost:4000/api/files/backgroundImageActivity/' + id,
			})

			setFile(file.data)
		}

		if(props.activity){
			props.fetchTeacher(props.activity.author)
		}

		async function imageFileFetch (){
			let profile:string | any = await axios({
				method:'get',
				url:'http://localhost:4000/api/files/avatarProfile/' + props.activity?.author,
			})
			setProfileImage(profile.data)
		}

		imageFileFetch()
		fetchFile()

	}, [id, props.activity])


	switch (props.activity?.level) {
	case "Iniciación":
	textColor = "text-green-600 bg-green-300 px-1";
	break;
	case "Intermedio":
	textColor = "text-yellow-500 bg-yellow-100 px-1";
	break;
	case "Avanzado":
	textColor = "text-orange-500 bg-orange-300 px-1";
	break;
	}

	return (
    <>
      {props.activity && props.teacher && (
        <div className="apartado-padre relative min-h-screen w-full flex bg-[#f8f8f9] py-8">
          <div className="apartado-1 w-[90%] mx-12 min-h-full flex flex-col justify-start items-center">
          	<div className="w-full h-96 flex flex-col justify-center items-center">
				<h2 className="text-white font-bold text-5xl text-center break-all absolute z-10">
					{props.activity?.name}
					</h2>
                <img className="relative w-full h-full object-cover object-center rounded-xl brightness-75 z-0 relative grayscale-[50%] shadow-xl"  src={"data:image/png;base64," + fileValue} alt="asd" />
			</div>
            <div className=" whitespace-pre-wrap  p-8 shadow-sm rounded-xl bg-white h-auto w-full mt-4">
              <h2 className="font-medium text-xl text-[#222222] border-b-4 text-indigo-500 border-indigo-500 w-fit leading-2 mb-2 ">
                Información
              </h2>
              <p className="text-md text-[#999] break-all">
                {props.activity?.desc}
              </p>
              <hr className="w-full my-4" />
              <h2 className="font-medium text-xl text-[#222222]">Horario</h2>
              <p className="text-md text-[#999] break-all">
                {props.activity?.duration}
              </p>
              <hr className="w-full my-4" />
	      {props.activity.format == 'P'}
	      {props.activity.format == 'Presencial' && (
	      <>
              <h2 className="font-medium text-xl text-[#222222]">
		      Que necesitás
              </h2>
              <span
                style={{ whiteSpace: "pre-wrap" }}
                className="w-full h-full text-md text-[#999]"
              >

		{props.activity.needs}
              </span>

              <hr className="w-full my-4" />
              <h2 className="font-medium text-xl text-[#222222]">
                Como llegar
              </h2>
              <p className="text-md text-[#999]">{props.activity.getThere}</p>
	      </>
	      )}

            </div>
          </div>
          <div className="apartado-2 sticky top-4 px-8 py-8 flex flex-col items-center mr-12 rounded-xl h-screen w-1/2 grow bg-white">
            <div className="w-full flex justify-between items-center">
              <p className="text-[#999] text-sm w-1/2">
                Actividad dictado por{" "}
                <span className="text-[#000]">{props.teacher.name}</span>
              </p>
              <img
                className="rounded w-12 h-12 object-cover"
                src={"data:image/png;base64," + profileImage}
                alt=""
              />
            </div>
            <hr className="w-full my-4" />
            <Fade className="w-full flex flex-col gap-2 text-sm text-[#999] items-start">


	    <div className='flex flex-col justify-start items-start space-y-2'>
	      {props.activity.format == 'Presencial' && (
              <div className="flex gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                  />
                </svg>

                <p>
                  Ubicación:{" "}
                  <a className="text-sm text-[#999]" href={"https://www.google.cl/maps/search/" + "Potosi 2215"}>{props?.activity?.location}</a>
                </p>
              </div>
	      )}

              <div className="flex gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
                  />
                </svg>
                <p>
                  Formato:{" "}
                  <span className="capitalize|">{props.activity.format}</span>
                </p>
              </div>
              <div className="flex gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
                  />
                </svg>

                <p>
                  Nivel:{" "}
                  <span className={textColor}>{props.activity.level}</span>
                </p>
              </div>
              <div className="flex gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                  />
                </svg>
                <p>{props.teacher.num}</p>
              </div>
		{props.teacher?.media[2] && props.teacher?.media[2].includes('tiktok') && 
		<NavLink href={props.teacher?.media[2]} className='flex gap-1' style={{textDecoration:'none'}}>
			<FaTiktok className="text-[#323232] w-5 h-5"/>
			<p className='text-[#999]'>Check {props.teacher.name}'s Tiktok</p>
		</NavLink>
		}

		{props.teacher?.media[1] && props.teacher?.media[1].includes('instagram') && 
		<NavLink href={props.teacher?.media[1]} className='flex gap-1' style={{textDecoration:'none'}}>
			<FaInstagram className="text-[#323232] w-5 h-5"/>
			<p className='text-[#999]'>Check {props.teacher.name}'s Instagram</p>
		</NavLink>
		}

		{props.teacher?.media[0] && props.teacher?.media[0].includes('facebook') && 
		<NavLink href={props.teacher?.media[0]} className='flex gap-1' style={{textDecoration:'none'}}>
			<FaFacebookSquare className="text-[#323232] w-5 h-5"/>
			<p className='text-[#999]'>Check {props.teacher.name}'s Facebook</p>
		</NavLink>
		}
	    </div>


            </Fade>
          </div>
        </div>
      )}
    </>
  );
};

const mapDispatch = {
	fetchActivity:activityActions.fetchActivity,
	fetchTeacher: teacherActions.fetchTeacher
}

const mapState = (state:RootState) => {
	return {
		activity:state.activityReducer.activity,
		teacher:state.teacherReducer.teacher,
	}
}

const connector = connect(mapState, mapDispatch)

export default connector(ActivityDetail)

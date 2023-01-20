import { useEffect, useState } from "react";
import { FaTiktok, FaInstagram, FaFacebookSquare } from "react-icons/fa";
import {useParams} from 'react-router-dom'
import { Link as NavLink } from '@mui/material';
//UTILITIES
import CarouselCards from "../../profile/account/CarouselCards";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper";
import { Link } from "react-router-dom";
import {connect} from 'react-redux'
import teacherActions from '../../../redux/actions/teacherActions'
import activityActions from '../../../redux/actions/activityActions'
import { RootState } from "../../../main"
import ProfileScheduler from "./ProfileCalendar";
import axios from "axios";
import jsonImgs from '../../profile/account/radioImages.json'
//CSS
import '../../../styles/mediaqueriesAccount.css'
const Profile = (props:any) => {
	let params = useParams()

	let [renderFlag, setFlag] = useState(true)
	let [fileProfile, setFileProfile] = useState(undefined)
	let [videos, setVideos] = useState([])
	let [backImg, setBackImg] = useState({image:''})
 
	let [activitiesRegular, setActivitiesRegular] = useState([])
	let [activitiesCicle, setActivitiesCicle] = useState([])
	let [activitiesWorkshop, setActivitiesWorkshop] = useState([])
	let [activitiesEvent, setActivitiesEvent] = useState([])

	useEffect(() => {
		if(params.id && renderFlag){
			props.fetchTeacher(params.id)
			setFlag(false)
			props.fetchActivities()
		}

		if(props.activities){
			setActivitiesRegular(props.activities?.filter((e:any)=>e?.type.includes("Class") && e.author?._id.includes(props?.teacher._id)))
			setActivitiesCicle(props.activities?.filter((e:any)=>e?.type.includes("Cicle") && e.author?._id.includes(props?.teacher._id)))
			setActivitiesWorkshop(props.activities?.filter((e:any)=>e?.type.includes("Workshop") && e.author?._id.includes(props?.teacher._id)))
			setActivitiesEvent(props.activities?.filter((e:any)=>e?.type.includes("Event") && e.author?._id.includes(props?.teacher._id)))
		}

		if(props.teacher){

			let backimg = jsonImgs.find(e=> e.name === props.teacher.backImg)

			let fetchFile = async() => {
			let file: string | any = await axios({
					method:'get',
					url:'http://localhost:4000/api/files/avatarProfile/' + props.teacher?._id,
			})

			setFileProfile(file.data)
			backimg ? setBackImg(backimg) : ''
			setVideos(await axios({
				method:'get',
				url:'http://localhost:4000/api/videos/' + props.teacher?._id
			}).then((videos) => {return videos.data}))
		}

		  fetchFile()
		}
	}, [params, props.teacher])
	return (
	<>
	{" "}
	{props.teacher ? (
	<div className="bg-[#F3F3F3] min-h-screen flex flex-col justify-center items-center">
	  {/* Portada */}
	  <div className={`min-h-[80vh] w-full bg-[url('${backImg.image}')]   bg-center bg-cover`}></div>
	  {/* Perfil Contenedor */}
	  <div className="profile-contain flex flex-col items-center rounded-xl bg-white w-11/12 min-h-96 -translate-y-48 shadow">
	    <div className="flex justify-center items-center w-full editar-row">
	      <div className="invisible flex gap-4 items-center none">
		<Link
		  to={"/account/settings"}
		  className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full flex gap-2 text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
		>
		  <p>Editar</p>
		  <svg
		    xmlns="http://www.w3.org/2000/svg"
		    fill="none"
		    viewBox="0 0 24 24"
		    strokeWidth="1.5"
		    stroke="currentColor"
		    className="w-5 h-5"
		  >
		    <path
		      strokeLinecap="round"
		      strokeLinejoin="round"
		      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
		    />
		  </svg>
		</Link>
	      </div>
		  {/* IMAGEN  DE PERFIL */}
	      <img
		className="mx-4 w-40 h-40 object-cover object-center rounded-full -translate-y-16 profile-img"

		src={`data:image/png;base64,${fileProfile}`}/* {props.teacher?.img} */
	      />
		  {/* REDES */}

		  		<div className="social-div flex gap-4 items-center w-[6.5rem]">
			                {props.teacher?.media[2] && props.teacher?.media[2].includes('tiktok') && 
						<NavLink href={props.teacher?.media[2]}>
						<FaTiktok className="text-[#323232]"/>
						</NavLink>
					}

			                {props.teacher?.media[1] && props.teacher?.media[1].includes('instagram') && 
						<NavLink href={props.teacher?.media[1]}>
						<FaInstagram className="text-[#323232]"/>
						</NavLink>
					}
		
			                {props.teacher?.media[0] && props.teacher?.media[0].includes('facebook') && 
						<NavLink href={props.teacher?.media[0]}>
						<FaFacebookSquare className="text-[#323232]"/>
						</NavLink>
					}
				</div>

	    </div>
		<p className="text-center shadow-md bg-gradient-to-t from-[#fdc41d] to-[#fbb232] p-3 py-1 rounded-3xl text-white font-bold mb-2">Profesor</p>
	    <h2 className="font-bold text-4xl text-[#222]">{props.teacher?.name}</h2>
	    {/* Ubicación */}
		{ props?.teacher?.ubi !== undefined ?
	    <div className="p-4 flex">
	      <svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		strokeWidth={1.5}
		stroke="currentColor"
		className="w-5 h-5 text-[#999] mr-1"
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
	      <p className="font-bold text-[#999] uppercase text-sm">
	{props.teacher?.ubi}
	      </p>
	    </div> : ""
		}
	    {/* Oficio */}
	    { props?.teacher?.disciples.length !== 0 ?
	    <div className="flex p-4">
	      <svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		strokeWidth={1.5}
		stroke="currentColor"
		className="w-5 h-5 text-[#999] mr-1"
	      >
		<path
		  strokeLinecap="round"
		  strokeLinejoin="round"
		  d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z"
		/>
	      </svg>
		  <p className="text-[#999] text-sm px-1">
				 {props.teacher?.disciples.join(" - ")}

			      </p>
	    </div> : ""
		} 
	    <hr className="w-[95%]" />
	    <p className="text-center lg:w-[70%] text-[#999] py-8">
		{props.teacher?.desc}
	    </p>
	  </div>
 
 {/* FULL CAROUSELES */}
		{videos.length == 0 ?

	(
		<>

		</>
	) : 

	(
		<>
		    <div className="cartelito2 shadow-md px-20 -mt-20 py-2 rounded-md bg-gradient-to-t from-[#563D81] to-[#6E5E8B]">
			    <h3 className="font-bold text-white text-4xl">Videos</h3>
			    </div>
			    <div className="cartelito shadow-md -translate-y-12 translate-x-3 px-20 py-2 rounded-md bg-gradient-to-t from-[#563D81] to-[#6E5E8B]">
			    <h3 className="font-bold text-white text-4xl">Videos</h3>
		    </div>

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
		videos.map((video:any)=>{
		  return(
		    <SwiperSlide  style={{padding:".7rem",width:"25rem",  minHeight:"28rem"}} className="flex flex-col justify-center items-center rounded-3xl bg-[#fefefe] shadow m-4" key={Math.random()}>
				<>
					<video src={`data:video/mp4;base64,${video.replace('undefined', '')}`} className='object-cover w-[50rem] h-[30rem] rounded-xl border-4 border-[#6E5E8B]' controls/>
				</>
		  </SwiperSlide>
		  )})          
		}
		      </Swiper>
		    </div>
		</>


	)
}
 
 {props.teacher.type == 'Teacher' &&  activitiesRegular.length > 0 ? 
			  (
		<><div className="cartelito2 shadow-md px-20 -mt-20 py-2 rounded-md bg-gradient-to-t from-[#563D81] to-[#6E5E8B]">
			      <h3 className="font-bold text-white text-4xl">Clases regulares</h3>
			    </div>
			    <div className="cartelito shadow-md -translate-y-12 translate-x-3 px-20 py-2 rounded-md bg-gradient-to-t from-[#563D81] to-[#6E5E8B]">
			      <h3 className="font-bold text-white text-4xl">Clases regulares</h3>
			    </div>
				<CarouselCards activity={activitiesRegular}/>
				</>) : ""}				
			  {props.teacher.type == 'Teacher' &&  activitiesWorkshop.length > 0 ?
		<><div className="shadow-md mt-20 px-20 py-2 rounded-md bg-gradient-to-t from-[#563D81] to-[#6E5E8B]">
			      <h3 className="font-bold text-white text-4xl">Taller</h3>
			    </div>
			    <div className="cartelito shadow-md -translate-y-12 translate-x-3 px-20 py-2 rounded-md bg-gradient-to-t from-[#563D81] to-[#6E5E8B]">
			      <h3 className="font-bold text-white text-4xl">Taller</h3>
			    </div>
				<CarouselCards activity={activitiesWorkshop}/>

				</> : ""}				
				{props.teacher.type == 'Teacher' &&  activitiesCicle.length > 0 ? 
		<><div className="shadow-md mt-20 px-20 py-2 rounded-md bg-gradient-to-t from-[#563D81] to-[#6E5E8B]">
			      <h3 className="font-bold text-white text-4xl">Ciclos</h3>
			    </div>
			    <div className="cartelito shadow-md -translate-y-12 translate-x-3 px-20 py-2 rounded-md bg-gradient-to-t from-[#563D81] to-[#6E5E8B]">
			      <h3 className="font-bold text-white text-4xl">Ciclos</h3>
			    </div>
				<CarouselCards activity={activitiesCicle}/>				
				</> : ""}				
				{props.teacher.type == 'Teacher' && activitiesEvent.length > 0 ?
		<><div className="shadow-md mt-20 px-20 py-2 rounded-md bg-gradient-to-t from-[#563D81] to-[#6E5E8B]">
			      <h3 className="font-bold text-white text-4xl">Eventos</h3>
			    </div>
			    <div className="cartelito shadow-md -translate-y-12 translate-x-3 px-20 py-2 rounded-md bg-gradient-to-t from-[#563D81] to-[#6E5E8B]">
			      <h3 className="font-bold text-white text-4xl">Eventos</h3>
			    </div>
				<CarouselCards activity={activitiesEvent}/>
		</> : ""}		

	  {
		props.teacher && <ProfileScheduler id={props.teacher._id}/>
	  }
	  
	</div>
	) : (
	""
	)}
	</>
	);
};

let mapDispatch = {
	fetchTeacher:teacherActions.fetchTeacher,
	fetchActivity:activityActions.fetchActivity,
	fetchActivities:activityActions.fetchActivities
}

let mapState = (state:RootState) => {
	return {
		teacher:state.teacherReducer.teacher,
		activities:state.activityReducer.activities,	
		activity:state.activityReducer.activity
		
	}
}

let connector = connect(mapState, mapDispatch)

export default connector(Profile);

//UTILITIES
import React, {useEffect, useState} from 'react'
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { RootState } from "../../main";
import { Fade } from "react-awesome-reveal";
import activityActions from "../../redux/actions/activityActions"
import activityDTO from '../../types/activityDTO';
import axios from "axios";

//ICONS
import ActivityIcon from "../../assets/PanelIconos/fireIcons.svg";
import CicleIcon from "../../assets/PanelIconos/folder-openIcons.svg";
import WorkshopIcon from "../../assets/PanelIconos/lightning-boltRayito.svg";
import EventIcon from "../../assets/PanelIconos/starIcons.svg";
import EclipseIcon from '../../assets/PanelIconos/Ellipse 138.svg'

//CSS
import '../../styles/userPanel.css'
import '../../styles/mediaqueriesPanel.css'
//ASETS
import Bkgtest from '../../assets/Gradient.png'
function DashboardContent(props: any) {
	const [activityUser, setActivityUser] = useState([])

	useEffect(()=>{
		if(!props.activities){
			props.fetchActivities()
		}

		if(props.activities){
			setActivityUser(props?.activities?.filter((activity:activityDTO) => activity?.author?._id === props?.currentUser?._id))
		}

	},[props.activities])

	return (
		<>
		{props.currentUser && (
		<>
			{
				props.currentUser.type == 'Teacher' ? (
			<Box className="flex flex-col gap-8 justify-start items-center py-4 px-4 min-h-screen grow bg-[#f8f8f9]">
			  <Box className="flex w-[99.50%] min-h-[10rem] bg-[#333] rounded-b-md bg-[url('https://user-images.githubusercontent.com/91817152/203515449-37e392bc-a22e-48b9-a49d-c062443ba7c6.png')] flex flex-col justify-center items-start px-4">
		    <h1 className="drop-shadow-md text-3xl font-medium text-[#fff] relative">
			      Panel de usuario
			    </h1>
			    <p className=" drop-shadow-md  font-medium text-[#fff] relative">
			      El panel donde podrás ver tus actividades, eventos/festivales,
			      clinicas de videos
			    </p>
			  </Box>
			  <Box className="section gap-4 flex flex-wrap justify-center  w-full min-h-[50vh] bg-[#f8f8f9]">
			    {props.currentUser.type === "Teacher" ? (
			      <>
				<div
				  className="section-1 w-[49%] rounded-md relative bg-white min-h-[50vh] shadow flex flex-col gap-8 p-4"
				>
				  <h3 className="font-bold text-sm text-[#323232]">Actividades</h3>
				<Link to={"/account/panel/teacherActivities/Class"}>
				  <Fade className="fade-user-panel flex gap-4 w-48 hover:bg-[#323232] p-1 rounded-md transition duration-300 ease-in">
				    <div className="flex gap-2 w-full items-center">
				      <img
					className="p-1 w-6 h-6 rounded-full border border-[#3a57e8]"
					src={CicleIcon}
					alt="actividades"
				      />
				      <p className="font-bold text-[12px] text-[#323232]">
					Actividades Regulares: {activityUser?.filter((actividades:activityDTO) =>actividades?.type === "Class").length}
				      </p>
				    </div>
				  </Fade>
				</Link>
				<Link to={"/account/panel/teacherActivities/Cicle"}>
				  <Fade className="fade-user-panel flex gap-4 w-24 hover:bg-[#323232] p-1 rounded-md transition duration-300 ease-in">
				    <div className="flex gap-2 w-full items-center">
				      <img
					className="p-1 w-6 h-6 rounded-full border border-[#1aa053]"
					src={ActivityIcon}
					alt="actividades"
				      />
				      <p className="font-bold text-[12px] text-[#323232]">
					Ciclos: {activityUser?.filter((actividades:activityDTO) =>actividades?.type === "Cicle").length}
				      </p>
				    </div>
				  </Fade>
				</Link>
				<Link to={"/account/panel/teacherActivities/Event"}>
				  <Fade className="fade-user-panel flex gap-4 w-44 hover:bg-[#323232] p-1 rounded-md transition duration-300 ease-in">
				    <div className="flex gap-2 w-full items-center">
				      <img
					className="p-1 w-6 h-6 rounded-full border border-[#c03221]"
					src={EventIcon}
					alt="actividades"
				      />
				      <p className="font-bold text-[12px] text-[#323232]">
					Eventos/Festivales: {activityUser?.filter((actividades:activityDTO) =>actividades?.type === "Event").length}
				      </p>
				    </div>
				  </Fade>
				</Link>
				<Link to={"/account/panel/teacherActivities/Workshop"}>
				  <Fade className="fade-user-panel flex gap-4 w-32 hover:bg-[#323232] p-1 rounded-md transition duration-300 ease-in">
				    <div className="flex gap-2 w-full items-center">
				      <img
					className="p-1 w-6 h-6 rounded-full border border-[#3a57e8]"
					src={WorkshopIcon}
					alt="actividades"
				      />
				      <p className="font-bold text-[12px] text-[#323232]">
					Workshops: {activityUser?.filter((actividades:activityDTO) =>actividades?.type === "Workshop").length}
				      </p>
				    </div>
				  </Fade>
				</Link>
				</div>
				<Link to="/account/panel/teacherEvents" className={`bg-white section-1 w-[49%] rounded-md relative min-h-[50vh] shadow flex flex-col gap-8 p-4`}>
				  <h3 className="font-bold text-sm text-[#323232]">Eventos de Calendario</h3>
				  <Fade className="fade-user-panel flex gap-4 w-48 hover:bg-[#323232]  p-1 rounded-md transition  hover:text-[#323232] duration-300 ease-in">
				    <div className="flex gap-2 w-full items-center hover:text-[#323232]">
				      <img
					className="p-1 w-6 h-6 rounded-full hover:text-[#323232]"
					src={EclipseIcon}
					alt="actividades"
				      />
				      <p className="relative z-10 font-bold w-[100%] text-[12px] text-[#323232] hover:text-[#323232] ">
					Eventos de calendario: {props.currentUser.events.length}
				      </p>
				    </div>
				  </Fade>
				  
				</Link>
				{/* VIDEOS */}
				<Link to="/account/panel/teacherVideos" className="section-1 grow rounded-md relative bg-white h-[33vh] shadow flex flex-col gap-8 p-4">
				  <h3 className="font-bold text-sm text-[#323232]">Panel de videos</h3>
				  <Fade className="fade-user-panel flex gap-4 w-44 hover:bg-[#323232] p-1 rounded-md transition duration-300 ease-in">
				    <div className="flex gap-2 w-full items-center">
				      <img
					className="p-1 w-6 h-6 rounded-full "
					src={EclipseIcon}
					alt="actividades"
				      />
				      <p className="font-bold text-[12px] text-[#323232]">
					      Videos del usuario
				      </p>
				    </div>
				  </Fade>
				</Link>
			      </>
			    ) : (
			      <>
				<Link
				  to="/account/panel/studentActivities"
				  className='rounded relative bg-white w-[20rem] h-[15rem] shadow bg-[url("https://post.greatist.com/wp-content/uploads/sites/2/2021/08/GRT-acroyoga-couple-732x549-thumb.jpg")] bg-cover'
				>
				  <span className="text-sm py-1 px-4 bg-white rounded absolute top-2 left-2">
				    Actividades
				  </span>
				</Link>
				<Link
				  to="/account/panel/studentEvents"
				  className='rounded relative bg-white w-[20rem] h-[15rem] shadow bg-[url("https://cdn.andro4all.com/andro4all/2021/09/8-apps-para-descubrir-eventos-cercanos-a-tu-ubicacion.jpg")] bg-cover'
				>
				  <span className="text-sm py-1 px-4 bg-white rounded absolute top-2 left-2">
				    Eventos
				  </span>
				</Link>
			      </>
			    )}
			  </Box>
			</Box>
			//STUDENT
				) : (
			<Box className="flex flex-col gap-8 justify-start items-center py-4 px-4 min-h-screen grow bg-[#f8f8f9]">
			  <Box className="flex w-[99.50%] min-h-[10rem] bg-[#333] rounded-b-md bg-[url('https://user-images.githubusercontent.com/91817152/203515449-37e392bc-a22e-48b9-a49d-c062443ba7c6.png')] flex flex-col justify-center items-start px-4">
		    <h1 className="drop-shadow-md text-3xl font-medium text-[#fff] relative">
			      Panel de usuario
			    </h1>
			    <p className=" drop-shadow-md  font-medium text-[#fff] relative">
			      El panel donde podrás ver información útil
			    </p>
			  </Box>
			  <Box className="gap-4 flex flex-wrap justify-center w-full min-h-[50vh] bg-[#f8f8f9]">
			      <>
				<Link to="/account/panel/teacherEvents" className="w-[100%] rounded-md relative bg-white h-[20vh] shadow flex flex-col gap-8 p-4">
				  <h3 className="font-bold text-sm text-[#323232]">Eventos de Calendario</h3>
				  <Fade className="fade-user-panel flex gap-4 w-52 hover:bg-[#563D81] p-1 rounded-md transition duration-300 ease-in">
				    <div className="flex gap-2 w-full items-center">
				      <img
					className="p-1 w-6 h-6 rounded-full "
					src={EclipseIcon}
					alt="actividades"
				      />
				      <p className="font-bold w-[] text-[12px] text-[#323232]">
					Tus eventos del calendario
				      </p>
				    </div>
				  </Fade>
				</Link>
			      </>
			  </Box>
			</Box>
			)
			}
		</>


		)}
		</>
		);
}
const mapDispatch = {
  fetchActivities: activityActions.fetchActivities,

}
const mapState = (state: RootState) => {
  return {
    currentUser: state.userReducer.currentUser,
    activities: state.activityReducer.activities

  };
};

const connector = connect(mapState, mapDispatch);

export default connector(DashboardContent);

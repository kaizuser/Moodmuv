import { useEffect, useState } from 'react';

//UTILITIES
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux'
import activityActions from '../../redux/actions/activityActions'
import userActions from '../../redux/actions/userActions';
import {RootState} from '../../main';
import CardActivity from './Activities/CardActivity'

//INTERFACES
import activityDTO from '../../types/activityDTO';

function DashboardContent(props:any) {
	let [activities, setActivities] = useState([])

	useEffect(() => {
		if(!props.activities){
			props.fetchActivities()
		}
		if(props.activities && props.currentUser){
			setActivities(props.activities.filter((activity:activityDTO) => {return activity.author == props.currentUser._id}))
		}
	}, [props.activities, props.currentUser])

	return (
		<>
		<Box className="flex flex-col items-center p-4 min-h-screen grow bg-[#f8f8f9]">
		    <Box className=" w-11/12 min-h-[15rem] bg-[#333] rounded bg-[url('https://www.teclab.edu.ar/wp-content/uploads/2017/04/Carrera.jpg')] bg-cover bg-center relative flex justify-center items-center">
			<span className="absolute w-full h-full bg-black opacity-50"></span>
			<h1 className="text-5xl font-bold text-center text-[#fff] relative">Actividades</h1>
		    </Box>
		    <Box className="gap-4 py-4 items-center flex flex-col grow w-11/12 min-h-[50vh] bg-[#f8f8f9]">
			<Link to="/account/panel/teacherActivities/createactivity" className='flex gap-4 p-4 items-center text-white rounded bg-white w-full h-[6rem] shadow-sm bg-[#ecfdf5] bg-cover'>
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 p-2 rounded-full bg-[#34d399] text-white">
			<path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
			</svg>
			<p className='text-[#047857]'>Agregar Actividad</p>
			</Link>
			<div className='flex flex-col gap-8 w-full'>
				<h1 className='font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#563D81] to-[#6E5E8B] drop-shadow-2xl text-3xl my-4 text-center'>Actividades de {props.currentUser?.name}</h1>
				<h1 className='font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#563D81] to-[#6E5E8B] drop-shadow-2xl text-3xl my-4'>Clases Regulares</h1>
				<div className='flex flex-wrap gap-4 w-full min-h-4 items-center justify-center'>
				{activities && activities.filter((activity:activityDTO)=> activity.type === "Class").map((activity:activityDTO) => (
					<CardActivity activities={activity} />
					))}
				</div>
				<h1 className='font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#563D81] to-[#6E5E8B] drop-shadow-2xl text-3xl my-4'>Clases No Regulares</h1>
				<div className='flex flex-wrap gap-4 w-full min-h-4 items-center justify-center'>
				{activities && activities.filter((activity:activityDTO)=> activity.type !== "Class").map((activity:activityDTO) => (
					<CardActivity activities={activity} />
					))}
				</div>
			</div>
		    </Box>
		</Box>
		</>

	);
}

const mapDispatch = {
	fetchActivities:activityActions.fetchActivities,
	verifyToken:userActions.verifyToken
}

const mapState = (state:RootState) => {
	return {
		currentUser:state.userReducer.currentUser,
		activities:state.activityReducer.activities
	}
}

const connector = connect(mapState, mapDispatch)

export default connector(DashboardContent)

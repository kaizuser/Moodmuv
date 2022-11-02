
//BASICS 
import { useEffect, useState } from 'react';

//UTILITIES
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux'
import workshopActions from '../../redux/actions/workshopActions'
import {RootState} from '../../main';

interface workshopDTO{
	_id:string,
	author:string,
	name:string,
	format:string,
	level:string,
	desc:string,
	disciples: Array<string>,
	duration:string,
	video:Array<{url:string}>,
	price:string,
	location:string,
}

function DashboardContent(props:any) {
	let [workshops, setWorkshops] = useState([])

	useEffect(() => {
		if(!props.workshops){
			props.fetchWorkshops()
		}
		if(props.workshops && props.currentUser){
			setWorkshops(props.workshops.filter((workshop:workshopDTO) => {return workshop.author == props.currentUser.id}))
		}
	}, [props.workshops, props.currentUser])

	return (
		<>
		<Box className="flex flex-col items-center p-4 h-screen grow bg-[#f8f8f9]">
		    <Box className=" w-11/12 h-[15rem] bg-[#333] rounded bg-[url('https://www.teclab.edu.ar/wp-content/uploads/2017/04/Carrera.jpg')] bg-cover bg-center relative flex justify-center items-center">
			<span className="absolute w-full h-full bg-black opacity-50"></span>
			<h1 className="text-5xl font-bold text-center text-[#fff] relative">Talleres</h1>
		    </Box>
		    <Box className="gap-4 py-4 items-center flex flex-col grow w-11/12 h-[50vh] bg-[#f8f8f9]">
			<Link to="/account/panel/createworkshop" className='flex gap-4 p-4 items-center text-white rounded bg-white w-full h-[6rem] shadow-sm bg-[#ecfdf5] bg-cover'>
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 p-2 rounded-full bg-[#34d399] text-white">
			<path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
			</svg>
			<p className='text-[#047857]'>Agregar Taller</p>
			</Link>
		    </Box>

			{workshops && workshops.map((workshop:workshopDTO) => (
				<div>{workshop.name}
				</div>
			))}
		</Box>
		</>

	);
}

const mapDispatch = {
	fetchWorkshops:workshopActions.fetchWorkshops
}

const mapState = (state:RootState) => {
	return {
		currentUser:state.userReducer.currentUser,
		workshops:state.workshopReducer.workshops
	}
}

const connector = connect(mapState, mapDispatch)

export default connector(DashboardContent)

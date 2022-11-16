
//UTILITIES
import {useEffect} from 'react'
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux'
import teacherActions from '../../redux/actions/teacherActions';
import {RootState} from '../../main'

function DashboardContent(props:any) {

	return (
		<>
		<Box className="flex flex-col items-center p-4 h-screen grow bg-[#f8f8f9]">
			<Box className=" w-11/12 h-[15rem] bg-[#333] rounded bg-[url('https://www.teclab.edu.ar/wp-content/uploads/2017/04/Carrera.jpg')] bg-cover bg-center relative flex justify-center items-center">
			<span className="absolute w-full h-full bg-black opacity-50"></span>
			<h1 className="text-5xl font-bold text-center text-[#fff] relative">Eventos</h1>
			</Box>

			<div>
				{props?.currentUser?.events.map((event:any) => (
					<div className='mb-5' key={event._id}>
						<div>Cantidad de estudiantes: {event.students.length}</div>
						<div>Título: {event.title}</div>
					</div>
				))

				}
			</div>
		</Box>
		</>

	);

}

const mapState = (state:RootState) => {
	return {
		currentUser:state.userReducer.currentUser
	}
}

const connector = connect(mapState, null)

export default connector(DashboardContent)


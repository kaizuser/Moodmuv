//UTILITIES
import Box from '@mui/material/Box';
import {connect} from 'react-redux'
import {RootState} from '../../../main'
import { useEffect, useState} from 'react';
import teacherActions from '../../../redux/actions/teacherActions';
import teacherDTO from '../../../types/teacherDTO';

//COMPONENTS
import EventCalendarPanelDetails from './EventCalendarPanelDetails';

function DashboardContent(props:any) {
	let [studentEvents, setEvents] = useState([])
	let [renderFlag, setFlag] = useState(true)
	let months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

	useEffect(() => {
		if(!props.teachers){
			props.fetchTeachers()
		}

		if(props.teachers && renderFlag){
			props.teachers.map((teacher:teacherDTO) => {
				let events:any = teacher.events.filter((event:any) => event.students.includes(props.currentUser._id))
				setEvents(events)
				setFlag(false)
			})
		}
	}, )

	console.log(studentEvents)
	return (
		<>
			{
				props.currentUser.type == 'Teacher' ? (
				<Box className="flex flex-col gap-4 justify-start items-center py-4 px-4 min-h-screen grow bg-[#F3F3F3]">
					<Box className="flex w-[99.50%] min-h-[10rem] bg-[#333] rounded-b-md bg-[url('https://user-images.githubusercontent.com/91817152/203515449-37e392bc-a22e-48b9-a49d-c062443ba7c6.png')] flex flex-col justify-center items-start px-4">
					<h1 className="drop-shadow-md text-3xl font-medium text-[#fff] relative">Eventos</h1>
					<p className="drop-shadow-md  font-medium text-[#fff] relative">
			    El panel donde podrás ver tus eventos del calendarios
			  </p>
					</Box>

					<div className=''>

						<div className='flex justify-center items-center flex-wrap p-5 w-full h-auto'>
							{props?.currentUser?.events.map((event:any) => (
									<EventCalendarPanelDetails event={event} key={event._id}/>
							))}
							
						</div>
					</div>
				</Box>
				) : (
				<Box className="flex flex-col gap-4 justify-start items-center py-4 px-4 min-h-screen grow bg-[#F3F3F3]">
					<Box className="flex w-[99.50%] min-h-[10rem] bg-[#333] rounded-b-md bg-[url('https://user-images.githubusercontent.com/91817152/203515449-37e392bc-a22e-48b9-a49d-c062443ba7c6.png')] flex flex-col justify-center items-start px-4">
					<h1 className="drop-shadow-md text-3xl font-medium text-[#fff] relative">Eventos</h1>
					<p className="drop-shadow-md  font-medium text-[#fff] relative">
			    El panel donde podrás ver tus eventos del calendarios
			  </p>
					</Box>

					<div className=''>

						<div className='flex justify-center items-center flex-wrap p-5 w-full h-auto'>
							{studentEvents.map((event:any) => (
									<EventCalendarPanelDetails event={event} key={event._id}/>
							))}
							
						</div>
					</div>
				</Box>
				)
			}

		</>

	);

}

let mapDispatch = {
	fetchTeachers:teacherActions.fetchTeachers
}

const mapState = (state:RootState) => {
	return {
		currentUser:state.userReducer.currentUser,
		teachers:state.teacherReducer.teachers
	}
}

const connector = connect(mapState, mapDispatch)

export default connector(DashboardContent)


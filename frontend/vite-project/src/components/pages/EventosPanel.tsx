//UTILITIES
import {useEffect} from 'react'
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux'
import teacherActions from '../../redux/actions/teacherActions';
import {RootState} from '../../main'
//COMPONENTS
import UserPanelDetails from './UserPanelDetails';

function DashboardContent(props:any) {

	let months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

	return (
		<>
		<Box className="flex flex-col gap-4 justify-start items-center py-4 px-4 min-h-screen grow bg-[#F3F3F3]">
			<Box className="flex w-[99.50%] min-h-[10rem] bg-[#333] rounded-b-md bg-[url('https://user-images.githubusercontent.com/91817152/203515449-37e392bc-a22e-48b9-a49d-c062443ba7c6.png')] flex flex-col justify-center items-start px-4">
			<h1 className="drop-shadow-md text-3xl font-medium text-[#fff] relative">Eventos</h1>
			<p className="drop-shadow-md  font-medium text-[#fff] relative">
            El panel donde podrás ver tus eventos del calendarios
          </p>
			</Box>

			<div className=''>

				<div className='flex justify-center items-center flex-wrap p-5 w-screen h-auto'>
					{props?.currentUser?.events.map((event:any) => (
							<UserPanelDetails event={event} key={event._id}/>
					))}
					
				</div>
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


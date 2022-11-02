
//UTILITIES
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux'
import { RootState } from '../../main';import Dashboard from './TalleresPanel';


function DashboardContent(props:any) {

  return (
	<>
	{props.currentUser && (
        <Box className="flex flex-col items-center p-4 h-screen grow bg-[#f8f8f9]">
            <Box className=" w-11/12 h-[15rem] bg-[#333] rounded bg-[url('https://www.teclab.edu.ar/wp-content/uploads/2017/04/Carrera.jpg')] bg-cover bg-center relative flex justify-center items-center">
                <span className="absolute w-full h-full bg-black opacity-50"></span>
                <h1 className="text-5xl font-bold text-center text-[#fff] relative">Panel de usuario</h1>
            </Box>
            <Box className="gap-4 justify-center items-center flex flex-wrap grow w-11/12 h-[50vh] bg-[#f8f8f9]">
		{props.currentUser.type === 'Teacher' ? 
		<>
                <Link to="/account/panel/teacherWorkshops" className='rounded relative bg-white w-[20rem] h-[15rem] shadow bg-[url("https://post.greatist.com/wp-content/uploads/sites/2/2021/08/GRT-acroyoga-couple-732x549-thumb.jpg")] bg-cover'>
                    <span className='text-sm py-1 px-4 bg-white rounded absolute top-2 left-2'>Talleres</span>
                </Link>
                <Link to="/account/panel/teacherEvents" className='rounded relative bg-white w-[20rem] h-[15rem] shadow bg-[url("https://cdn.andro4all.com/andro4all/2021/09/8-apps-para-descubrir-eventos-cercanos-a-tu-ubicacion.jpg")] bg-cover'>
                    <span className='text-sm py-1 px-4 bg-white rounded absolute top-2 left-2'>Eventos</span>
                </Link>
		</>
		:
		<>
                <Link to="/account/panel/studentWorkshops" className='rounded relative bg-white w-[20rem] h-[15rem] shadow bg-[url("https://post.greatist.com/wp-content/uploads/sites/2/2021/08/GRT-acroyoga-couple-732x549-thumb.jpg")] bg-cover'>
                    <span className='text-sm py-1 px-4 bg-white rounded absolute top-2 left-2'>Talleres</span>
                </Link>
                <Link to="/account/panel/studentEvents" className='rounded relative bg-white w-[20rem] h-[15rem] shadow bg-[url("https://cdn.andro4all.com/andro4all/2021/09/8-apps-para-descubrir-eventos-cercanos-a-tu-ubicacion.jpg")] bg-cover'>
                    <span className='text-sm py-1 px-4 bg-white rounded absolute top-2 left-2'>Eventos</span>
                </Link>
		</>
		}

            </Box>
        </Box>
	)}
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

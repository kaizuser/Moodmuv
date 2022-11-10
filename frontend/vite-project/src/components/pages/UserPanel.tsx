
//UTILITIES
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux'
import { RootState } from '../../main';import Dashboard from './TalleresPanel';
import { Fade } from "react-awesome-reveal";


function DashboardContent(props:any) {

  return (
	<>
	{props.currentUser && (
        <Box className="flex flex-col items-center p-4 h-screen grow bg-[#f8f8f9]">
            <Box className=" w-11/12 h-[18rem] bg-[#333] rounded-[3rem] bg-gradient-to-r from-[#A88BEB] to-[#F8CEEC] flex justify-center items-center">
                <h1 className=" drop-shadow-md text-5xl font-medium text-center text-[#fff] relative">Panel de usuario</h1>
            </Box>
            <Box className="gap-4 justify-center items-center flex flex-wrap grow w-11/12 h-[50vh] bg-[#f8f8f9]">
		{props.currentUser.type === 'Teacher' ? 
		<>
                <Link to="/account/panel/teacherActivities" className='grow rounded-[1.5rem] relative bg-white h-[15rem] shadow bg-[url("https://post.greatist.com/wp-content/uploads/sites/2/2021/08/GRT-acroyoga-couple-732x549-thumb.jpg")] bg-cover bg-center'>
        <Fade>
                    <span className='text-sm py-1 px-4 bg-white rounded-[3rem] absolute top-2 left-2 drop-shadow-md bg-gradient-to-r from-[#563D81] to-[#6E5E8B] text-white'>Workshops</span>
        </Fade>  
                </Link>
                <Link to="/account/panel/teacherEvents"  className='rounded-[1.5rem] relative bg-white grow h-[15rem] shadow bg-[url("https://cdn.andro4all.com/andro4all/2021/09/8-apps-para-descubrir-eventos-cercanos-a-tu-ubicacion.jpg")] bg-cover bg-center'>
        <Fade>
                    <span className=' text-sm py-1 px-4 bg-white rounded-[3rem] absolute top-2 left-2 drop-shadow-md bg-gradient-to-r from-[#563D81] to-[#6E5E8B] text-white'>Eventos</span>
        </Fade>  
                </Link>
		</>
		:
		<>
                <Link to="/account/panel/studentActivities" className='rounded relative bg-white w-[20rem] h-[15rem] shadow bg-[url("https://post.greatist.com/wp-content/uploads/sites/2/2021/08/GRT-acroyoga-couple-732x549-thumb.jpg")] bg-cover'>
                    <span className='text-sm py-1 px-4 bg-white rounded absolute top-2 left-2'>Workshops</span>
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

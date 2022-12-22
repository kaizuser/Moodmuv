//COMPONENTS
import Nav from './components/general/Navbar'
import Home from './components/general/Home'
import SignIn from './components/general/logIn'
import SignUp from './components/general/SignUp'
import ForgotPassword from './components/designs/ForgotPassword'
import Explore from './components/explore/exploreComponents/Explore'
import Footer from './components/general/Footer'
import Profile from './components/explore/exploreProfile/Profile'
import Account from './components/profile/account/Account'
import ProfileSettings from './components/profile/settings/ProfileSettings'
import HowTo from './components/designs/howto/HowTo'
import Activity from './components/panel/activitiesPanel/ActivityContainer'
import CreateActivity from './components/panel/activitiesPanel/CreateActivities'
import UserPanel from './components/panel/UserPanel'
import VideosInterface from './components/profile/videos/VideosInterface'
import TalleresPanel from './components/panel/activitiesPanel/ActivitiesPanel'
import EventosPanel from './components/panel/eventsCalendarPanel/EventCalendarPanel'
import Spinner from './components/designs/Spinner'
import ChangePassword from './components/general/changePassword'
import Planes from './components/designs/Plans'
import AboutUs from './components/designs/About us/AboutContainer'
import './styles.css'

//UTILITIES
import SpinnerContext from './utils/SpinnerContext'
import {BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import userActions from './redux/actions/userActions'
import type {RootState, AppDispatch} from './main'
import {current} from '@reduxjs/toolkit'

function App(props:any) {
	const [loading, setLoading] = useState(true)
	const [spinner, setSpinner] = useState(true)

	useEffect(() => {
	if(props.currentUser == 'login' || !props.currentUser){
		if(localStorage.getItem('token')!== null){
			const token = localStorage.getItem("token")
			props.verifyToken(token)
		}
	}

	setTimeout(()=>{
		setLoading(false)
	}, 2000)

	},[props.currentUser])

	return (
		<>
		{
			loading ? (<Spinner/>) : (
			<Router>
				<SpinnerContext.Provider value={{spinner, setSpinner}}>
				<Nav/>
				<Routes>
					<Route path='/' element={<Home title="Home"/>}></Route>
					<Route path='/home' element={<Home title="Home"/>}></Route>
					<Route path='/explore' element={<Explore title="Explore"/>}></Route>
					<Route path='/howTo' element={<HowTo/>}></Route>
					<Route path='/explore/profile/:id' element={<Profile title="Perfil"/>}></Route>
					<Route path='/explore/activity/:id' element={<Activity/>}></Route>
					<Route path='/signIn' element={<SignIn title="Iniciar Sesión"/>} ></Route>
					<Route path='/signUp' element={<SignUp title="Registro"/>}></Route>
					<Route path='/forgotPass' element={<ForgotPassword/>}></Route>
					<Route path='/account' element={<Account title={"Mi cuenta"}/>}></Route>
					<Route path='/account/settings' element={<ProfileSettings title="Configuración de perfil"/>}></Route>
					<Route path='/account/panel' element={<UserPanel/>}></Route>
					<Route path='/account/panel/teacherActivities/:type' element={<TalleresPanel/>}></Route>
					<Route path='/account/panel/teacherEvents' element={<EventosPanel id={props.currentUser?._id}/>}></Route>
					<Route path='/account/panel/teacherActivities/createActivity' element={<CreateActivity/>}></Route>
					<Route path='/account/panel/teacherVideos' element={<VideosInterface/>}></Route>
					<Route path='/account/panel/studentActivities'></Route>
					<Route path='/account/panel/studentEvents'></Route>
					<Route path='/account/settings/password' element={<ChangePassword/>}></Route>
					<Route path='/payments' element={<Planes/>}></Route>
					<Route path='/aboutUs' element={<AboutUs/>}></Route>
				</Routes>			  
				<Footer/>
				</SpinnerContext.Provider>

			</Router>)
		}
		</>
		
  )
}

const mapDispatch = {
	verifyToken:userActions.verifyToken
}

const mapState = (state:RootState) => {
	return {
		currentUser:state.userReducer.currentUser,
		activities:state.activityReducer.activities
	}
}

const connector = connect(mapState, mapDispatch)

export default connector(App)

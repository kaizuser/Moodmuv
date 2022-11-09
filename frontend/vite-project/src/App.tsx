//COMPONENTS
import Nav from './components/generales/Navbar'
import Home from './components/pages/Home'
import SignIn from './components/pages/login/SignIn'
import SignUp from './components/pages/login/SignUp'
import ForgotPassword from './components/pages/ForgotPassword'
import Explore from './components/pages/explorar/Explore'
import Footer from './components/generales/Footer'
import Profile from './components/pages/login/Profile'
import Account from './components/pages/login/Account'
import ProfileSettings from './components/pages/login/settings/ProfileSettings'
import HowTo from './components/pages/howto/HowTo'
import Workshop from './components/pages/Workshops/WorkshopContainer'
import CreateWorshop from './components/pages/Workshops/CreateWorshop'
import UserPanel from './components/pages/UserPanel'
import TalleresPanel from './components/pages/TalleresPanel'
import EventosPanel from './components/pages/EventosPanel'
import './styles.css'

//UTILITIES
import {BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import {useEffect} from 'react'
import {connect} from 'react-redux'
import userActions from './redux/actions/userActions'
import type {RootState, AppDispatch} from './main'
import {current} from '@reduxjs/toolkit'

function App(props:any) {
	
	useEffect(() => {
	if(!props.currentUser?.id){
		if(localStorage.getItem('token')!== null){
		const token = localStorage.getItem("token")
		props.verifyToken(token)
		}
	}
	},[props.currentUser])

	return (
		<>
		<Router>
		      <Nav currentUser={props.currentUser?.id}/>
		      <Routes>
				<Route path='/' element={<Home title="Home"/>}></Route>
				<Route path='/home' element={<Home title="Home"/>}></Route>
				<Route path='/explore' element={<Explore title="Explore"/>}></Route>
				<Route path='/howTo' element={<HowTo/>}></Route>
				<Route path='/explore/profile/:id' element={<Profile title="Perfil"/>}></Route>
				<Route path='/explore/workshop/:id' element={<Workshop/>}></Route>
				<Route path='/signIn' element={<SignIn title="Iniciar Sesión"/>} ></Route>
				<Route path='/signUp' element={<SignUp title="Registro"/>}></Route>
				<Route path='/forgotPass' element={<ForgotPassword/>}></Route>
				<Route path='/account' element={<Account title={"Mi cuenta"}/>}></Route>
				<Route path='/account/settings' element={<ProfileSettings title="Configuración de perfil" id={props.currentUser?.id}/>}></Route>
				<Route path='/account/panel' element={<UserPanel/>}></Route>
				<Route path='/account/panel/teacherWorkshops' element={<TalleresPanel/>}></Route>
			      <Route path={"/account/panel/teacherEvents" || "/account/panel/teacherWorkshops"} element={<EventosPanel/>}></Route>
				<Route path='/account/panel/createworkshop' element={<CreateWorshop/>}></Route>
				<Route path='/account/panel/studentWorkshops'></Route>
			        <Route path='/account/panel/studentEvents'></Route>
		      </Routes>			  
		      <Footer/>
		</Router>
	      </>
  )
}

const mapDispatch = {
	verifyToken:userActions.verifyToken
}

const mapState = (state:RootState) => {
	return {
		currentUser:state.userReducer.currentUser
	}
}

const connector = connect(mapState, mapDispatch)

export default connector(App)

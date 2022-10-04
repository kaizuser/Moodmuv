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
import './styles.css'

//UTILITIES
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {useEffect} from 'react'
import {connect} from 'react-redux'
import verifyActions from './redux/actions/verifyActions'
import type {RootState, AppDispatch} from './main'

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
			      <Route path='/profile/:id' element={<Profile title="Perfil"/>}></Route>
			      <Route path='/explore' element={<Explore title="Explore"/>}></Route>
			      <Route path='/signIn' element={<SignIn title="Iniciar Sesión"/>} ></Route>
			      <Route path='/signUp' element={<SignUp title="Registro"/>}></Route>
			      <Route path='/forgotPass' element={<ForgotPassword title="Recuperar password"/>}></Route>
			      <Route path='/account' element={<Account title={"Mi cuenta"}/>}></Route>
			      <Route path='/account/settings' element={<ProfileSettings title="Configuración de perfil" id={props.currentUser?.id}/>}></Route>
		      </Routes>
		      <Footer/>
	      </Router>
	      </>
  )
}

const mapDispatch = {
	verifyToken:verifyActions.verifyToken
}

const mapState = (state:RootState) => {
	return {
		currentUser:state.userReducer.currentUser
	}
}

const connector = connect(mapState, mapDispatch)

export default connector(App)

//COMPONENTS
import Nav from './components/generales/Navbar'
import Home from './components/pages/Home'
import SignIn from './components/pages/login/SignIn'
import SignUp from './components/pages/login/SignUp'
import ForgotPassword from './components/pages/ForgotPassword'
import Explore from './components/pages/explorar/Explore'
import Footer from './components/generales/Footer'
import Profile from './components/pages/login/Profile'
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

	console.log(props.currentUser)

	return (
	      <>
	      <Router>
		      <Nav/>
		      <Routes>
			      <Route path='/' element={<Home/>}></Route>
			      <Route path='/home' element={<Home/>}></Route>
			      <Route path='/profile' element={<Profile/>}></Route>
			      <Route path='/explore' element={<Explore/>}></Route>
			      <Route path='/signIn' element={<SignIn/>} ></Route>
			      <Route path='/signUp' element={<SignUp/>}></Route>
			      <Route path='/forgotPass' element={<ForgotPassword/>}></Route>
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

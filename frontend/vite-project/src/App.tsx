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

function App() {

  return (
      <>
	      <Router>
		      <Nav/>
		      <Routes>
			      <Route path='/' element={<Home/>}></Route>
			      <Route path='/home' element={<Home/>}></Route>
			      <Route path='/profile/:id' element={<Profile/>}></Route>
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

export default App

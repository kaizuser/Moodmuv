
//COMPONENTS
import Nav from './components/generales/Navbar'
import Home from './components/pages/Home'
import SignIn from './components/pages/login/SignIn'
import SignUp from './components/pages/login/SignUp'
import OlvideContraseña from './components/pages/OlvideContraseña'
import Explorar from './components/pages/explorar/Explorar'
import Footer from './components/generales/Footer'
import Profile from './components/pages/login/Profile'
import './styles.css'
function App() {

  return (
      <>
      <Nav />
      <Profile/>
      <Explorar/>
      <SignIn/>
      <SignUp/>
      <OlvideContraseña/>
      <Home />
      <Footer/>
      </>
  )
}

export default App

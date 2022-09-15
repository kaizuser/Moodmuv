
//COMPONENTS
import Nav from './components/generales/Navbar'
import Home from './components/pages/Home'
import SignIn from './components/pages/SignIn'
import SignUp from './components/pages/SignUp'
import OlvideContraseña from './components/pages/OlvideContraseña'
import './styles.css'
function App() {

  return (
      <>
      <Nav />
      <SignIn/>
      <SignUp/>
      <OlvideContraseña/>
      <Home />
      </>
  )
}

export default App

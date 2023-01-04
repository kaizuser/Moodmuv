//UTILITIES
import {Link, NavLink} from 'react-router-dom'
import {useState} from 'react'
import {connect} from 'react-redux'
import userActions from '../../redux/actions/userActions'
import {useNavigate} from 'react-router-dom'
import GoogleLogIn from './GoogleLogIn'

const SignIn = (props:any) => {
  let [emailValue, setEmailValue] = useState('')
  let [passValue, setPassValue] = useState('')
  let navigate = useNavigate()

  let signIn = () => {
	  const userData = {
		  email:emailValue,
		  pass:passValue,
		  from:'form-signUp'
	  }

	  let navigateFlag = props.loginBoth(userData.email, userData.pass, userData.from).then((res:any) => {
		  if(res){
			  navigate('/home')
			  window.scrollTo(0, 0);

		  }
	  })
  }

  return (
    <div className="h-screen md:flex ">
      <div
        className="relative overflow-hidden md:flex w-1/2 bg-[url('https://user-images.githubusercontent.com/65744660/192929412-7e9bb4db-cc8a-46d4-ad26-f13b03ae66f9.png')] bg-cover bg-center i justify-around items-center hidden">
        <div>
          <h1 className="text-white font-semibold text-5xl font-sans">Iniciar sesión en </h1>
          <p className="text-white mt-1 text-3xl font-semibold">MoodMuv</p>
          <p className="text-white mt-1 w-52">Si todavía no tienes una cuenta puedes hacerla aqui</p>
          <Link to={'/signUp'}>
	  <span className="cursor-pointer text-[#0079FF] underline">Registrate ya</span>

	  </Link>
        </div>
        <div className="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        <div className="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        <div className="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        <div className="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
      </div>
      <div className="flex md:w-1/2 sm:h-full formulario justify-center py-10 items-center bg-[#f8f8f9]">
        <form className="">
          <h1 className="text-gray-800 font-semibold text-2xl mb-1">Iniciar sesión</h1>
          <p className="text-sm font-normal text-gray-600 mb-7 sm:mb-2">Bienvenido otra vez!</p>
	  <NavLink to={"/signup"} className="registrarme text-[#0079FF] underline cursor-pointer mb-1">Quiero registrarme</NavLink>
              <div className="flex items-center border-2 py-2 px-3 rounded mb-4 bg-[#F0EFFF]">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 " fill="none"
                  viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
		      <input className="pl-2 outline-none border-none bg-[#F0EFFF] placeholder-[#A7A3FF]" type="text" name="" id="" placeholder="Email Address" onChange={(event) => setEmailValue(event.target.value)}/>
          </div>
                <div className="flex items-center border-2 py-2 px-3 rounded bg-[#F0EFFF]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
                    fill="currentColor">
                    <path fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd" />
                  </svg>
			<input className="pl-2 outline-none border-none bg-[#F0EFFF] placeholder-[#A7A3FF]" type="password" name="" id="" placeholder="Password" onChange={(event) => setPassValue(event.target.value)}/>
          </div>
		<button type="button" className="block w-full bg-indigo-600 mt-4 py-2 rounded bg-[#4D47C3] text-white font-semibold mb-2" onClick={() => signIn()}>Iniciar Sesión</button>
		<div className='flex items-center justift-center flex-col'>
		  <Link to={'/forgotPass'}>
			  <span className="text-sm ml-2 hover:text-blue-500 cursor-pointer text-[#0079FF] underline">Te olvidaste la contraseña?</span>
		  </Link>
		  <GoogleLogIn/>
		</div>
        </form>
      </div>
    </div>
  )
}

const mapDispatch = {
	loginBoth:userActions.loginBoth
}

const connector = connect(null, mapDispatch)

export default connector(SignIn)

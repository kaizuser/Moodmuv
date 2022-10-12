//UTILITIES
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import studentActions from '../../../redux/actions/studentActions'
import teacherActions from '../../../redux/actions/teacherActions'
import { useState } from 'react'
import GoogleSignUp from './GoogleSignUp'

const SignUp = (props:any) => {
	document.title = props.title

	let [transitionValue, setTransitionValue] = useState(['block', 'none'])

	let [rolValue, setRolValue] = useState('')
	let [emailValue, setEmailValue] = useState('')
	let [passValue, setPassValue] = useState('')

	let signUp = () => {
		const userData = {
		  email:emailValue,
		  pass:passValue,
		  from:'form-signUp'
		}

		if(rolValue == 'Alumno'){
			props.signUpStudent(userData.email, userData.pass, userData.from)
		} else {

			props.signUpTeacher(userData.email, userData.pass, userData.from)
		}


	}

	return (
		<div className="h-screen md:flex ">
		<div
		className="relative overflow-hidden md:flex w-1/2 bg-[url('https://user-images.githubusercontent.com/65744660/192929415-59677042-04d1-4b84-a06c-bd2723fe5cc9.jpg')] bg-cover bg-center i justify-around items-center hidden">
		<div>
		  <h1 className="text-white font-semibold text-5xl font-sans">Registrate en </h1>
		  <p className="text-white mt-1 text-3xl font-semibold">MoodMuv</p>
		  <p className="text-white mt-1 w-52">Si ya tienes una cuenta puedes loguearte aqui</p>

		  <Link to={'/signIn'}>
			 <span className="font-bold text-[#5FAABF] cursor-pointer">Iniciar sesión</span>
		  </Link>

		</div>
		<div className="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
		<div className="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
		<div className="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
		<div className="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
		</div>
		<div className="flex md:w-1/2 sm:h-full formulario justify-center py-10 items-center bg-white">
		<form className="bg-white flex items-center justify-center flex-col space-y-6">
		<div>
		  <h1 className="text-gray-800 font-bold text-2xl mb-1">Registrate</h1>
		  <p className="text-sm font-normal text-gray-600 mb-7 sm:mb-2">Empieza tu nuevo camino artístico!</p>
		</div>
		<div className='rol-container' style={{'display':transitionValue[0]}}>
		  <div className="flex items-center border-2 py-2 px-3 rounded mb-4 bg-[#F0EFFF]">
			 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="h-5 w-5 text-gray-400" viewBox="0 0 16 16">
			   <path d="M8 9.05a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"/>
			   <path d="M1 1a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h.5a.5.5 0 0 0 .5-.5.5.5 0 0 1 1 0 .5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5.5.5 0 0 1 1 0 .5.5 0 0 0 .5.5h.5a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H6.707L6 1.293A1 1 0 0 0 5.293 1H1Zm0 1h4.293L6 2.707A1 1 0 0 0 6.707 3H15v10h-.085a1.5 1.5 0 0 0-2.4-.63C11.885 11.223 10.554 10 8 10c-2.555 0-3.886 1.224-4.514 2.37a1.5 1.5 0 0 0-2.4.63H1V2Z"/>
			 </svg>
			  <select className="w-40 pl-2 outline-none border-none bg-[#F0EFFF]" onChange={(event) => setRolValue(event.target.options[event.target.selectedIndex].value)}>
				  <option className='pl-2 outline-none border-none bg-[#F0EFFF] text-[#A7A3FF]' value='Elige tu rol' hidden>Elige tu rol</option>
				  <option className='pl-2 outline-none border-none bg-[#F0EFFF] text-[#A7A3FF]' value='Profesor'>Profesor</option>
				  <option className='pl-2 outline-none border-none bg-[#F0EFFF] text-[#A7A3FF]' value='Alumno'>Alumno</option>
			  </select>

		  </div>

			  <button className='block w-full bg-indigo-600 mt-4 py-2 rounded bg-[#4D47C3] text-white font-semibold mb-2' type='button' onClick={() => setTransitionValue(['none', 'block'])}>Siguiente</button>
	          </div>

		  <div className='transition-container' style={{'display':transitionValue[1]}}>
		  <div className="flex items-center border-2 py-2 px-3 rounded mb-4 bg-[#F0EFFF]">
			<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none"
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
				<input className="pl-2 outline-none border-none bg-[#F0EFFF] placeholder-[#A7A3FF]" type="text" name="" id="" placeholder="Password" onChange={(event) => setPassValue(event.target.value)}/>
		  </div>
			<button type="button" className="block w-full bg-indigo-600 mt-4 py-2 rounded bg-[#4D47C3] text-white font-semibold mb-2" onClick={() => signUp()}>Registrarme</button>

		  <div className='flex justify-center items-center flex-col'>
			  <Link to={'/signIn'}>
				  <span className="text-sm ml-2 hover:text-blue-500 cursor-pointer">Ya tienes cuenta?</span>
			  </Link>
			  <GoogleSignUp rolValue={rolValue}/>

		  </div>
		  </div>

		</form>
		</div>
		</div>
	  )
}

const mapDispatch = {
	signUpStudent:studentActions.signUpStudent,
	signUpTeacher:teacherActions.signUpTeacher
}

const connector = connect(null, mapDispatch)

export default connector(SignUp)

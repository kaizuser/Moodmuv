import { useEffect, useState } from "react";

//UTILITIES
import CarouselCards from "./CarouselCards";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {connect} from 'react-redux'
import studentActions from "../../../redux/actions/studentActions";
import teacherActions from '../../../redux/actions/teacherActions'
import { RootState } from "../../../main"
import Scheduler from "./Calendar"


const Account = (props:any) => {
	interface studentType {
	id: string;
	email: string;
	}

	let currentUser: studentType = useSelector(
	(store: any) => store.userReducer.currentUser
	);

	useEffect(() => {
	  if(currentUser){
		  props.fetchStudent(currentUser.id)
		  props.fetchTeacher(currentUser.id)
	  }

	}, [currentUser])

	let userAccount = props.teacher || props.student

	return (
	<>
	{" "}
	{userAccount ? (
	<div className="bg-[#F3F3F3] min-h-screen flex flex-col justify-center items-center">
	  {/* Portada */}
	  <div className="h-[80vh] w-full bg-[url('https://images.unsplash.com/photo-1663206950304-6ac585f8669d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80')]   bg-center bg-cover"></div>
	  {/* Perfil Contenedor */}
	  <div className=" flex flex-col items-center rounded-xl bg-white w-11/12 min-h-96 -translate-y-48 shadow">
	    <div className="flex justify-center items-center w-full">
	      <div className="invisible flex gap-4 items-center">
		<Link
		  to={"/account/settings"}
		  className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full flex gap-2 text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
		>
		  <p>Editar</p>
		  <svg
		    xmlns="http://www.w3.org/2000/svg"
		    fill="none"
		    viewBox="0 0 24 24"
		    strokeWidth="1.5"
		    stroke="currentColor"
		    className="w-5 h-5"
		  >
		    <path
		      strokeLinecap="round"
		      strokeLinejoin="round"
		      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
		    />
		  </svg>
		</Link>
	      </div>
		  {/* IMAGEN  DE PERFIL */}
	      <img
		className="mx-4 w-40 rounded-full -translate-y-16"
		src={userAccount?.img}
	      />
	      <div className="flex gap-4 items-center">
		<Link
		  to={"/account/settings"}
		  className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full flex gap-2 text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
		>
		  <p>Editar</p>
		  <svg
		    xmlns="http://www.w3.org/2000/svg"
		    fill="none"
		    viewBox="0 0 24 24"
		    strokeWidth="1.5"
		    stroke="currentColor"
		    className="w-5 h-5"
		  >
		    <path
		      strokeLinecap="round"
		      strokeLinejoin="round"
		      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
		    />
		  </svg>
		</Link>
	      </div>
	    </div>
	    <h2 className="font-bold text-4xl text-[#222]">{userAccount?.name}</h2>
	    {/* Ubicación */}
	    <div className="p-4 flex">
	      <svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		strokeWidth={1.5}
		stroke="currentColor"
		className="w-5 h-5 text-[#999] mr-1"
	      >
		<path
		  strokeLinecap="round"
		  strokeLinejoin="round"
		  d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
		/>
		<path
		  strokeLinecap="round"
		  strokeLinejoin="round"
		  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
		/>
	      </svg>
	      <p className="font-bold text-[#999] uppercase text-sm">
	{userAccount?.ubi}
	      </p>
	    </div>
	    {/* Oficio */}
	    { props.teacher &&
	    <div className="flex p-4">
	      <svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		strokeWidth={1.5}
		stroke="currentColor"
		className="w-5 h-5 text-[#999] mr-1"
	      >
		<path
		  strokeLinecap="round"
		  strokeLinejoin="round"
		  d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z"
		/>
	      </svg>
		 <p className="text-[#666]">
		Solution Manager - Creative Tim Officer
	      </p>
	    </div>
		} 
	    <hr className="w-[95%]" />
	    <p className="lg:w-[70%] text-[#999] py-8">
		{userAccount?.desc}
	    </p>
	  {props.teacher &&
<><div className="shadow-md px-20 py-2 rounded-md bg-gradient-to-r from-[#563D81] to-[#6E5E8B]">
	      <h3 className="font-bold text-white text-4xl">Cursos</h3>
	    </div>
	    <div className="shadow-md -translate-y-12 translate-x-3 px-20 py-2 rounded-md bg-gradient-to-r from-[#563D81] to-[#6E5E8B]">
	      <h3 className="font-bold text-white text-4xl">Cursos</h3>
	    </div>
	    <CarouselCards />
		</>}
	  </div>

	  {
		props.teacher && <Scheduler userAccount={userAccount}/>
	  }
	  
	</div>
	) : (
	""
	)}
	</>
	);
};

let mapDispatch = {
	fetchStudent:studentActions.fetchStudent,
	fetchTeacher:teacherActions.fetchTeacher
}

let mapState = (state:RootState) => {
	return {
		teacher:state.teacherReducer.teacher,
		student:state.studentReducer.student
	}
}

let connector = connect(mapState, mapDispatch)

export default connector(Account);

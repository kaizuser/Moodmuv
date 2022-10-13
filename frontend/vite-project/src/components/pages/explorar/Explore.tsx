import React, {useEffect} from "react";
import Select from "./Select";
import CardExplore from './CardExplore'

//UTILITIES
import {connect} from 'react-redux'
import teacherActions from "../../../redux/actions/teacherActions"
import { RootState } from "../../../main";
import { Link } from "react-router-dom";

const Explore = (props:any) => {

	useEffect(() => {
		props.fetchTeachers()
	}, [])

	console.log(props);
  
	return (

		<div className="w-full h-screen">
		<div className="min-h-12 w-full flex gap-4 p-4 px-8 shadow-md">
		    <Select />
		    <Select />
		    <Select />
		    <Select />
		</div>
		<div className="flex w-100  ">
			<div className="w-4/6 px-4 h-screen bg-[#F3F3F3] flex flex-wrap gap-4 justify-center overflow-scroll p-4">
				{props.teachers ? props.teachers.map((teacher:any) => (
				<div className="max-w-xs rounded overflow-hidden shadow-lg">
					<img className="w-full h-44 object-cover" src="https://algarabia.com/wp-content/uploads/2017/05/El-texto-del-pa%CC%81rrafo-36.jpg" alt="Sunset in the mountains"/>
					<div className="flex justify-between items-center px-6 py-4">
						<div>
							<div className="font-bold text-xl mb-2">Acrobacia</div>
							<p className="text-gray-700 text-base">
							Como hacer tu propia vertical en 5 minutos
							</p>
						</div>

						<div className='flex w-full justify-end text-start text-gray-700 text-base text-xs pb-2 w-auto h-auto'>
							<p>1 week ago</p>
						</div>

					</div>
					
					<div className='flex justify-between items-center m-4'>
					<div className='flex gap-2  items-center text-xs text-[#007AE9] font-bold cursor-pointer'>
					<img className="object-cover rounded-full w-8 h-8" src="https://i.pinimg.com/originals/86/08/70/860870066df05a7a29bcb5bb9ea2e9a7.jpg" alt="imagen" />
					<Link to={'/profile'}>{teacher.name}</Link>
					</div>
					<p className='text-[#007AE9] text-xs cursor-pointer'>Ver mas</p>
					</div>
				</div>
				)) : ''}
			</div>
			<div className="w-3/6 h-screen bg-[#222]">
			aca va el mapa
			</div>
		</div>
		</div>
	);
};

const mapDispatch = {
	fetchTeachers:teacherActions.fetchTeachers
}

const mapState = (state:RootState) => {
	return {
		teachers:state.teacherReducer.teachers
	}
}

const connector = connect(mapState, mapDispatch)

export default connector(Explore)


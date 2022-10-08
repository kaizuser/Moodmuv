import React, { useEffect, useState, useRef } from "react";

//UTILITIES
import { Link } from "react-router-dom";
import studentActions from "../../../../redux/actions/studentActions"
import { connect } from "react-redux";
import Swal from 'sweetalert2'
import { RootState } from "../../../../main";

const ProfileSettings = (props:any) => {
	const [nameValue, setName] = useState(props.student?.name)
	const [ubiValue, setUbi] = useState(props.student?.ubi)
	const [numValue, setNum] = useState(props.student?.num)
	const [genreValue, setGenre] = useState(props.student?.genre)
	const [descValue, setDesc] = useState(props.student?.desc)

	useEffect(() => {
		if(!props.student && props.id !== undefined){
		props.fetchStudent(props.id)
		}

	}, [props])

	let saveStudent = () => {
		let studentData = {
			  id:props.id,
			  name:nameValue,
			  ubi:ubiValue,
			  num:numValue,
			  genre:genreValue,
			  desc:descValue
		}

		props.modifyStudent(studentData)
	}

	return (
		<>
		{
		    props.student && (
		<div className="w-full h-full bg-[#fafafa] py-4 min-h-4">
		<div className="m-auto border w-3/4 min-h-96 bg-white flex items-start">
		<div className="min-h-full w-52 border-r flex flex-col self-stretch">
		  <p className="w-full p-2 text-xs text-[#222] border-l-2 border-[#222] py-4 font-bold px-8">
		    Editar perfil
		  </p>
		  <Link
		    to={"/profile/settings/password"}
		    className="w-full p-2 text-xs text-[#222] py-4 px-8"
		  >
		    Cambiar contraseña
		  </Link>
		  <Link
		    to={"/profile/settings/desactive"}
		    className="w-full p-2 text-xs text-[#222] py-4 px-8"
		  >
		    Desactivar cuenta
		  </Link>
		  <p
		    onClick={() => console.log("chau")}
		    className="cursor-pointer w-full p-2 text-xs text-[#222] py-4 px-8"
		  >
		    Cerrar sesión
		  </p>
		</div>
		<form className="w-full px-28 pb-16 my-4 flex flex-col gap-4 min-h-4">
		  <fieldset className="flex flex-col gap-2 justify-center items-center">
		    <img className="rounded-full bg-black w-6 h-6" src="https://yt3.ggpht.com/ytc/AMLnZu835wtVeM6vGM_PkbU_Fvbma-sOcDD_aICc9-Ct=s48-c-k-c0x00ffffff-no-rj-mo" alt="" />
		    <label htmlFor="file-upload" className="cursor-pointer text-xs text-[#007AE9]">
		      Cambiar foto de perfil
		    </label>
		    <input className="hidden" id="file-upload" type="file"/>

		  </fieldset>
		  <fieldset className="flex gap-4 w-full flex-wrap">
		    <aside className="flex justify-end px-6 w-44 min-h-4">
		      <label className="font-bold  text-right self-center" htmlFor="">
			Nombre
		      </label>
		    </aside>
		    <input onChange={(e)=>setName(e.target.value)} className="name-input border grow rounded px-2" type="text" name="" id="" defaultValue={props.student?.name}/>
		  </fieldset>
		  <fieldset className="flex gap-4 w-full flex-wrap">
		    <aside className="flex justify-end px-6 w-44 min-h-4">
		      <label className="font-bold  text-right self-center" htmlFor="">
			Número de telefono
		      </label>
		    </aside>
		    <input onChange={(e)=>setNum(e.target.value)} className="num-input border grow rounded px-2 self-center" type="text" name="" id="" defaultValue={props.student?.num}/>
		  </fieldset>
		  <fieldset className="flex gap-4 w-full flex-wrap">
		    <aside className="flex justify-end px-6 w-44 min-h-4">
		      <label className="font-bold  text-right self-center" htmlFor="">
			Descripción
		      </label>
		    </aside>
		    <textarea onChange={(e)=> setDesc(e.target.value)} className="desc-input px-2 border grow rounded" name="textarea" defaultValue={props.student?.desc}></textarea>
		  </fieldset>
		  <fieldset className="flex gap-4 w-full flex-wrap">
		    <aside className="flex justify-end px-6 w-44 min-h-4">
		      <label className="font-bold  text-right self-center" htmlFor="">
			Ubicación
		      </label>
		    </aside>
		    <input onChange={(e)=>setUbi(e.target.value)} className="ubi-input border grow rounded px-2" type="text" name="" id="" defaultValue={props.student?.ubi}/>
		  </fieldset>
		  <fieldset className="flex gap-4 w-full flex-wrap">
		    <aside className="flex justify-end px-6 w-44 min-h-4">
		      <label className="font-bold  text-right self-center" htmlFor="">
			Género
		      </label>
		    </aside>
		    <select onChange={(e)=>setGenre(e.target.value)} defaultValue={props.student?.genre} className="genre-input text-sm border grow rounded px-2" id="">
		    <option value="Elige una opción" defaultValue={'Elige una opción'} disabled hidden></option>
		      <option value="Hombre">Hombre</option>
		      <option value="Mujer">Mujer</option>
		    </select>
		  </fieldset>
			<button className="rounded py-3 bg-[#007AE9] text-white mt-3 text-sm" type='button' onClick={() => saveStudent()}>Guardar</button>
		</form>
		</div>
		</div>

		)
		}

		</>
	);
};

let mapDispatch = {
	modifyStudent:studentActions.modifyStudent,
	fetchStudent:studentActions.fetchStudent
}

let mapState = (state:RootState) => {
	return {
		student:state.studentReducer.student
	}
}

let connector = connect(mapState, mapDispatch)

export default connector(ProfileSettings)

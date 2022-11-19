//BASICS
import React, { useEffect, useState } from "react";
import "../../../../styles/mediaqueriesSettings.css";

//UTILITIES
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import studentActions from "../../../../redux/actions/studentActions";
import teacherActions from "../../../../redux/actions/teacherActions";
import userActions from "../../../../redux/actions/userActions";
import databaseActions from '../../../../redux/actions/databaseActions'
import { connect } from "react-redux";
import Swal from "sweetalert2";
import { RootState } from "../../../../main";
import validator from "validator";
import SelectDisciples from "./SelectDisciples";

const ProfileSettings = (props: any) => {
	const [nameValue, setName] = useState(props.currentUser?.name);
	const [ubiValue, setUbi] = useState(props.currentUser?.ubi);
	const [numValue, setNum] = useState(props.currentUser?.num);
	const [genreValue, setGenre] = useState(props.currentUser?.genre);
	const [descValue, setDesc] = useState(props.currentUser?.desc);
	const [avatarFile, setAvatarFile] = useState(undefined);
	const [discValue, setDisc] = useState(props.currentUser?.disciples);

	let saveStudent = () => {
		let userData = {
			id: props.currentUser._id,
			name: nameValue,
			ubi: ubiValue,
			num: numValue,
			genre: genreValue,
			desc: descValue,
		        disciples: discValue
		};

		if (props.currentUser.type == "Teacher") {
			props.modifyTeacher(userData);
		} else {
			props.modifyStudent(userData);
		}

		if(avatarFile !== undefined){
			let data = new FormData()

			data.append('file', avatarFile[0])

			let metadata = {
				id:props.currentUser?._id,
				type:'Avatar profile'
			}
      setTimeout(()=>{
        props.uploadFile(data)
      }, 2000)
			props.setMetadata(metadata)
		}

	};

	let navigate = useNavigate()

	return (
	<>
	{props.currentUser && (
	<div className="w-full h-full bg-[#fafafa] py-4 min-h-4">
	  <div className="m-auto border w-3/4 min-h-96 bg-white flex items-start">
	    <div className="min-h-full w-52 border-r flex flex-col self-stretch">
	      <p className="w-full p-2 text-xs text-[#222] border-l-2 border-[#222] py-4 font-bold px-8">
		Editar perfil
	      </p>
	      <Link
		to={"/account/settings/password"}
		className="w-full p-2 text-xs text-[#222] py-4 px-8"
	      >
		Cambiar contraseña
	      </Link>
	      <Link
		to={"/account/settings/desactive"}
		className="w-full p-2 text-xs text-[#222] py-4 px-8"
	      >
		Desactivar cuenta
	      </Link>
	      <p
		onClick={() => {
		  props.logOut();
		  navigate("/home");
		  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
		}}
		className="cursor-pointer w-full p-2 text-xs text-[#222] py-4 px-8"
	      >
		Cerrar sesión
	      </p>
	    </div>
	    <form className="w-full px-28 pb-16 my-4 flex flex-col gap-4 min-h-4">
	      <fieldset className="flex flex-col gap-2 justify-center items-center">
		<img
		  className="rounded-full bg-black w-6 h-6"
		  src={props.currentUser?.img}
		  alt=""
		/>
		<label
		  htmlFor="file-upload"
		  className="cursor-pointer text-xs text-[#007AE9]"
		>
		  Cambiar foto de perfil
		</label>
		<input
		  onChange={(e: any) => setAvatarFile(e.target.files)}
		  className="hidden"
		  id="file-upload"
		  type="file"
		/>
	      </fieldset>
	      <fieldset className="flex gap-4 w-full flex-wrap">
		<aside className="flex justify-end px-6 w-44 min-h-4">
		  <label
		    className="font-bold  text-right self-center"
		    htmlFor=""
		  >
		    Nombre
		  </label>
		</aside>
		<input
		  onChange={(e) => setName(e.target.value)}
		  className="name-input border grow rounded px-2"
		  type="text"
		  name=""
		  id=""
		  defaultValue={props.currentUser?.name}
		/>
	      </fieldset>
	      <fieldset className="flex gap-4 w-full flex-wrap">
		<aside className="flex justify-end px-6 w-44 min-h-4">
		  <label
		    className="font-bold  text-right self-center"
		    htmlFor=""
		  >
		    Número de telefono
		  </label>
		</aside>
		<input
		  onChange={(e) => setNum(e.target.value)}
		  className="num-input border grow rounded px-2 self-center"
		  type="text"
		  name=""
		  id=""
		  defaultValue={props.currentUser?.num}
		/>
	      </fieldset>
	      <fieldset className="flex gap-4 w-full flex-wrap">
		<aside className="flex justify-end px-6 w-44 min-h-4">
		  <label
		    className="font-bold  text-right self-center"
		    htmlFor=""
		  >
		    Descripción
		  </label>
		</aside>
		<textarea
		  onChange={(e) => setDesc(e.target.value)}
		  className="desc-input px-2 border grow rounded"
		  name="textarea"
		  defaultValue={props.currentUser?.desc}
		></textarea>
	      </fieldset>

	      <fieldset className="flex gap-4 w-full flex-wrap">
		<aside className="flex justify-end px-6 w-44 min-h-4">
		  <label
		    className="font-bold  text-right self-center"
		    htmlFor=""
		  >
		    Disciplinas
		  </label>
		</aside>

		<SelectDisciples disciples={props.currentUser?.disciples}  setDisc={setDisc} />
		
	      </fieldset>
	      <fieldset className="flex gap-4 w-full flex-wrap">
		<aside className="flex justify-end px-6 w-44 min-h-4">
		  <label
		    className="font-bold  text-right self-center"
		    htmlFor=""
		  >
		    Ubicación
		  </label>
		</aside>
		<input
		  onChange={(e) => setUbi(e.target.value)}
		  className="ubi-input border grow rounded px-2"
		  type="text"
		  name=""
		  id=""
		  defaultValue={props.currentUser?.ubi}
		/>
	      </fieldset>
	      <fieldset className="flex gap-4 w-full flex-wrap">
		<aside className="flex justify-end px-6 w-44 min-h-4">
		  <label
		    className="font-bold  text-right self-center"
		    htmlFor=""
		  >
		    Género
		  </label>
		</aside>
		<select
		  onChange={(e) => setGenre(e.target.value)}
		  defaultValue={props.currentUser?.genre}
		  className="genre-input text-sm border grow rounded px-2"
		  id=""
		>
		  <option
		    value="Elige una opción"
		    defaultValue={"Elige una opción"}
		    disabled
		    hidden
		  ></option>
		  <option value="Hombre">Hombre</option>
		  <option value="Mujer">Mujer</option>
		</select>
	      </fieldset>
	      <button
		className="self-center rounded py-3 bg-[#007AE9] text-white mt-3 text-sm"
		type="button"
		onClick={() => {
			saveStudent()

		}}
	      >
		Guardar
	      </button>
	    </form>
	  </div>
	</div>
	)}
	</>
	);
};

let mapDispatch = {
  modifyStudent: studentActions.modifyStudent,
  modifyTeacher: teacherActions.modifyTeacher,
  logOut: userActions.logOut,
  setMetadata: databaseActions.setMetadata,
  uploadFile: databaseActions.uploadFile
};

let mapState = (state: RootState) => {
	return {
		currentUser:state.userReducer.currentUser
	};
};

let connector = connect(mapState, mapDispatch);

export default connector(ProfileSettings);

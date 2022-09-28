import React, { useState } from "react";

//UTILITIES
import { Link } from "react-router-dom";
import userActions from "../../../../redux/actions/userActions"
import { connect } from "react-redux";

const ProfileSettings = (props:any) => {
  const [nameValue, setName] = useState("")
  const [ubiValue, setUbi] = useState("")
  const [numValue, setNum] = useState(0)
  const [genreValue, setGenre] = useState("")
  const [descValue, setDesc] = useState("")

  let saveUser = () => {
	  let userData = {
		  id:props.id,
		  name:nameValue,
		  ubi:ubiValue,
		  num:Number(numValue),
		  genre:genreValue,
		  desc:descValue
	  }

	  props.modifyUser(userData)

  }

  console.log(props);

  return (
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
            <p className="text-xs text-[#007AE9]">Cambiar foto de perfil</p>
          </fieldset>
          <fieldset className="flex gap-4 w-full flex-wrap">
            <aside className="flex justify-end px-6 w-44 min-h-4">
              <label className="font-bold  text-right self-center" htmlFor="">
                Nombre
              </label>
            </aside>
            <input onChange={(e)=>setName(e.target.value)} className="border grow rounded px-2" type="text" name="" id="" />
          </fieldset>
          <fieldset className="flex gap-4 w-full flex-wrap">
            <aside className="flex justify-end px-6 w-44 min-h-4">
              <label className="font-bold  text-right self-center" htmlFor="">
                Número de telefono
              </label>
            </aside>
            <input onChange={(e)=>setNum(e.target.value)} className="border grow rounded px-2 self-center" type="text" name="" id="" />
          </fieldset>
          <fieldset className="flex gap-4 w-full flex-wrap">
            <aside className="flex justify-end px-6 w-44 min-h-4">
              <label className="font-bold  text-right self-center" htmlFor="">
                Descripción
              </label>
            </aside>
            <textarea onChange={(e)=> setDesc(e.target.value)} className="px-2 border grow rounded" name="textarea" ></textarea>
          </fieldset>
          <fieldset className="flex gap-4 w-full flex-wrap">
            <aside className="flex justify-end px-6 w-44 min-h-4">
              <label className="font-bold  text-right self-center" htmlFor="">
                Ubicación
              </label>
            </aside>
            <input onChange={(e)=>setUbi(e.target.value)} className="border grow rounded px-2" type="text" name="" id="" />
          </fieldset>
          <fieldset className="flex gap-4 w-full flex-wrap">
            <aside className="flex justify-end px-6 w-44 min-h-4">
              <label className="font-bold  text-right self-center" htmlFor="">
                Género
              </label>
            </aside>
            <select onChange={(e)=>setGenre(e.target.value)} defaultValue="Elige una opción" className="text-sm border grow rounded px-2" id="">
            <option value="Elige una opción" selected disabled hidden>Elige una opción</option>
              <option value="Hombre">Hombre</option>
              <option value="Mujer">Mujer</option>
            </select>
          </fieldset>
		<button className="rounded py-3 bg-[#007AE9] text-white mt-3 text-sm" type='button' onClick={() => saveUser()}>Guardar</button>
        </form>
      </div>
    </div>
  );
};

let mapDispatch = {
	modifyUser:userActions.modifyUser
}

let connector = connect(null, mapDispatch)

export default connector(ProfileSettings)

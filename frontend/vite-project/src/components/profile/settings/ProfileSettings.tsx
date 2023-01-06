//BASICS
import React, { useContext, useEffect, useState, useRef } from "react";
import "../../../styles/mediaqueriesSettings.css";

//UTILITIES
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import SpinnerContext from "../../../utils/SpinnerContext";
import studentActions from "../../../redux/actions/studentActions";
import teacherActions from "../../../redux/actions/teacherActions";
import userActions from "../../../redux/actions/userActions";
import databaseActions from "../../../redux/actions/databaseActions";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import { RootState } from "../../../main";
import SelectDisciples from "./SelectDisciples";
import Avatar from "@mui/material/Avatar";
import '../../../styles/mediaqueriesSettings.css'
const ProfileSettings = (props: any) => {
  let navigate = useNavigate();
  //PERSONAL INFORMATION
  const { spinner, setSpinner }: any = useContext(SpinnerContext);
  const [nameValue, setName] = useState(props.currentUser?.name);
  const [ubiValue, setUbi] = useState(props.currentUser?.ubi);
  const [numValue, setNum] = useState(props.currentUser?.num);
  const [genreValue, setGenre] = useState(props.currentUser?.genre);
  const [descValue, setDesc] = useState(props.currentUser?.desc);
  const [avatarFile, setAvatarFile] = useState(undefined);
  const [discValue, setDisc] = useState(props.currentUser?.disciples)
  const [mediaFacebook, setFacebook] = useState(props.currentUser?.media[0])
  const [mediaInstagram, setInstagram] = useState(props.currentUser?.media[1])
  const [mediaTiktok, setTiktok] = useState(props.currentUser?.media[2])

  //PROFILE AVATAR
  let [fileValue, setFile] = useState(undefined);

  useEffect(() => {
    async function fetchFile() {
      let file: string | any = await axios({
        method: "get",
        url:
          "http://localhost:4000/api/files/avatarProfile/" +
          props.currentUser?._id,
      });

      setFile(file.data);
    }

    fetchFile();
  }, [props.currentUser, spinner]);

  let saveStudent = async () => {
    let userData = {
      id: props.currentUser._id,
      name: nameValue,
      ubi: ubiValue,
      num: numValue,
      genre: genreValue,
      desc: descValue,
      disciples: discValue,
      media:[mediaFacebook, mediaInstagram, mediaTiktok]
    };

    if (props.currentUser.type == "Teacher") {
      await props.modifyTeacher(userData);
    } else {
      await props.modifyStudent(userData);
    }

    if (avatarFile !== undefined) {
      let data = new FormData();

      data.append("file", avatarFile[0]);

      let metadata = {
        id: props.currentUser?._id,
        type: "Avatar profile",
      };

      props.setMetadata(metadata);

      setTimeout(async () => {
        await props.uploadFile(data, props.currentUser?._id);

        await props.verifyToken(localStorage.getItem("token"));
        setSpinner(!spinner);

        setAvatarFile(undefined);
      }, 500);
    } else {

      await props.verifyToken(localStorage.getItem("token"));

      Swal.close();

      Swal.fire({
        icon: "success",
        title: "Haz configurado tu información correctamente",
        showConfirmButton: false,
        timer: 1000,
      });
    }
  };

  return (
    <>
      {props.currentUser && (
        <div className="w-full h-full bg-[#fafafa] py-4 min-h-4">
          <div className="change m-auto border w-3/4 min-h-96 bg-white flex items-start">
            <div className="nav-s min-h-full w-52 border-r flex flex-col self-stretch">
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
                Eliminar cuenta
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
            <form className="form w-full px-28 pb-16 my-4 flex flex-col gap-4 min-h-4 items-center justify-center">
              <fieldset className="fieldset flex flex-col gap-2 justify-center items-center">
                {/* AVATAR */}
                <Avatar
                  alt="P"
                  src={
                    fileValue !== undefined
                      ? `data:image/png;base64,${fileValue}`
                      : ""
                  }
                  sx={{ width: 25, height: 25, fontSize: 20 }}
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
		              name='file-upload'
                  type="file"
                />
              </fieldset>
	      <h1 className='font-bold mt-4 text-[#222]'>Información Personal</h1>
              <fieldset className="fieldset flex gap-4 w-full flex-wrap">
                <aside className="aside flex justify-end px-6 w-44 min-h-4">
                  <label
                    className="label font-bold  text-right self-center"
                    htmlFor=""
                  >
                    Nombre
                  </label>
                </aside>
                <input
                  onChange={(e) => setName(e.target.value)}
                  className="name-input border grow rounded px-2 border-[#d3d3d3] hover:border-[#b3b3b3]"
                  type="text"
                  name=""
                  id=""
                  defaultValue={props.currentUser?.name}
                />
              </fieldset>
              <fieldset className="fieldset flex gap-4 w-full flex-wrap">
                <aside className="aside flex justify-end px-6 w-44 min-h-4">
                  <label
                    className="label font-bold  text-right self-center"
                    htmlFor=""
                  >
                    Número de telefono
                  </label>
                </aside>
                <input
                  onChange={(e) => setNum(e.target.value)}
                  className="num-input border grow rounded px-2 self-center border-[#d3d3d3] hover:border-[#b3b3b3]"
                  type="text"
                  name=""
                  id=""
                  defaultValue={props.currentUser?.num}
                />
              </fieldset>

              <fieldset className="fieldset flex gap-4 w-full flex-wrap">
                <aside className="aside flex justify-end px-6 w-44 min-h-4">
                  <label
                    className="label font-bold  text-right self-center"
                    htmlFor=""
                  >
                    Ubicación
                  </label>
                </aside>
                <input
                  onChange={(e) => setUbi(e.target.value)}
                  className="ubi-input border grow rounded px-2 border-[#d3d3d3] hover:border-[#b3b3b3]"
                  type="text"
                  name=""
                  id=""
                  defaultValue={props.currentUser?.ubi}
                />
              </fieldset>


              <fieldset className="fieldset flex gap-4 w-full flex-wrap">
                <aside className="aside flex justify-end px-6 w-44 min-h-4">
                  <label
                    className="label font-bold  text-right self-center"
                    htmlFor=""
                  >
                    Descripción
                  </label>
                </aside>
                <textarea
                  onChange={(e) => setDesc(e.target.value)}
                  className="desc-input px-2 border grow rounded border-[#d3d3d3] hover:border-[#b3b3b3]"
                  name="textarea"
                  defaultValue={props.currentUser?.desc}
                ></textarea>
              </fieldset>

              <fieldset className="fieldset flex gap-4 w-full flex-wrap">
                <aside className="aside flex justify-end px-6 w-44 min-h-4">
                  <label
                    className="label font-bold  text-right self-center"
                    htmlFor=""
                  >
                    Disciplinas
                  </label>
                </aside>

                <SelectDisciples
                  disciples={props.currentUser?.disciples}
                  setDisc={setDisc}
                />
              </fieldset>

              <fieldset className="fieldset flex gap-4 w-full flex-wrap">
                <aside className="aside flex justify-end px-6 w-44 min-h-4">
                  <label
                    className="label font-bold  text-right self-center"
                    htmlFor=""
                  >
                    Género
                  </label>
                </aside>
                <select
                  onChange={(e) => setGenre(e.target.value)}
                  defaultValue={props.currentUser?.genre}
                  className="genre-input text-sm border border-[#d3d3d3] bg-[#fff] grow rounded px-2 hover:border-[#b3b3b3]"
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
                  <option value="Mujer">No binario</option>
                  <option value="Mujer">Prefiero no decir</option>
                </select>
              </fieldset>

{/* Facebook */}


	      <h1 className='font-bold mt-4 text-[#222]'>Redes Sociales</h1>

              <fieldset className="fieldset flex gap-4 w-full flex-wrap">
                <button
                  type="button"
                  data-mdb-ripple="true"
                  data-mdb-ripple-color="light"
                  className="flex justify-center items-center px-2 w-16 ml-[5.5rem] mr-[1.5rem] text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out"
                  style={{ backgroundColor: "#1877f2" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 320 512"
                    className="w-4 h-4"
                  >
                    <path
                      fill="currentColor"
                      d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"
                    />
                  </svg>
                </button>
                <input
                  className="social-input border grow rounded px-2 border-[#d3d3d3] hover:border-[#b3b3b3]"
                  type="text"
                  placeholder="https://www.facebook.com/moodmuv/"
                  name=""
                  id=""
		  defaultValue={props.currentUser?.media[0]}
		  onChange={(e) => setFacebook(e.target.value)}
                />
              </fieldset>


{/* Instagram */}

              <fieldset className="fieldset flex gap-4 w-full flex-wrap">
                <button
                  type="button"
                  data-mdb-ripple="true"
                  data-mdb-ripple-color="light"
                  className="flex justify-center items-center px-2 w-16 ml-[5.5rem] mr-[1.5rem] text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out"
                  style={{ backgroundColor: "#c13584" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    className="w-4 h-4"
                  >
                    <path
                      fill="currentColor"
                      d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"
                    />
                  </svg>
                </button>
                <input
                  className="social-input border grow rounded px-2 border-[#d3d3d3] hover:border-[#b3b3b3]"
                  type="text"
                  placeholder="https://www.instagram.com/mrain00/"
                  name=""
                  id=""
		  defaultValue={props.currentUser?.media[1]}
		  onChange={(e) => setInstagram(e.target.value)}
                />
              </fieldset>


{/* TIKTOK */}
              <fieldset className="fieldset flex gap-4 w-full flex-wrap">
                <button
                  type="button"
                  data-mdb-ripple="true"
                  data-mdb-ripple-color="light"
                  className="flex justify-center items-center px-2 w-16 ml-[5.5rem] mr-[1.5rem] text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out"
                  style={{ backgroundColor: "#333" }}
                >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-4 h-4">
						<path fill="currentColor" d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z"/>
					  </svg>
                </button>
                <input
                  className="social-input border grow rounded px-2 border-[#d3d3d3] hover:border-[#b3b3b3]"
                  type="text"
                  placeholder="https://www.tiktok.com/@moodmuv"
                  name=""
                  id=""
		  defaultValue={props.currentUser?.media[2]}
		  onChange={(e) => setTiktok(e.target.value)}
                />
              </fieldset>


              <button
                className="self-center rounded py-3 bg-[#007AE9] text-white mt-3 text-sm"
                type="button"
                onClick={() => {
                  saveStudent();
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
  verifyToken: userActions.verifyToken,
  setMetadata: databaseActions.setMetadataFile,
  uploadFile: databaseActions.uploadFile,
};

let mapState = (state: RootState) => {
  return {
    currentUser: state.userReducer.currentUser,
  };
};

let connector = connect(mapState, mapDispatch);

export default connector(ProfileSettings);

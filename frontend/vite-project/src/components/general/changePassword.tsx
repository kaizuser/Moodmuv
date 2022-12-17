import React, { useEffect, useState,} from "react";
import '../../styles/mediaqueriesSettings.css'
//UTILITIES
import { Link, useNavigate } from "react-router-dom";
import studentActions from "../../redux/actions/studentActions";
import teacherActions from "../../redux/actions/teacherActions";
import userActions from "../../redux/actions/userActions";
import { connect } from "react-redux";
import { RootState } from "../../main";

const ProfileSettings = (props: any) => {
  const [nameValue, setName] = useState(
    props.student?.name || props.teacher?.name
  );
  const [ubiValue, setUbi] = useState(props.student?.ubi || props.teacher?.ubi);
  const [numValue, setNum] = useState(props.student?.num || props.teacher?.num);
  const [genreValue, setGenre] = useState(
    props.student?.genre || props.teacher?.genre
  );
  const [descValue, setDesc] = useState(
    props.student?.desc || props.teacher?.desc
  );

  const [avatarFile, setAvatarFile] = useState(undefined);
  const [urlimage, setUrlimage] = useState("");

  useEffect(() => {
    if (!props.student && !props.teacher && props.id !== undefined) {
      props.fetchStudent(props.id);
      props.fetchTeacher(props.id);
    }
  }, [props]);

  let saveStudent = () => {
    let userData = {
      id: props.id,
      name: nameValue,
      ubi: ubiValue,
      num: numValue,
      genre: genreValue,
      desc: descValue,
    };

    if (user.type == "Teacher") {
      let teacherData = userData;
      props.modifyTeacher(teacherData);
    } else {
      let studentData = userData;
      props.modifyStudent(studentData);
    }
  };

  let user = props.student || props.teacher;
  let navigate = useNavigate()
  const disciplines = ["Acroyoga", "Yoga"]
  return (
    <>
      {user && (
        <div className="w-full h-full bg-[#fafafa] py-4 min-h-4">
          <div className="m-auto border w-3/4 min-h-96 bg-white flex items-start">
            <div className="min-h-full w-52 border-r flex flex-col self-stretch">
              <Link to={"/account/settings"} className="w-full p-2 text-xs text-[#222]  py-4  px-8">
                Editar perfil
              </Link>
              <Link
                to={"/account/settings/password"}
                className="border-l-2 border-[#222] font-bold w-full p-2 text-xs text-[#222] py-4 px-8"
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
                  window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
                }}
                className="cursor-pointer w-full p-2 text-xs text-[#222] py-4 px-8"
              >
                Cerrar sesión
              </p>
            </div>
            <form className="w-full h-full py-28 px-28 flex flex-col gap-4 justify-center items-center">
            <fieldset className="flex gap-4 w-full flex-wrap">
                <aside className="flex justify-end px-6 w-44 min-h-4">
                  <label
                    className="font-bold  text-right self-center"
                    htmlFor=""
                  >
                    Old Password
                  </label>
                </aside>
                <input
                  className="name-input border grow rounded px-2"
                  type="password"
                  name=""
                  id=""
                />
              </fieldset>
              <fieldset className="flex gap-4 w-full flex-wrap">
                <aside className="flex justify-end px-6 w-44 min-h-4">
                  <label
                    className="font-bold  text-right self-center"
                    htmlFor=""
                  >
                    New Password
                  </label>
                </aside>
                <input
                  className="name-input border grow rounded px-2"
                  type="password"
                  name=""
                  id=""
                />
              </fieldset>
              <fieldset className="flex gap-4 w-full flex-wrap">
                <aside className="flex justify-end px-6 w-44 min-h-4">
                  <label
                    className="font-bold text-right self-center whitespace-nowrap "
                    htmlFor=""
                  >
                    Repeat Password
                  </label>
                </aside>
                <input
                  className="name-input border grow rounded px-2"
                  type="password"
                  name=""
                  id=""
                />
              </fieldset>
              <button
                className="self-center rounded py-3 bg-[#007AE9] text-white mt-3 text-sm"
                type="button"
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
  fetchStudent: studentActions.fetchStudent,
  fetchTeacher: teacherActions.fetchTeacher,
  logOut: userActions.logOut,
};

let mapState = (state: RootState) => {
  return {
    student: state.studentReducer.student,
    teacher: state.teacherReducer.teacher,
  };
};

let connector = connect(mapState, mapDispatch);

export default connector(ProfileSettings);

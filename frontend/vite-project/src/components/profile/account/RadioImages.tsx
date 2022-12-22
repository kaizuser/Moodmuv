import React, { useRef, useState } from "react";
import json from "./radioImages.json";
import teacherActions from "../../../redux/actions/teacherActions";
import studentActions from "../../../redux/actions/studentActions";
import { RootState } from "../../../main";
import { connect } from "react-redux";
import Swal from "sweetalert2";

const RadioImages = (props:any) => {
  const [check, setCheck] = useState(null);
  const [editBkg, setEditBkg] = useState(false);
  const getData = (dato: any) => {
    let data = {
      bkg: dato,
    };
  };
  const checkImage = (e: any) => {
    console.log(e);
    setCheck(e);
  };
  const handleOpenEdit = () => {
    setEditBkg(!editBkg);
  };
  const EditarPortada = () => {
    return (
      <p
        onClick={() => handleOpenEdit()}
        className="cursor-pointer text-[#624087] text-xs border border-[#624087] bg-[] rounded px-6 py-2 backdrop-blur self-center mb-28 text-center order-2"
      >
        Editar Portada
      </p>
    );
  };
  const SaveData = async() => {
    if(check){
        let userData = {
            id: props.currentUser._id,
            backImg: check
          };
          console.log(userData)
          if (props.currentUser.type == "Teacher") {
              await props.modifyTeacher(userData);
            } else {
              await props.modifyStudent(userData);
            }
            Swal.close();
            Swal.fire({
              icon: "success",
              title: "Haz cambiado tu portada perro",
              showConfirmButton: false,
              timer: 1000,
            })
    }else{
        Swal.fire({
            icon:'error',
            title:"Debes seleccionar una portada!",
            showConfirmButton:false,
            timer:2000
        })
    }

  };

  const BotonGuardar = () => {
    return (
      <p
        onClick={() => SaveData()}
        className="self-stretch grow cursor-pointer text-[#624087] text-xs border border-[#624087] rounded px-6 py-2 backdrop-blur self-center mb-28 text-center order-2"
      >
        Guardar
      </p>
    );
  };
console.log(json)
console.log(props.currentUser)
  return (
    !editBkg ? (
    <EditarPortada />
  ) : (
    <div className="flex flex-col">
      <form
        action=""
        className="relative z-10 w-full content-center break-words min-h-[1rem] flex  flex-wrap justify-center gap-4 my-8 "
      >
        {json.map((e) => (
          <div className="relative flex flex-col justify-center items-center w-fit h-fit ">
            <img
              className={
                e.name.includes(check)
                  ? "images-bkg-profile w-20 h-20 object-cover rounded border-4 border-[#563D81]"
                  : "w-20 h-20 object-cover rounded"
              }
              src={e.image}
              alt={e.name}
            />
            <input
              onChange={(e) => checkImage(e.target.value)}
              className="absolute w-full h-full opacity-0"
              type="radio"
              value={e.name}
              id={e.name}
              name="egg"
            />
            <label className="absolute invisible" htmlFor={e.name}>
              {e.name}
            </label>
            <p className="text-[#999] text-sm my-2">{e.name}</p>
          </div>
        ))}
      </form>
      <BotonGuardar />
    </div>
  )
  )
};
let mapDispatch = {
    modifyStudent: studentActions.modifyStudent,
    modifyTeacher: teacherActions.modifyTeacher,
  };
  
  let mapState = (state: RootState) => {
    return {
      currentUser: state.userReducer.currentUser,
    };
  };
  
  let connector = connect(mapState, mapDispatch);
  
  export default connector(RadioImages);

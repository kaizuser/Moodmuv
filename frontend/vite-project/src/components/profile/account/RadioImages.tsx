
//UTILITIES
import React, { useRef, useState } from "react";
import json from "./radioImages.json";
import teacherActions from "../../../redux/actions/teacherActions";
import studentActions from "../../../redux/actions/studentActions";
import { RootState } from "../../../main";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import userActions from "../../../redux/actions/userActions";

const RadioImages = (props:any) => {
  const [check, setCheck] = useState('');
  const [editBkg, setEditBkg] = useState(false);
  const getData = (dato: any) => {
    let data = {
      bkg: dato,
    };
  };
  const checkImage = (e: any) => {
    setCheck(e);
  };
  const handleOpenEdit = () => {
    setEditBkg(!editBkg);
  };
  const EditarPortada = () => {
    return (
      <p
        onClick={() => handleOpenEdit()}
        className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full flex gap-2 text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 order-2 self-center mb-28 cursor-pointer"
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
          if (props.currentUser.type == "Teacher") {
              await props.modifyTeacher(userData);
            } else {
              await props.modifyStudent(userData);
            }
            Swal.close();
            Swal.fire({
              icon: "success",
              title: "Haz cambiado tu portada",
              showConfirmButton: false,
              timer: 1000,
            })
            await setEditBkg(false)

        await props.verifyToken(localStorage.getItem("token"));
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
      <div className="self-center flex justify-center items-center gap-2">
        
              <p 
      onClick={()=>setEditBkg(false)}
      className="text-white bg-[#f3f3f3] focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full flex gap-2 text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 order-2  mb-28 cursor-pointer">Cancelar</p>
      <p
        onClick={() => SaveData()}
        className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full flex gap-2 text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 order-2 self-center mb-28 cursor-pointer"
      >
        Guardar
      </p>

      </div>
    );
  };

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
          <div className="relative flex flex-col justify-center items-center w-fit h-fit " key={e.name}>
            <img
              className={
                e.name == check
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
    verifyToken:userActions.verifyToken
};
  
let mapState = (state: RootState) => {
    return {
      currentUser: state.userReducer.currentUser,
    };
};
  
  let connector = connect(mapState, mapDispatch);
  
  export default connector(RadioImages);

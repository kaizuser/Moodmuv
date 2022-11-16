//BASICS
import React from "react";
import { useState, useEffect } from "react";

//UTILITIES
import {setFips} from "crypto";
import { Link } from "react-router-dom";
import axios from "axios";
import {connect} from 'react-redux'
import activityActions from '../../../redux/actions/activityActions'
import {RootState} from "../../../main";

const CreateActivity = (props:any) => {
  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  }, []);

  let [viewLocation, setViewLocation] = useState('none')

  let [name, setName] = useState('')
  let [type, setType] = useState('')
  let [format, setFormat] = useState('')
  let [level, setLevel] = useState('')
  let [desc, setDesc] = useState('')
  let [disc, setDisc] = useState('')
  let [dur, setDur] = useState('')
  let [price, setPrice] = useState('')
  let [loc, setLoc] = useState('')

  let uploadTest = async() => {
	  let activityData = {
		  author:props.currentUser._id,
		  name:name,
		  type:type,
		  format:format,
		  level:level,
		  desc:desc,
		  disciples:disc,
		  duration:dur,
		  price:price,
		  location:loc
	  }

	  console.log(activityData);
	  

	  props.setActivity(activityData)
  }

  return (
    <div className="min-h-screen w-full bg-[#f3f3f3] flex flex-col justify-start items-center">
      <Link to="/account/panel/teacherActivities" className="sticky top-4 flex justify-center items-center  text-[#999] flex gap-2 self-start p-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p className="text-sm">Volver</p>
      </Link>

      <div>
        <div className="p-4 md:grid md:grid-cols-3 md:gap-6">
            
          <div className="md:col-span-1">
            <div className="sticky top-16 px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Workshop
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                This information will be displayed publicly so be careful what
                you share.
              </p>
            </div>
          </div>
          <div className="mt-5 md:col-span-2 md:mt-0">
            <form action="#" method="POST">
              <div className="shadow sm:overflow-hidden sm:rounded-md">
                <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-6 gap-6 pb-5 space-b-5">
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="first-name"
                        className=" block text-sm font-medium text-gray-700"
                      >
                        Workshop Nombre
                      </label>
                      <input
                        type="text"
                        name="first-name"
                        id="first-name"
                        autoComplete="given-name"
                        className="px-2 py-1 border mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder="Acroyoga, Handstand, Etc"
			onChange={(event) => setName(event.target.value)}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="format"
                        className="block text-sm font-medium text-gray-700"
                      >
		      Tipo de actividad
                      </label>
		      <select name='format' className='px-2 py-1 border mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm' onChange={(event) => setType(event.target.options[event.target.selectedIndex].value)}>
		      <option hidden>Elige tu tipo de actividad</option>
		      <option value='class'>Clase regular</option>
		      <option value='event'>Evento</option>
		      <option value='workshop'>Taller</option>
		      <option value='cicle'>Ciclo</option>

		      </select>
                    </div>
                  </div>

                  <div className="space-y-6 bg-white py-5">
                   <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="format"
                        className="block text-sm font-medium text-gray-700"
                      >
		      Formato
                      </label>
		      <select name='format' className='px-2 py-1 border mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm' onChange={(event) => {
			      setFormat(event.target.options[event.target.selectedIndex].value)

			      if(event.target.options[event.target.selectedIndex].value == 'Presencial'){
				      setViewLocation('block')
			      } else {
				      setViewLocation('none')
			      }


		      }}>
		      <option hidden>Elige tu formato</option>
		      <option value='virtual'>Virtual</option>
		      <option value='presencial'>Presencial</option>
		      </select>
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="first-name"
                        className=" block text-sm font-medium text-gray-700"
                      >
                        Disciplinas
                      </label>

		      <select className="px-2 py-1 border mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" onChange={(event) => setDisc(event.target.options[event.target.selectedIndex].value)}>
		      <option hidden>Elige las disciplinas</option>Q
		      <option value='Yoga'>Yoga</option>
		      <option value='Acroyoga'>Acroyoga</option>
		      <option value='Twerk'>Twerk</option>
		      <option value='Acrobacia de piso'>Acrobacia de piso</option>
		      <option value='biodanza'>biodanza</option>
		      <option value='Handstand'>Handstand</option>

		      </select>
                    </div>
		   </div>
                  </div>  

		  <div className='space-y-6 bg-white py-5'>
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="first-name"
                        className=" block text-sm font-medium text-gray-700"
                      >
                        Duración
                      </label>
                      <input
                        type="text"
                        name="first-name"
                        id="first-name"
                        autoComplete="given-name"
                        className="px-2 py-1 border mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder="Formato HS"
			onChange={(event) => setDur(event.target.value)}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="last-name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Nivel
                      </label>
		      <select className="px-2 py-1 border mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" onChange={(event) => setLevel(event.target.options[event.target.selectedIndex].value)}>
		      <option hidden>Elige el nivel</option>
		      <option value='Dificil'>Dificil</option>
		      <option value='Intermedio'>Intermedio</option>
		      <option value='Facil'>Facil</option>

		      </select>
                    </div>
                  </div>

                  <div className="pt-5">
                    <label
                      htmlFor="about"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Descripción
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="about"
                        name="about"
                        rows={3}
                        className="border p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder="Tu descripción"
			onChange={(event) => setDesc(event.target.value)}
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Introduce una descripción intuitiva y util
                  </p>
                 </div>
                 <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"

		    onClick={uploadTest}
                  >
                    Save
                  </button>
                 </div>
                </div>
	       </div>
              </div>
             </form>
            </div>
           </div>
      </div>
      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>
    </div>
  );
};

const mapDispatch = {
	setActivity:activityActions.setActivity
}

const mapState = (state:RootState) => {
	return {
		currentUser:state.userReducer.currentUser
	}
}

const connector = connect(mapState, mapDispatch)

export default connector(CreateActivity)

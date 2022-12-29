//BASICS
import React, { useState, useEffect } from "react";

//UTILITIES
import { Link, useNavigate} from "react-router-dom";
import {connect} from 'react-redux'
import activityActions from '../../../redux/actions/activityActions'
import databaseActions from '../../../redux/actions/databaseActions'
import {RootState} from "../../../main";

const CreateActivity = (props:any) => {
  let navigate = useNavigate()

  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  }, []);

	useEffect(() => {
	// 👇️ scroll to top on page load
	window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
	}, []);

	let [view, setView] = useState('none')

	let [bkgImage, setFile] = useState([])
	let [name, setName] = useState('')
	let [type, setType] = useState('')
	let [format, setFormat] = useState('')
	let [level, setLevel] = useState('')
	let [desc, setDesc] = useState('')
	let [disc, setDisc] = useState('')
	let [dur, setDur] = useState('')
	let [price, setPrice] = useState('')
	let [loc, setLoc] = useState('')
	let [getThere, setGetThere] = useState('')
	let [needs, setNeeds] = useState('')

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
		  location:loc,
		  getThere:getThere,
		  needs:needs
		}

		let activity = await props.setActivity(activityData)

		let data = new FormData()

		data.append('file', bkgImage[0])

		let metadata = {
			id:activity?._id,
			type:'Background image activity'
		}

		props.setMetadata(metadata)

		setTimeout(async()=>{
			await props.uploadFile(data, props.currentUser?._id)
			await props.resetStore()

			navigate('/account/panel')
		}, 500)
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
		      <option value='Class'>Clase regular</option>
		      <option value='Event'>Evento</option>
		      <option value='Workshop'>Taller</option>
		      <option value='Cicle'>Ciclo</option>

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
				      setView('block')
			      } else {
				      setView('none')
			      }


		      }}>
		      <option hidden>Elige tu formato</option>
		      <option value='Virtual'>Virtual</option>
		      <option value='Presencial'>Presencial</option>
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
			      <option value='Acrobacia de piso'>Acrobacia de Piso</option>
			      <option value='Biodanza'>Biodanza</option>
			      <option value='Handstand'>Handstand</option>
			      <option value='Escalada'>Escalada</option>Q
			      <option value='Mano con Mano'>Mano con Mano</option>
			      <option value='Aerials'>Aerials</option>
			      <option value='Danza contemporaria'>Danza Contemporaria</option>
			      <option value='Heels Dance'>Heels Dance</option>
			      <option value='Animal Flow'>Animal Flow</option>
			      <option value='Contact'>Contact</option>
			      <option value='Poledance'>Poledance</option>
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
		      <option value='Avanzado'>Avanzado</option>
		      <option value='Intermedio'>Intermedio</option>
		      <option value='Iniciación'>Iniciación</option>

		      </select>
		    </div>
		  </div>

		  <div className='space-y-6 bg-white py-5' style={{display:`${view}`}}>

		  <div className="grid grid-cols-6 gap-6">
		    <div className="col-span-6 sm:col-span-3">
		      <label
			htmlFor="first-name"
			className=" block text-sm font-medium text-gray-700"
		      >
			Ubicación
		      </label>
		      <input
			type="text"
			name="first-name"
			id="first-name"
			autoComplete="given-name"
			className="px-2 py-1 border mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
			placeholder="Describe la ubicación"
			onChange={(event) => setLoc(event.target.value)}
		      />
		    </div>
		    <div className="col-span-6 sm:col-span-3">
		      <label
			htmlFor="first-name"
			className=" block text-sm font-medium text-gray-700"
		      >
			Como llegar
		      </label>
		      <input
			type="text"
			name="first-name"
			id="first-name"
			autoComplete="given-name"
			className="px-2 py-1 border mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
			placeholder="Describe como llegar"
			onChange={(event) => setGetThere(event.target.value)}
		      />
		    </div>
		    </div>
		  </div>

		  <div className="py-5">
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
			placeholder="Introduce una descripción resumida y util"
			onChange={(event) => setDesc(event.target.value)}
		      />
		    </div>
		 </div>

		  <div className="py-5">
		    <label
		      htmlFor="about"
		      className="block text-sm font-medium text-gray-700"
		    >
		      Que necesitás
		    </label>
		    <div className="mt-1">
		      <textarea
			id="about"
			name="about"
			rows={3}
			className="border p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
			placeholder="Describe lo que necesita el estudiante para tu actividad (opcional)"
			onChange={(event) => setNeeds(event.target.value)}
		      />
		    </div>
		 </div>

		  <div className='py-5'>
		    <label className="block text-sm font-medium text-gray-700">
		    </label>
		    <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
		      <div className="space-y-1 text-center">
			<svg
			  className="mx-auto h-12 w-12 text-gray-400"
			  stroke="currentColor"
			  fill="none"
			  viewBox="0 0 48 48"
			  aria-hidden="true"
			>
			  <path
			    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
			    strokeWidth={2}
			    strokeLinecap="round"
			    strokeLinejoin="round"
			  />
			</svg>
			<div className="flex text-sm text-gray-600">
			  <label
			    htmlFor="file"
			    className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
			  >
			    <span>Upload a file</span>
			    <input
			      id="file"
			      name="file"
			      type="file"
			      className="sr-only"
			      onChange={(e:any) => setFile(e.target.files)}
			      multiple
			    />
			  </label>
			  <p className="pl-1">or drag and drop</p>
			</div>

			<p className="text-xs text-gray-500">
			  PNG, JPG, GIF up to 10MB
			</p>
		      </div>
		    </div>
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
	setActivity:activityActions.setActivity,
	resetStore:activityActions.resetStore,
	setMetadata:databaseActions.setMetadataFile,
	uploadFile:databaseActions.uploadFile
}

const mapState = (state:RootState) => {
	return {
		currentUser:state.userReducer.currentUser
	}
}

const connector = connect(mapState, mapDispatch)

export default connector(CreateActivity)

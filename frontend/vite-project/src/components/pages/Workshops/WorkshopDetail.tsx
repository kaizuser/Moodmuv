import React, {useEffect} from "react";

//UTILITIES
import { Fade, Slide } from "react-awesome-reveal";
import { RiInstagramLine } from "react-icons/ri";
import { RiFacebookBoxFill } from "react-icons/ri";
import { Link, useParams } from "react-router-dom";
import {connect} from 'react-redux'
import workshopActions from "../../../redux/actions/workshopActions";
import {RootState} from "../../../main";

const WorkshopDetail = (props:any) => {
	let texto = "Avanzado"; //este tiene q venir de la db igual
	let id = useParams().id
	let textColor;

	useEffect(() => {
	  if(props.workshop == undefined){
		  props.fetchWorkshop(id)
	  }
	}, [id])

	switch (texto) {
		case "Iniciación":
		textColor = "text-green-600 bg-green-300 px-1";
		break;
		case "Intermedio":
		textColor = "text-yellow-500 bg-yellow-100 px-1";
		break;
		case "Avanzado":
		textColor = "text-orange-500 bg-orange-300 px-1";
		break;
	}

	return (
		<>
		{
		props.workshop && (
		<div className="relative min-h-screen w-full flex bg-[#f3f3f3] py-8 ">
		<div className="w-[90%] px-12 min-h-full flex flex-col justify-center items-center">
		<Slide className='grayscale shadow-sm rounded-xl h-96 w-full bg-black text-center flex items-center justify-center bg-[url("https://images.unsplash.com/photo-1526718583451-e88ebf774771?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80")] bg-center bg-cover'>
		<h2 className="text-white font-bold text-5xl text-center">
		Title del Workshop
		</h2>
		</Slide>
		<div className=" whitespace-pre-wrap  p-8 shadow-sm rounded-xl bg-white min-h-[20rem] w-full mt-4">
		<h2 className="font-medium text-xl text-[#222222] border-b-4 text-indigo-500 border-indigo-500 w-fit leading-2 mb-2 ">Información</h2>
		<p className="text-md text-[#999]">
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque
		ducimus, voluptatibus praesentium voluptatem, ut culpa reprehenderit
		totam quidem iusto ab nam deserunt debitis atque, repudiandae
		officiis unde labore porro dolorem.Lorem ipsum dolor sit amet
		consectetur adipisicing elit. Itaque ducimus, voluptatibus
		praesentium voluptatem, ut culpa reprehenderit totam quidem iusto ab
		nam deserunt debitis atque, repudiandae officiis unde labore porro
		dolorem.
		</p>
		<hr className="w-full my-4" />
		<h2 className="font-medium text-xl text-[#222222]">Horario</h2>
		<p className="text-md text-[#999]">
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque
		ducimus, voluptatibus praesentium voluptatem, ut culpa reprehenderit
		totam quidem iusto ab nam deserunt debitis atque, repudiandae
		officiis unde labore porro dolorem.Lorem ipsum dolor sit amet
		consectetur adipisicing elit. Itaque ducimus, voluptatibus
		praesentium voluptatem, ut culpa reprehenderit totam quidem iusto ab
		nam deserunt debitis atque, repudiandae officiis unde labore porro
		dolorem.
		</p>
		<hr className="w-full my-4" />
		<h2 className="font-medium text-xl text-[#222222]">Qué necesitas</h2>
		<span style={{whiteSpace: "pre-wrap"}}className="w-full h-full text-md text-[#999]">
		Las herramientas que necesitas para realizar las clases en RecreoBienestar
		-Amor
		-Paciencia
		-Disciplina 

		Elementos: 

		-Mat
		-Pelota de Tenis
		-Ropa Cómoda
		-Libros
		-Toalla de manos o manta 
		</span>
		<hr className="w-full my-4" />
		<h2 className="font-medium text-xl text-[#222222]">Como llegar</h2>
		<p className="text-md text-[#999]">
		Caminando capo
		</p>
		</div>
		</div>
		<div className="sticky top-4 px-8 py-8 flex flex-col items-center mr-12 rounded-xl h-screen w-1/2 grow bg-white">
		<div className="w-full flex justify-between">
		<p className="text-[#999] text-sm w-1/2">
		Workshop dictado por{" "}
		<span className="text-[#000]">Nombre o Escuela</span>
		</p>
		<img
		className="rounded"
		src="https://cdn.domestika.org/ar_1:1,c_fill,dpr_1.0,f_auto,h_48,pg_1,t_base_params,w_48/v1584699954/avatars/000/499/833/499833-original.jpg?1584699954"
		alt=""
		/>
		</div>
		<hr className="w-full my-4" />
		<Fade className="w-full flex flex-col gap-2 text-sm text-[#999] items-start">
		<iframe
		className="w-full h-56 mb-4"
		src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d52540.41689444957!2d-58.5987020377721!3d-34.60982394707292!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb8698cab7fa3%3A0xc4d83fe138c75b6f!2sCaseros%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses-419!2sar!4v1666135328596!5m2!1ses-419!2sar"
		></iframe>
		<div className="flex gap-1">
		<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		strokeWidth={1.5}
		stroke="currentColor"
		className="w-5 h-5"
		>
		<path
		strokeLinecap="round"
		strokeLinejoin="round"
		d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
		/>
		<path
		strokeLinecap="round"
		strokeLinejoin="round"
		d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
		/>
		</svg>
		<p>
		Ubicación:{" "}
		<span className="text-sm text-[#999]">Santiago de Chile</span>
		</p>
		</div>
		<div className="flex gap-1">
		<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		strokeWidth={1.5}
		stroke="currentColor"
		className="w-5 h-5"
		>
		<path
		strokeLinecap="round"
		strokeLinejoin="round"
		d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
		/>
		</svg>
		<p>Formato: Online</p>
		</div>
		<div className="flex gap-1">
		<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		strokeWidth={1.5}
		stroke="currentColor"
		className="w-5 h-5"
		>
		<path
		strokeLinecap="round"
		strokeLinejoin="round"
		d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
		/>
		</svg>

		<p>
		Nivel: <span className={textColor}>{texto}</span>
		</p>
		</div>
		<div className="flex gap-1">
		<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		strokeWidth={1.5}
		stroke="currentColor"
		className="w-5 h-5"
		>
		<path
		strokeLinecap="round"
		strokeLinejoin="round"
		d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
		/>
		</svg>
		<p>+54 11 5013 5178</p>
		</div>
		<div className="flex gap-1">
		<RiInstagramLine className="w-5 h-5" />
		<Link to={'/home'}>Algún ig</Link>
		</div>
		<div className="flex gap-1">
		<RiFacebookBoxFill className="w-5 h-5" />
		<Link to={'/home'}>Algún fb</Link>
		</div>
		</Fade>
		</div>
		</div>

		)
		}
		</>
		

	);
};

const mapDispatch = {
	fetchWorkshop:workshopActions.fetchWorkshop
}

const mapState = (state:RootState) => {
	return {
		workshop:state.workshopReducer.workshop
	}
}

const connector = connect(mapState, mapDispatch)

export default connector(WorkshopDetail)

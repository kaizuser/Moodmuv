import React, {useState, useEffect} from 'react'
import axios from 'axios'

const userPanelDetails = (props:any) => {
	let [fileValue, setFile] = useState('')
	useEffect(() => {
	  async function fetchFile (){
		let file:string | any = await axios({
			method:'get',
			url:'http://localhost:4000/api/files/backgroundImageActivity/' + props.event.activity,
		})
		setFile(file.data)
	  }
	  fetchFile()
	}, [])

	let months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

	return (
	<>
		<div className='flex justify-between items-center rounded-lg bg-cover mx-9 my-9 p-3' style={{'backgroundImage':"url(data:image/png;base64," + fileValue}}>
			<div className='p-2 sm:w-[30rem] sm:h-[10rem] p-0 backdrop-blur-lg rounded-lg flex justify-around items-center sm:flex-row flex-col w-[15rem] h-[12rem]'>
				<div className='flex'>
				    <p className="uppercase font-bold text-white text-sm py-[.1rem]  px-1">{props.event?.title}</p>
				</div>

				<div className='flex flex-col space-y-4'>
					<div className='flex space-x-2'>
					    <p className='font-bold bg-white rounded-full w-12 text-[#222] text-center'>Start</p>
					    <p className='text-white font-bold'>{new Date(props.event?.start).getDay()} de {months[new Date(props.event?.start).getMonth()]} - {new Date(props.event?.start).getHours()}:{new Date(props.event?.start).getMinutes()}:{new Date(props.event?.start).getSeconds()}</p>
					</div>

					<div className='flex space-x-2'>
					    <p className='font-bold bg-white rounded-full w-12 text-[#222] text-center'>End</p>
					    <p className='text-white font-bold'>{new Date(props.event?.end).getDay()} de {months[new Date(props.event?.end).getMonth()]} - {new Date(props.event?.end).getHours()}:{new Date(props.event?.end).getMinutes()}:{new Date(props.event?.end).getSeconds()}</p>
					</div>

					<div className='flex space-x-2 h-[1rem] sm:w-[5rem] sm:items-start sm:justify-start items-center justify-center'>
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-people text-[#222] bg-white rounded-full w-12 mt-[.04rem]" viewBox="0 0 16 16">
						  <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8Zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022ZM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816ZM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z"/>
						</svg>
						<p className='text-white w-auto font-bold'>{props.event.students.length}</p>
					</div>
				</div>

			</div>


		</div>
	</>
	)
}

export default userPanelDetails

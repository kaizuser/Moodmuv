//BASICS
import React, {useRef, useEffect, useState} from 'react'

//UTILITIES 
import {connect} from 'react-redux'
import teacherActions from '../../../redux/actions/teacherActions'
import activityActions from '../../../redux/actions/activityActions'
import Swal from 'sweetalert2'
import { RootState } from '../../../main'
import { useNavigate} from 'react-router-dom'

//UTILITIES CALENDAR
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import DatePicker from 'react-datepicker'
import es_AR from 'date-fns/locale/es'
import PropTypes from 'prop-types'

//CSS 
import 'react-big-calendar/lib/css/react-big-calendar.css'
import "react-datepicker/dist/react-datepicker.css";
import '../../../styles/mediaqueriesCalendar.css'

function ProfileScheduler (props:any) {
	let refe = useRef(null)
	let navigate = useNavigate()
	let [reload, setReload] = useState(false)

	useEffect(() => {
		
		if(!props.teacher){
			props.fetchTeacher(props.id)
		}
	}, [props.id, reload])
/* 	function changeLanguage(){
		if(refe?.current?.children[0]?.children[0]?.childNodes[1]?.innerText?.includes("January")){
			refe?.current?.children[0]?.children[0]?.childNodes[1]?.innerText?.replace("January", "Enero")
			setReload(!reload)
			console.log(reload)
			console.log(refe?.current?.children[0]?.children[0]?.childNodes[1]?.innerText)
	}
} */
//changeLanguage()

	let locales = {
		'es':es_AR
	}

	let localizer = dateFnsLocalizer({format, parse, startOfWeek, getDay, locales})
	return (
		<>
			<div ref={refe} className='w-full p-8 min-h-screen flex justify-center items-center flex-col'>
				<Calendar
					
					localizer={localizer}
					events={props.teacher.events}
					startAccessor={(event:any) => {return new Date(event.start)}}
					endAccessor={(event:any) => {return new Date(event.end)}}
					style={{minHeight:500, width:'100%'}}
					onSelectEvent={async (event) => {

						let activity = await props.fetchActivity(event.activity)

						Swal.fire({
							title:'Información de la actividad',
							html:`<h1>${activity.name}</h1>`,
							showConfirmButton:true,
							confirmButtonText:'Check',
							showDenyButton:true,
							denyButtonText:'Anotarse',
							denyButtonColor:'green',
							showCancelButton:true,
						}).then((result) => {
							if(result.isConfirmed){
								navigate(`/explore/activity/${activity._id}`)
							} else if(result.isDenied){

								let eventData = {
									id:props.currentUser._id,
									event:{id:event._id}
								}

								props.addStudentCalendar(eventData)
							}
						})
					}}
					selectable={true}
					popup
					views={['month','day']}
				/>
			</div>

		</>
	)

}

let mapDispatch = {
	addStudentCalendar:teacherActions.addStudentCalendar,
	fetchTeacher:teacherActions.fetchTeacher,
	fetchActivity:activityActions.fetchActivity
}

let mapState = (state:RootState) => {
	return {
		teacher: state.teacherReducer.teacher,
		currentUser: state.userReducer.currentUser,
		activity:state.activityReducer.activity
	}
}

let connector = connect(mapState, mapDispatch)

export default connector(ProfileScheduler)

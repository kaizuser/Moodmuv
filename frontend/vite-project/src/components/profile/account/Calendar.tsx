//BASICS
import React from 'react'

//UTILITIES 
import {connect} from 'react-redux'
import teacherActions from '../../../redux/actions/teacherActions'
import activityActions from "../../../redux/actions/activityActions";
import userActions from '../../../redux/actions/userActions';
import activityDTO from '../../../types/activityDTO'
import Swal from 'sweetalert2'
import { RootState } from '../../../main'

//UTILITIES CALENDAR
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import es_AR from 'date-fns/locale/es'

//CSS 
import 'react-big-calendar/lib/css/react-big-calendar.css'
import "react-datepicker/dist/react-datepicker.css";
import '../../../styles/mediaqueriesCalendar.css';

class Scheduler extends React.Component <any,any>{
	constructor(props:any){
		super(props)
		this.state = {
			storedEvent:{},
			events:[],
			activities:[]
		}
	}

        componentDidMount(){
		this.props.fetchActivities()
		this.setState({events:this.props.currentUser.events, })
	}

	componentDidUpdate(prevProps:any){

		if(prevProps.currentUser !== this.props.currentUser){
			this.setState({events:this.props.currentUser.events, })
		}

		if(prevProps.activities !== this.props.activities && this.props.currentUser){
			this.setState({activities:this.props.activities.filter((activity:activityDTO) => {return activity?.author?._id == this.props.currentUser._id})})
		}

		let events = document.querySelectorAll(".rbc-event")
		
		/* THIAGO CHUSMEA ESTO */

		/*  for(let event of events) {
			switch(event.type){
				case "Workshop":
					event.className = 'bg-green-400'
					break
				case "Ciclo":
					event.className = 'bg-red-400'
					break
				case "Evento":
				event.className = 'bg-red-400'
				break
			}
		} */
	}

	isValidDate = (date:Date) => {
		return date instanceof Date && !isNaN(date.getTime())
	}

	render(): React.ReactNode {
		let locales = {
			'es':es_AR
		}

		let localizer = dateFnsLocalizer({format, parse, startOfWeek, getDay, locales})

		return (
			<>
				<div className='w-full p-8 min-h-screen flex justify-center items-center flex-col'>
					<Calendar
						localizer={localizer}
						events={this.state.events}
						startAccessor={(event:any) => {return new Date(event.start)}}
						endAccessor={(event:any) => {return new Date(event.end)}}
						style={{minHeight:500, width:'100%'}}
						onSelectEvent={(event) => {
							Swal.fire({
								icon:'question',
								title:'¿Está seguro de eliminar este evento?',
								showConfirmButton:true,
								showCancelButton:true,
							}).then(async (result) => {
								if(result.isConfirmed){
									let eventData = {
										id:this.props.currentUser._id,
										event:{id:event._id}
									}

									await this.props.deleteEventCalendar(eventData)

									this.props.verifyToken(localStorage.getItem('token'))
								}
							})
						}}
						onSelectSlot={async (slot) => {

							if(this.state.activities.length < 1){
								Swal.fire({
									icon:'error',
									title:'Crea una actividad para usar el calendario',
									showConfirmButton:false,
									timer:2000
								})

							} else {
								let activitiesObject:any = {}

								this.state.activities.forEach((activity:activityDTO) => {
									activitiesObject[`${activity._id}`] = activity.name
								})

								await Swal.fire({
									title:'Selecciona la actividad a relacionar',
									input:'select',
									inputOptions:{
										...activitiesObject
									},

									inputPlaceholder:'Selecciona una actividad',
									showCancelButton:true
								}).then(async (resultActivity) => {

									if(resultActivity.isDismissed){
										return
									} else if(resultActivity.value.length < 1){
										Swal.fire({
											icon:'error',
											title:'Elige una actividad',
											showConfirmButton:false,
											timer:2000
										})
									}
									else {
										await Swal.fire({
											title: 'Título del evento',
											input: 'text',
											showCancelButton: true,
											inputPlaceholder:'Título'
										}).then(async (resultTitle) => {
											if(resultTitle.isDismissed){
												return

											} else if (resultTitle.value.length <= 1){
												Swal.fire({
													icon:'error',
													title:'Su título debe tener una o mas letras',
													showConfirmButton:false,
													timer:2000
												})

											} else {
												await Swal.fire({
												  title: 'Hora de inicio',
												  input: 'text',
												  showCancelButton: true,
												  inputPlaceholder:'00:00'
												}).then(async (resultStart) => {

													if(resultStart.isDismissed){
														return

													} else if (!this.isValidDate(new Date(slot.slots[0].toString().slice(0,16) + resultStart.value + ':00 GMT-0300')) || resultStart.value.length < 1){
														Swal.fire({
															icon:'error',
															title:'Formato de tiempo incorrecto',
															showConfirmButton:false,
															timer:2000
														})
													} else {
														await Swal.fire({
														  title: 'Hora de cierre',
														  input: 'text',
														  showCancelButton: true,
														  inputPlaceholder:'00:00'
														}).then((resultEnd) => {
															if(resultEnd.isDismissed){
																return
															} else if (!this.isValidDate(new Date(slot.slots[0].toString().slice(0,16) + resultEnd.value + ':00 GMT-0300')) || resultEnd.value.length < 1){
																Swal.fire({
																	icon:'error',
																	title:'Formato de tiempo incorrecto',
																	showConfirmButton:false,
																	timer:2000
																})

															} else {
																this.setState({storedEvent:{title:resultTitle.value, start:resultStart.value, end:resultEnd.value, activity:resultActivity.value}})
															}
														})
													}

												})

											}
										})

									}
								})


								console.log(this.state.storedEvent)

								if(this.state.storedEvent.title == undefined || this.state.storedEvent.activity == undefined){
									return
								}

								let activity = this.state.activities.filter((activity:activityDTO) => {return activity._id === this.state.storedEvent.activity})

								let eventData = {
									id:this.props.currentUser._id,
									event:{...this.state.storedEvent, start: new Date(slot.slots[0].toString().slice(0,16) + this.state.storedEvent.start + ':00 GMT-0300'), end: new Date( slot.slots[0].toString().slice(0,16) + this.state.storedEvent.end + ':00 GMT-0300'), id:activity[0]._id}
								}


								this.setState({storedEvent:{}})

								await this.props.addEventCalendar(eventData)

								this.props.verifyToken(localStorage.getItem('token'))
							}

						}}
						selectable={true}
						popup
						views={['month','day']}
					/>
				</div>

			</>
		)

	}
}

let mapDispatch = {
	addEventCalendar:teacherActions.addEventCalendar,
	deleteEventCalendar:teacherActions.deleteEventCalendar,
	fetchTeacher:teacherActions.fetchTeacher,
	fetchActivities:activityActions.fetchActivities,
	verifyToken:userActions.verifyToken
}

let mapState = (state:RootState) => {
	return {
		teacher: state.teacherReducer.teacher,
		activities:state.activityReducer.activities,
		currentUser:state.userReducer.currentUser
	}
}

let connector = connect(mapState, mapDispatch)

export default connector(Scheduler)

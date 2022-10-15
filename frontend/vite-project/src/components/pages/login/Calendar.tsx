//BASICS
import React from 'react'

//UTILITIES 
import {connect} from 'react-redux'
import teacherActions from '../../../redux/actions/teacherActions'
import Swal from 'sweetalert2'
import { RootState } from '../../../main'

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

class Scheduler extends React.Component <any,any>{
	constructor(props:any){
		super(props)
		this.state = {
			storedEvent:{} 
		}
	}

	componentDidMount(){
		if(this.props.currentUser){
			this.props.fetchTeacher(this.props.id)
		}
	}

	componentDidUpdate(prevProps:any){
		if(prevProps.teacher !== this.props.teacher){
			this.props.fetchTeacher(this.props.id)
		}
	}

	isValidDate = (date:any) => {
		return date instanceof Date && !isNaN(date)
	}

	render(): React.ReactNode {
		let locales = {
			'es':es_AR
		}

		let localizer = dateFnsLocalizer({format, parse, startOfWeek, getDay, locales})

		return (
			<>
				<div className='w-full h-auto flex justify-center items-center flex-col space-y-12 ml-12 mb-12'>

					<Calendar
						localizer={localizer}
						events={this.props.teacher.events}
						startAccessor={(event:any) => {return new Date(event.start)}}
						endAccessor={(event:any) => {return new Date(event.end)}}
						style={{height:500, width:'80%'}}
						onSelectEvent={(event) => {
							Swal.fire({
								icon:'question',
								title:'¿Está seguro de eliminar este evento?',
								showConfirmButton:true,
								showCancelButton:true,
							}).then((result) => {
								if(result.isConfirmed){
									let eventData = {
										id:this.props.id,
										event:{id:event._id}
									}

									console.log(eventData);

									this.props.deleteEventCalendar(eventData)
								}
							})
						}}
						onSelectSlot={async (slot) => {
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
													this.setState({storedEvent:{title:resultTitle.value, start:resultStart.value, end:resultEnd.value}})
												}
											})
										}

									})

								}
							})

							if(this.state.storedEvent.title == undefined){
								return
							}

							let eventData = {
								id:this.props.id,
								event:{...this.state.storedEvent, start: new Date(slot.slots[0].toString().slice(0,16) + this.state.storedEvent.start + ':00 GMT-0300'), end: new Date( slot.slots[0].toString().slice(0,16) + this.state.storedEvent.end + ':00 GMT-0300')}
							}

							this.setState({storedEvent:{}})

							this.props.addEventCalendar(eventData)

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
	fetchTeacher:teacherActions.fetchTeacher
}

let mapState = (state:RootState) => {
	return {
		teacher: state.teacherReducer.teacher
	}
}

let connector = connect(mapState, mapDispatch)

export default connector(Scheduler)

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

class ProfileScheduler extends React.Component <any,any>{
	constructor(props:any){
		super(props)
		this.state = {
			storedEvent:{} 
		}
	}

	componentDidMount(){
		this.props.fetchTeacher(this.props.id)
	}

	
	render(): React.ReactNode {
		let locales = {
			'es':es_AR
		}

		let localizer = dateFnsLocalizer({format, parse, startOfWeek, getDay, locales})

		return (
			<>
				<div className='w-full min-h-screen flex justify-center items-center flex-col'>

					<Calendar
						localizer={localizer}
						events={this.props.teacher.events}
						startAccessor={(event:any) => {return new Date(event.start)}}
						endAccessor={(event:any) => {return new Date(event.end)}}
						style={{height:500, width:'80%'}}
						onSelectEvent={(event) => {
							Swal.fire({
								icon:'question',
								title:'¿Quiere anotarse a este evento?',
								showConfirmButton:true,
								showCancelButton:true,
							}).then((result) => {
								if(result.isConfirmed){
									
									let eventData = {
										id:this.props.currentUser.id,
										event:{id:event._id}
									}

									this.props.addStudentCalendar(eventData)
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
}

let mapDispatch = {
	addStudentCalendar:teacherActions.addStudentCalendar,
	fetchTeacher:teacherActions.fetchTeacher
}

let mapState = (state:RootState) => {
	return {
		teacher: state.teacherReducer.teacher,
		currentUser: state.userReducer.currentUser
	}
}

let connector = connect(mapState, mapDispatch)

export default connector(ProfileScheduler)

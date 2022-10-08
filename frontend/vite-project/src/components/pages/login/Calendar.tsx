//BASICS
import React from 'react'

//UTILITIES 
import {connect} from 'react-redux'
import studentActions from '../../../redux/actions/studentActions'

//UTILITIES CALENDAR
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import DatePicker from 'react-datepicker'
import es_AR from 'date-fns/locale/es'

//CSS 
import 'react-big-calendar/lib/css/react-big-calendar.css'
import "react-datepicker/dist/react-datepicker.css";

class Scheduler extends React.Component <any, any>{
	constructor(props:any){
		super(props)
		this.state = {
			storedEvent:{} 
		}
	}

	addEvent = () => {
		//ADD POSSIBLE DATA TYPES SOLUTIONS

		let event = {
			id:this.props.userAccount._id,
			events:this.state.storedEvent
		}

		console.log(event);
		
		this.props.modifyStudent(event)
	}

	render(): React.ReactNode {
		let locales = {
			'es':es_AR
		}

		let localizer = dateFnsLocalizer({format, parse, startOfWeek, getDay, locales})

		console.log(this.props);

		return (
			<>
				<div className='w-full h-auto flex justify-center items-center flex-col space-y-12 ml-12 mb-12'>
					<div className='flex justify-around items-center w-4/5'>
						<div className='flex space-x-12'>
							<input 
								className='w-60 placeholder:text-gray-500 bg-gray-300 p-1 rounded-xl text-center' type='text' 
								placeholder='Add title' 
								value={this.state.storedEvent.title}
								onChange={(event) => this.setState({storedEvent:{...this.state.storedEvent, title:event.target.value}})}

							/>

							<div className='w-auto'>
								<DatePicker 
									className='w-60 placeholder:text-gray-500 bg-gray-300 p-1 rounded-xl text-center z-10'
									placeholderText='Start date'
									selected={this.state.storedEvent.start}
									onChange={(event) => this.setState({storedEvent:{...this.state.storedEvent, start:event}})}
								/>
							</div>

							<div className='w-auto'>
								<DatePicker
								className='w-60 placeholder:text-gray-500 bg-gray-300 p-1 rounded-xl text-center z-10 bg-black'
								placeholderText='End date'
								selected={this.state.storedEvent.end}
								onChange={(event) => this.setState({storedEvent:{...this.state.storedEvent, end:event}})}
								/>
							</div>
						</div>


						<button 
							className='w-40 h-8 rounded-xl bg-purple-700 text-white p-1 text-center text-base hover:bg-purple-600 transition duration-300 ease-in' 
							type='button'
							onClick={() => this.addEvent()}

						>Add event</button>

					</div>

					<Calendar
						localizer={localizer}
						events={this.props.userAccount?.events}
						startAccessor='start'
						endAccessor='end'
						style={{height:500, width:'80%'}}
					/>
				</div>

			</>
		)

	}
}

let mapDispatch = {
	modifyStudent:studentActions.modifyStudent
}

let connector = connect(null, mapDispatch)

export default connector(Scheduler)

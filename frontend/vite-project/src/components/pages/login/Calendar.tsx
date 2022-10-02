//BASICS
import React from 'react'

//UTILITIES
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import DatePicker from 'react-date-picker'
import es_AR from 'date-fns/locale/es'
import 'react-big-calendar/lib/css/react-big-calendar.css'

export default class Scheduler extends React.Component <any, any>{
	constructor(props:any){
		super(props)
		this.state = {
			events:  [
				    {
				      title: 'Lunch',
				      start: new Date(2022, 9, 1, 10, 0),
				      end: new Date(2022, 9, 2, 10, 0),
				    },
			],
		}
	}

	render(): React.ReactNode {
		let locales = {
			'es-AR':es_AR
		}

		let localizer = dateFnsLocalizer({format, parse, startOfWeek, getDay, locales})

		return (
			<>
				<Calendar
					localizer={localizer}
					events={this.state.event}
					startAccessor='start'
					endAccessor='end'
					style={{height:500, width:'100%'}}
				/>
			</>
		)

	}
}



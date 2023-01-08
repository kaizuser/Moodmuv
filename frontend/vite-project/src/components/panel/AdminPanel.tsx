
//UTILITIES
import React from "react";
import { RootState } from "../../main";
import { connect } from "react-redux";
import teacherActions from "../../redux/actions/teacherActions";
import studentActions from "../../redux/actions/studentActions";
import activityActions from "../../redux/actions/activityActions";
import databaseActions from '../../redux/actions/databaseActions'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

//TYPES
import teacherDTO from "../../types/teacherDTO";
import studentDTO from "../../types/studentDTO";
import activityDTO from "../../types/activityDTO";;

//CSS
import '../../styles/adminPanel.css'

class AdminPanel extends React.Component <any, any> {
	constructor(props:any){
		super(props)

		this.state = {
			activitiesList:[],
			studentFlag:true,
		}
	}

	async componentDidMount(){
		this.props.fetchTeachers()
		this.props.fetchStudents()
		this.props.fetchActivities()

		if(this.props.teachers && this.props.activities){
			let activities: any = []

			this.props.teachers.map((teacher:teacherDTO, index:number) => {
				activities[index] = []
				this.props.activities.forEach((activity:activityDTO) => {
					if(activity.author._id == teacher._id){
						activities[index].push(activity)
					}
				})

			})

			this.setState({activitiesList:activities})
		}
	}

	componentDidUpdate(prevProps:any){
		if(this.props.activities !== prevProps.activities && this.props.activities && this.props.teachers){
			let activities: any = []

			this.props.teachers.map((teacher:teacherDTO, index:number) => {
				activities[index] = []
				this.props.activities.forEach((activity:activityDTO) => {
					if(activity.author._id == teacher._id){
						activities[index].push(activity)
					}
				})

			})

			this.setState({activitiesList:activities})

		}

		if(this.props.teachers !== prevProps.teachers && this.props.activities && this.props.teachers){
			let activities: any = []

			this.props.teachers.map((teacher:teacherDTO, index:number) => {
				activities[index] = []
				this.props.activities.forEach((activity:activityDTO) => {
					if(activity.author._id == teacher._id){
						activities[index].push(activity)
					}
				})

			})	

			this.setState({activitiesList:activities})
		}

		if(this.props.students !== prevProps.students){
			this.setState({studentFlag:!this.state.studentFlag})
		}
	}

	deleteTeacher = async (id:string, activityList:Array<activityDTO>) => {

		let idList = activityList.map((activity:activityDTO) => activity._id)

		Swal.fire({
			title: 'Estas seguro de eliminar este usuario?',
			showDenyButton: true,
			confirmButtonText: 'Confirmar',
			denyButtonText: `Cancelar`,
		}).then(async(result) => {
			if (result.isConfirmed) {
				await this.props.deleteAllActivitiesPlusImages(id, idList)
				await this.props.deleteTeacher(id)
				this.props.fetchTeachers()

			} else if (result.isDenied) {
				Swal.fire('No se ha efectuado ninguna operación', '', 'info')
			}
		})
	}

	deleteStudent = async (id:string) => {

		Swal.fire({
			title: 'Estas seguro de eliminar este usuario?',
			showDenyButton: true,
			confirmButtonText: 'Confirmar',
			denyButtonText: `Cancelar`,
		}).then(async(result) => {
			if (result.isConfirmed) {
				await this.props.deleteStudent(id)
				this.props.fetchStudents()

			} else if (result.isDenied) {
				Swal.fire('No se ha efectuado ninguna operación', '', 'info')
			}
		})
	}

	deleteActivity = async (id:string) => {

		Swal.fire({
			title: 'Estas seguro de eliminar esta actividad',
			showDenyButton: true,
			confirmButtonText: 'Confirmar',
			denyButtonText: `Cancelar`,
		}).then(async(result) => {
			if (result.isConfirmed) {
				await this.props.deleteActivityImage(id)
				await this.props.deleteActivity(id)
				this.props.fetchActivities()

			} else if (result.isDenied) {
				Swal.fire('No se ha efectuado ninguna operación', '', 'info')
			}
		})
	}

	render(): React.ReactNode {
		return (
			<>
				{this.props.students && this.props.teachers && (
				<div className='flex justify-center items-center flex-col m-2 space-y-5'>
					<form>   
						<label htmlFor="default-search" className="text-sm font-medium text-gray-900 sr-only dark:text-gray-300">Search</label>
						<div className="relative">
						<div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
						    <svg aria-hidden="true" className="w-4 h-4 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
						</div>
							<input type="search" id="default-search" className="py-[.38rem] rounded-md shadow w-96 px-10 placeholder:text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500" placeholder="Search Activities, Disciplines..." required onChange={(e) => {
								this.props.filterTeachers(this.props.teachersAuxiliar, e.target.value)
								this.props.filterStudents(this.props.studentsAuxiliar, e.target.value)
							}}/>
						</div>
					</form>

					<div className='flex sm:items-start sm:justify-center items-center justify-start flex-col sm:flex-row sm:space-x-32 min-h-screen w-[65vw]'>

					<div className='flex items-center justify-center flex-col space-y-5 mt-5 mb-12'>
						<h2 className='font-bold text-4xl text-[#222] border-b-2'>Profesores</h2>
						{this.props.teachers && this.props.teachers.map((teacher:teacherDTO, index:number) => (
							<div className='flex items-center justify-center space-x-3' key={teacher._id}>
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-trash3 hover:text-[#5c4683] transition duration-300 ease-in cursor-pointer" viewBox="0 0 16 16" onClick={() => this.deleteTeacher(teacher._id, this.state.activitiesList[index])}>
								  <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
								</svg>

								<Accordion className='w-48'>
									<AccordionSummary
										expandIcon={<ExpandMoreIcon />}
										aria-controls="panel1a-content"
										id="panel1a-header"
										>
										<Link to={'/explore/profile/' + teacher._id}>
											<Typography className='hover:text-[#5c4683] transition duration-300 ease-in cursor-pointer' onClick={this.props.resetStoreTeachers}>{teacher.name}</Typography>
										</Link>
									</AccordionSummary>

									{this.state.activitiesList[index] && this.state.activitiesList[index].map((activity:activityDTO) => (
										<div className='flex justify-between items-center mb-3 p-2' key={activity._id}>
											<AccordionDetails className='accordion'>
												<Link to={'/explore/activity/' + activity._id}>
													<Typography className='p-0 hover:text-[#5c4683] transition duration-300 ease-in cursor-pointer text-center' onClick={this.props.resetStoreActivities}>{activity.name}</Typography>
												</Link>
											</AccordionDetails>

											<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3 hover:text-[#5c4683] transition duration-300 ease-in cursor-pointer" viewBox="0 0 16 16" onClick={() => this.deleteActivity(activity._id)}>
											  <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
											</svg>
										</div>
									))}

								</Accordion>
							</div>
						))}
					</div>

					<div className='flex items-center justify-center flex-col space-y-5 mt-5'>
						<h2 className='font-bold text-4xl text-[#222] border-b-2'>Estudiantes</h2>

						{this.props.students && this.props.students.map((student:studentDTO) => (
							<div className='flex items-center justify-center space-x-3' key={student._id}>
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-trash3 hover:text-[#5c4683] transition duration-300 ease-in cursor-pointer" viewBox="0 0 16 16" onClick={() => this.deleteStudent(student._id)}>
								  <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
								</svg>
								<Accordion className='w-48'>
									<AccordionSummary
										expandIcon={<ExpandMoreIcon />}
										aria-controls="panel1a-content"
										id="panel1a-header"
										>
										<Typography className='hover:text-[#5c4683] transition duration-300 ease-in cursor-pointer'>{student.name}</Typography>
									</AccordionSummary>

									<AccordionDetails>
										<Typography>
										</Typography>
									</AccordionDetails>
								</Accordion>
							</div>
						))}
					</div>
				</div>				
				</div>

				)}

			</>
		)
	}
}

const mapDispatch = {
	fetchTeachers:teacherActions.fetchTeachers,
	fetchStudents:studentActions.fetchStudents,
	fetchActivities:activityActions.fetchActivities,
	resetStoreTeachers:teacherActions.resetStore,
	resetStoreActivities:activityActions.resetStore,
	resetStoreStudents:studentActions.resetStore,
	deleteTeacher:teacherActions.deleteTeacher,
	deleteStudent:studentActions.deleteStudent,
	deleteActivity:activityActions.deleteActivity,
	filterTeachers:teacherActions.filterTeachers,
	filterStudents:studentActions.filterStudents,
	deleteAllActivitiesPlusImages:databaseActions.deleteAllActivitiesPlusImages,
	deleteActivityImage:databaseActions.deleteActivityImage
}

const mapState = (state:RootState) => {
	return {
		currentUser:state.userReducer.currentUser,
		teachers:state.teacherReducer.teachers,
		students:state.studentReducer.students,
		activities:state.activityReducer.activities,
		teachersAuxiliar:state.teacherReducer.teachersAuxiliar,
		studentsAuxiliar:state.studentReducer.studentsAuxiliar
	}
}

const connector = connect(mapState, mapDispatch)

export default connector(AdminPanel)



//UTILITIES
import type {RootState, AppDispatch} from '../../main'
import Swal from 'sweetalert2'
import axios from 'axios';


//INTERFACES
import teacherDTO from '../../types/teacherDTO'

const teacherActions = {
    
	fetchTeacher: (id:string) => {
		return async(dispatch:AppDispatch, getState:RootState) => {

			const ans = await axios({
				method:'get',
				url:'http://localhost:4000/api/teacher/' + id,
			})

			dispatch({type:'fetchTeacher', payload:ans.data.data})
		}

	},

	fetchTeachers: () => {
		return async(dispatch:AppDispatch, getState:RootState) => {

			const ans = await axios({
				method:'get',
				url:'http://localhost:4000/api/teacher',
			})

			dispatch({type:'fetchTeachers', payload:ans.data.data})
		}
	},

	setTeacher: (teacherData:teacherDTO) => {
		return async(dispatch:AppDispatch,getState:RootState)=>{

			const ans = await axios({
				method:'post',
				url:'http://localhost:4000/api/teacher',
				data:teacherData
			})

		}
	},

	deleteTeacher: (id:string)=>{
		return async(dispatch:AppDispatch, getState:RootState) => {
			const ans = await axios({
				method:'delete',
				url:'http://localhost:4000/api/teacher/' + id,
			})
		}
	},

	modifyTeacher: (teacherData:teacherDTO) => {
		return async(dispatch:AppDispatch, getState:RootState) => {

			Swal.fire({
				title: "Configurando tu información",
				timer: 20000,
				didOpen: () => {
				Swal.showLoading();
				},
				allowOutsideClick: false,
			});

			const ans = await axios({
				method:'put',
				url:'http://localhost:4000/api/teacher',
				data:teacherData,
			})
		}

	},

	//ACCOUNT

	signUpTeacher: (email:string, pass:string, from:string) => {
		return async (dispatch:AppDispatch, getState:RootState) => {

			const ans = await axios({
				method:'post',
				url:'http://localhost:4000/api/auth/signUpTeacher',
				data:{email, pass, from}
			})

			if(ans.data.success){
				Swal.fire({
					icon:"success",
					title:ans.data.message,
					showConfirmButton:false,
					timer:1000
				})

			} else {
				Swal.fire({
					icon:'error',
					title:ans.data.message[0].message,
					showConfirmButton:false,
					timer:3500
				})
			}
		}
	},

	//CALENDAR
	
	addEventCalendar: (eventData:{id:string, event:{title:string, start:Date, end:Date}}) => {
		return async(dispatch:AppDispatch, getState:RootState) => {

			const ans = await axios({
				method:'post',
				url:'http://localhost:4000/api/teacher/calendar',
				data:eventData,
			})

			if(ans.status === 200){
				Swal.fire({
					icon:"success",
					title:'Haz actualizado tu calendario correctamente',
					showConfirmButton:false,
					timer:1000
				})

			} else {
				Swal.fire({
					icon:'error',
					title:'Algo salio mal. Intentalo nuevamente',
					showConfirmButton:false,
					timer:1000
				})
			}
		}
	},

	deleteEventCalendar: (eventData:{id:string, event:{id:string}}) => {
		return async(dispatch:AppDispatch, getState:RootState) => {

			const ans = await axios({
				method:'put',
				url:'http://localhost:4000/api/teacher/calendar',
				data:eventData
			})


			if(ans.status === 200){
				Swal.fire({
					icon:"success",
					title:'Haz borrado tu evento con éxito',
					showConfirmButton:false,
					timer:1000
				})

			} else {
				Swal.fire({
					icon:'error',
					title:'Algo salio mal. Intentalo nuevamente',
					showConfirmButton:false,
					timer:1000
				})
			}
		}
	},

	addStudentCalendar: (eventData:{id:string, event:{id:string}}) => {
		return async(dispatch:AppDispatch, getState:RootState) => {

			const ans = await axios({
				method:'put',
				url:'http://localhost:4000/api/teacher/addStudentCalendar',
				data:eventData
			})

			if(ans.data.success){
				Swal.fire({
					icon:"success",
					title:'Te haz anotado correctamente',
					showConfirmButton:false,
					timer:1000
				})

			} else {
				Swal.fire({
					icon:'error',
					title:'Ya te haz anotado en este evento',
					showConfirmButton:false,
					timer:1000
				})
			}
		}
	},

	//STORE RESET

	resetStore: () => {
		return async (dispatch:AppDispatch, getState:RootState) => {
			dispatch({type:'resetStore'})
		}
	},

	//FILTER FOR ADMIN PANEL
	
	filterTeachers:(teachersAuxiliar:Array<teacherDTO>, searchValue:string) => {
		return async (dispatch:AppDispatch, getState:RootState) => {
			dispatch({type:'filterTeachers', payload:{teachersAuxiliar, searchValue}})
		}
	},

}

export default teacherActions

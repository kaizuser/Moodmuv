import axios from 'axios';

//UTILITIES
import type {RootState, AppDispatch} from '../../main'
import Swal from 'sweetalert2'

//INTERFACES
interface teacherDTO{
	_id:string,
	type:string,
        name:string,
	email:string,
	pass:Array<string>,
        img:string,
	desc:string,
	genre:string,
        ubi:string,
	disciples:Array<string>,
	bornDate:number,
	verifEmail:boolean,
	from:string,
        uniqueString:string,
	num:string,
	events:Array<{title:string, start:Date, end:Date}>
}

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

			const ans = await axios({
				method:'put',
				url:'http://localhost:4000/api/teacher',
				data:teacherData,
			})

			if(ans.status === 200){
				Swal.fire({
					icon:"success",
					title:'Haz configurado tu información correctamente',
					showConfirmButton:false,
					timer:1000
				})

			} else {
				Swal.fire({
					icon:'error',
					title:'Algo salio mal. Intentalo nuevamente',
					showConfirmButton:false,
					timer:2000
				})
			}
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
					title:ans.data.message,
					showConfirmButton:false,
					timer:2000
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
					title:'Haz borrado tu evento con exito',
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
	}
}

export default teacherActions;

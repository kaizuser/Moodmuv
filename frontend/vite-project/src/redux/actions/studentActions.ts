import axios from 'axios';

//UTILITIES
import type {RootState, AppDispatch} from '../../main'
import Swal from 'sweetalert2'

const studentActions = {
    
	fetchStudents: () => {
		return async(dispatch:AppDispatch, getState:RootState) => {

			const ans = await axios({
				method:'get',
				url:'http://localhost:4000/api/student',
			})

			dispatch({type:'fetchStudents', payload:ans.data.data})
	       }
	},

	fetchStudent: (id:string) => {
		return async(dispatch:AppDispatch, getState:RootState) => {

			const ans = await axios({
				method:'get',
				url:'http://localhost:4000/api/student/' + id,
			})

			dispatch({type:'fetchStudent', payload:ans.data.data})
	        }

	},

	modifyStudent: (studentData:any) => {
		return async(dispatch:AppDispatch, getState:RootState) => {

			const ans = await axios({
				method:'put',
				url:'http://localhost:4000/api/student',
				data:studentData,
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

	deleteStudent: (id:string)=>{
		return async(dispatch:AppDispatch, getState:RootState) => {

			const ans = await axios({
				method:'delete',
				url:'http://localhost:4000/api/student/' + id,
			})

		}
	},

	setStudent: (studentData:any) => {
		return async(dispatch:AppDispatch,getState:RootState)=>{

			const ans = await axios({
				method:'post',
				url:'http://localhost:4000/api/student',
				data:studentData
			})

		}
	},

	signInStudent: (email:string, pass:string) => {
		return async (dispatch:AppDispatch, getState:RootState) => {

			const ans = await axios({
				method:'post',
				url:'http://localhost:4000/api/auth/logInStudent',
				data:{email, pass}
			})

			if (ans.data.success){
				localStorage.setItem('token', ans.data.response.token)
				dispatch({type:'currentUser', payload:ans.data.response.studentData.email})

				Swal.fire({
					icon:"success",
					title:'You signed in succesfully',
					showConfirmButton:false,
					timer:1000
				})

				return true

			} else {
				Swal.fire({
					icon:'error',
					title:ans.data.message,
					showConfirmButton:false,
					timer:2000
				})

				return false
			}
		}
	},

	signUpStudent: (email:string, pass:string, from:string) => {
		return async (dispatch:AppDispatch, getState:RootState) => {

			const ans = await axios({
				method:'post',
				url:'http://localhost:4000/api/auth/signUpStudent',
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
}

export default studentActions;

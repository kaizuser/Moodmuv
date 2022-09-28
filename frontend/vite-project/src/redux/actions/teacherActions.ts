import axios from 'axios';

//UTILITIES
import type {RootState, AppDispatch} from '../../main'
import Swal from 'sweetalert2'

const teacherActions = {
    
	fetchTeachers: () => {
		return async(dispatch:AppDispatch, getState:RootState) => {

			const ans = await axios({
				method:'get',
				url:'http://localhost:4000/api/teacher',
			})

			dispatch({type:'fetchTeachers', payload:ans.data})
		}
	},

	fetchTeacher: (id:string) => {
		return async(dispatch:AppDispatch, getState:RootState) => {

			const ans = await axios({
				method:'get',
				url:'http://localhost:4000/api/teacher' + id,
			})

			dispatch({type:'fetchTeacher', payload:ans.data})
		}

	},

	modifyTeacher: (teacherData:any) => {
		return async(dispatch:AppDispatch, getState:RootState) => {

			const ans = await axios({
				method:'put',
				url:'http://localhost:4000/api/teacher',
				data:teacherData,
			})
		}

	},

	deleteTeacher: (id:string)=>{
		return async(dispatch:AppDispatch, getState:RootState) => {

			try {

				const ans = await axios({
					method:'delete',
					url:'http://localhost:4000/api/teacher' + id,
				})

				dispatch({type:'delTeacher', payload:ans.data})

			} catch(err){
				console.log(err)
			}
		}
	},

	setTeacher: (teacherData:any) => {
		return async(dispatch:AppDispatch,getState:RootState)=>{

			const ans = await axios({
				method:'post',
				url:'http://localhost:4000/api/teacher',
				data:teacherData
			})

			dispatch({type:'setTeacher', payload:ans.data})

		}
	},

	signInTeacher: (email:string, pass:string) => {
		return async (dispatch:AppDispatch, getState:RootState) => {

			const ans = await axios({
				method:'post',
				url:'http://localhost:4000/api/auth/logInTeacher',
				data:{email, pass}
			})

			if (ans.data.success){
				localStorage.setItem('token', ans.data.response.token)
				dispatch({type:'currentUser', payload:ans.data.response.userData.email})

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
}

export default teacherActions;

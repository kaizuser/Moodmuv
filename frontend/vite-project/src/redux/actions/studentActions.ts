//UTILITIES
import type {RootState, AppDispatch} from '../../main'
import Swal from 'sweetalert2'
import axios from 'axios';

//INTERFACES
import studentDTO from '../../types/studentDTO'

const studentActions = {
    
	fetchStudent: (id:string) => {
		return async(dispatch:AppDispatch, getState:RootState) => {

			const ans = await axios({
				method:'get',
				url:'http://localhost:4000/api/student/' + id,
			})

			dispatch({type:'fetchStudent', payload:ans.data.data})
	        }

	},

	fetchStudents: () => {
		return async(dispatch:AppDispatch, getState:RootState) => {

			const ans = await axios({
				method:'get',
				url:'http://localhost:4000/api/student',
			})

			dispatch({type:'fetchStudents', payload:ans.data.data})
	       }
	},

	setStudent: (studentData:studentDTO) => {
		return async(dispatch:AppDispatch,getState:RootState)=>{

			const ans = await axios({
				method:'post',
				url:'http://localhost:4000/api/student',
				data:studentData
			})

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

	modifyStudent: (studentData:studentDTO) => {
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
				url:'http://localhost:4000/api/student',
				data:studentData,
			})
	        }

	},

	//ACCOUNT

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
					title:ans.data.message[0].message,
					showConfirmButton:false,
					timer:2000
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
	
	filterStudents:(studentsAuxiliar:Array<studentDTO>, searchValue:string) => {
		return async (dispatch:AppDispatch, getState:RootState) => {
			dispatch({type:'filterStudents', payload:{studentsAuxiliar, searchValue}})
		}
	},
}

export default studentActions;

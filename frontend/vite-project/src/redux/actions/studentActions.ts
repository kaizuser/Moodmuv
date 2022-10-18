import axios from 'axios';

//UTILITIES
import type {RootState, AppDispatch} from '../../main'
import Swal from 'sweetalert2'

//INTERFACES
interface studentDTO{
	_id:string,
	type:string,
        name:string,
	email:string,
	pass:Array<string>,
        img:string,
	desc:string,
	genre:string,
        ubi:string,
	inj:string,
	bornDate:number,
	verifEmail:boolean,
	from:string,
	uniqueString:string,
	num:string,
}

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
					title:ans.data.message,
					showConfirmButton:false,
					timer:2000
				})
			}
		}
	},
}

export default studentActions;

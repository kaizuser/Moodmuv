//UTILITIES
import type {RootState, AppDispatch} from '../../main'
import Swal from 'sweetalert2'
import axios from 'axios';

const userActions = {
	verifyToken: (token:string) => {
		return async (dispatch:AppDispatch, getState:RootState) => {
			const ans = await axios({
				method:'get',
				url:'http://localhost:4000/api/auth/verifyToken',
				headers: {
				    'Authorization': 'Bearer ' + token
				}
			})

			if (ans.data.success){
				dispatch({type:'currentUser', payload:ans.data.response})
			} else {
				localStorage.removeItem('token')
			}
		}
	},

	loginBoth: (email:string, pass:string, from:string) => {
		return async (dispatch:AppDispatch, getState:RootState) => {
			const ans = await axios({
				method:'post',
				url:'http://localhost:4000/api/auth/logInUser',
				data:{email, pass, from}
			})

			if (ans.data.success){
				localStorage.setItem('token', ans.data.response.token)
				dispatch({type:'currentUser', payload:{user:'login'}})

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

	logOut: () => {
		return async (dispatch:AppDispatch, getState:RootState) => {
			localStorage.removeItem('token')

			Swal.fire({
				icon:"success",
				title:'You logged out succesfully',
				showConfirmButton:false,
				timer:1000
			})

			dispatch({ type: 'currentUser', payload: {user:'logout'}});
		}
	},

	//AVATAR FILE

	setMetadata:(metadata:{id:string, type:string}) => {
		return async (dispatch:AppDispatch, getState:RootState) => {
			const ans = await axios({
			  method:'post',
			  url:'http://localhost:4000/api/files/setMetadataFiles',
			  data:{metadata},
			})
		}
	},

	uploadFile:(data:FormData) => {
		return async (dispatch:AppDispatch, getState:RootState) => {
			const ans = await axios({
				method:'post',
				url:'http://localhost:4000/api/files/upload',
				data:data,
				headers: { "Content-Type": "multipart/form-data"}
			})
		
		}
	}
}

export default userActions

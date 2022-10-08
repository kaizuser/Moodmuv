import axios from 'axios';

//UTILITIES
import type {RootState, AppDispatch} from '../../main'
import Swal from 'sweetalert2'

const userActions = {
	login_both: (email:string, pass:string) => {
		return async (dispatch:AppDispatch, getState:RootState) => {
			const ans = await axios({
				method:'post',
				url:'http://localhost:4000/api/auth/logInUser',
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
	}
}

export default userActions

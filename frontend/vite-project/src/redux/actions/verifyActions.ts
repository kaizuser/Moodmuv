import axios from 'axios';

import type {RootState, AppDispatch} from '../../main'


const verifyActions = {
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
	}
}

export default verifyActions

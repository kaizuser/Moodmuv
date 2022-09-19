import {current} from '@reduxjs/toolkit';
import axios from 'axios';

import type {RootState, AppDispatch} from '../../main'

const userActions = {
    
	fetchUsers: () => {
		return async(dispatch:AppDispatch, getState:RootState) => {

			const ans = await axios({
				method:'get',
				url:'http://localhost:4000/api/user',
			})

			dispatch({type:'fetchUsers', payload:ans.data.data})
	       }
	},

	fetchUser: (id:string) => {
		return async(dispatch:AppDispatch, getState:RootState) => {

			const ans = await axios({
				method:'get',
				url:'http://localhost:4000/api/user' + id,
			})

			dispatch({type:'fetchUser', payload:ans.data})

	        }

	},

	modifyUser: (id:string, userObject:[number, string]) => {
		return async(dispatch:AppDispatch, getState:RootState) => {

			const ans = await axios({
				method:'put',
				url:'http://localhost:4000/api/user' + id,
				data:userObject,
			})

	        }

	},

	deleteUser: (id:string)=>{
		return async(dispatch:AppDispatch, getState:RootState) => {

			const ans = await axios({
				method:'delete',
				url:'http://localhost:4000/api/user' + id,
			})

		}
	},

	setUser: (userObject:[number, string]) => {
		return async(dispatch:AppDispatch,getState:RootState)=>{

			const ans = await axios({
				method:'post',
				url:'http://localhost:4000/api/user',
				data:userObject
			})

		}
	},

	signInUser: (email:string, pass:string) => {
		return async (dispatch:AppDispatch, getState:RootState) => {

			const ans = await axios({
				method:'post',
				url:'http://localhost:4000/api/auth/logInUser',
				data:{email, pass}
			})

			if (ans.data.success){
				localStorage.setItem('token', ans.data.response.token)
				dispatch({type:'currentUser', payload:ans.data.response.userData.email})

				return true
			} else {
				return false
			}

		}
	},

	signUpUser: (email:string, pass:string, from:string) => {
		return async (dispatch:AppDispatch, getState:RootState) => {

			const ans = await axios({
				method:'post',
				url:'http://localhost:4000/api/auth/signUpUser',
				data:{email, pass, from}
			})

			console.log(ans)

			if(ans.data.success){

			} else {

			}

		}
	},

	verifyTokenUser: (token:string) => {
		return async (dispatch:AppDispatch, getState:RootState) => {

			const ans = await axios({
				method:'get',
				url:'http://localhost:4000/api/auth/verifyTokenUser',
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

export default userActions;

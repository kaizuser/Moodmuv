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

		dispatch({type:'modifyUser', payload:ans.data})
	    }

    },

    deleteUser: (id:string)=>{
	return async(dispatch:AppDispatch, getState:RootState) => {

		try {

			const ans = await axios({
				method:'delete',
				url:'http://localhost:4000/api/user' + id,
			})

			dispatch({type:'delUser', payload:ans.data})

		} catch(err){
			console.log(err)
		}
	}
    },

    setUser: (userObject:[number, string]) => {
	return async(dispatch:AppDispatch,getState:RootState)=>{

		const ans = await axios({
			method:'post',
			url:'http://localhost:4000/api/user',
			data:userObject
		})

		dispatch({type:'setUser', payload:ans.data})

        }
    }

}

export default userActions;

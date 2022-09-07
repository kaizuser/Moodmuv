import axios from 'axios';

import type {RootState, AppDispatch} from '../../main'

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

    modifyTeacher: (id:string, teacherObject:[number, string]) => {
	return async(dispatch:AppDispatch, getState:RootState) => {

		const ans = await axios({
			method:'put',
			url:'http://localhost:4000/api/teacher' + id,
			data:teacherObject,
		})

		dispatch({type:'modifyTeacher', payload:ans.data})
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

    setTeacher: (teacherObject:[number, string]) => {
	return async(dispatch:AppDispatch,getState:RootState)=>{

		const ans = await axios({
			method:'post',
			url:'http://localhost:4000/api/teacher',
			data:teacherObject
		})

		dispatch({type:'setTeacher', payload:ans.data})

        }
    }

}

export default teacherActions;

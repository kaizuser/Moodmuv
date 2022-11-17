//UTILITIES
import type {RootState, AppDispatch} from '../../main'
import Swal from 'sweetalert2'
import axios from 'axios';

//INTERFACES
import activityDTO from '../../types/activityDTO'

const activityActions = {
    
	fetchActivity: (id:string) => {
		return async(dispatch:AppDispatch, getState:RootState) => {

			const ans = await axios({
				method:'get',
				url:'http://localhost:4000/api/activity/' + id,
			})

			dispatch({type:'fetchActivity', payload:ans.data.data})

			return ans.data.data
	        }

	},

	fetchActivities: () => {
		return async(dispatch:AppDispatch, getState:RootState) => {

			const ans = await axios({
				method:'get',
				url:'http://localhost:4000/api/activity',
			})

			dispatch({type:'fetchActivities', payload:ans.data.data})
	       }
	},

	setActivity: (activityData:activityDTO) => {
		return async(dispatch:AppDispatch,getState:RootState)=>{

			const ans = await axios({
				method:'post',
				url:'http://localhost:4000/api/activity',
				data:activityData
			})

			return ans.data.data

		}
	},

	deleteActivity: (id:string)=>{
		return async(dispatch:AppDispatch, getState:RootState) => {

			const ans = await axios({
				method:'delete',
				url:'http://localhost:4000/api/activity/' + id,
			})

		}
	},

	modifyActivity: (activityData:activityDTO) => {
		return async(dispatch:AppDispatch, getState:RootState) => {

			const ans = await axios({
				method:'put',
				url:'http://localhost:4000/api/activity',
				data:activityData,
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

	filterActivity:(activitiesAuxiliar:activityDTO, searchValue:string, disciplesValue:string, formatValue:string) => {
		return async (dispatch:AppDispatch, getState:RootState) => {
			dispatch({type:'filterActivities', payload:{activitiesAuxiliar, searchValue, disciplesValue, formatValue}})
		}
	},

	//STORE RESET

	resetStore: () => {
		return async (dispatch:AppDispatch, getState:RootState) => {
			dispatch({type:'resetStore'})
		}
	},


}

export default activityActions

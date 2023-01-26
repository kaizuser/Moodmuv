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

			Swal.fire({
				title: 'Creando tu actividad',
				timer: 20000,
				didOpen: () => {
				Swal.showLoading()
				},
				allowOutsideClick: false
			})

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
	        }

	},

	filterActivity:(activitiesAuxiliar:Array<activityDTO>, searchValue:string, disciplesValue:string, formatValue:string, typeValue:string) => {
		return async (dispatch:AppDispatch, getState:RootState) => {
			dispatch({type:'filterActivities', payload:{activitiesAuxiliar, searchValue, disciplesValue, formatValue, typeValue}})
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

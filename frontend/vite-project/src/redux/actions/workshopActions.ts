import axios from 'axios';

//UTILITIES
import type {RootState, AppDispatch} from '../../main'
import Swal from 'sweetalert2'

const workshopActions = {
    
	fetchWorkshops: () => {
		return async(dispatch:AppDispatch, getState:RootState) => {

			const ans = await axios({
				method:'get',
				url:'http://localhost:4000/api/workshop',
			})

			dispatch({type:'fetchWorkshops', payload:ans.data.data})
	       }
	},

	fetchWorkshop: (id:string) => {
		return async(dispatch:AppDispatch, getState:RootState) => {

			const ans = await axios({
				method:'get',
				url:'http://localhost:4000/api/workshop/' + id,
			})

			dispatch({type:'fetchWorkshop', payload:ans.data.data})
	        }

	},

	modifyWorkshop: (workshopData:any) => {
		return async(dispatch:AppDispatch, getState:RootState) => {

			const ans = await axios({
				method:'put',
				url:'http://localhost:4000/api/workshop',
				data:workshopData,
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

	deleteWorkshop: (id:string)=>{
		return async(dispatch:AppDispatch, getState:RootState) => {

			const ans = await axios({
				method:'delete',
				url:'http://localhost:4000/api/workshop/' + id,
			})

		}
	},

	setWorkshop: (workshopData:any) => {
		return async(dispatch:AppDispatch,getState:RootState)=>{

			const ans = await axios({
				method:'post',
				url:'http://localhost:4000/api/workshop',
				data:workshopData
			})

		}
	},

}

export default workshopActions

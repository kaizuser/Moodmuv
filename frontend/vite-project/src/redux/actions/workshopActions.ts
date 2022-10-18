import axios from 'axios';

//UTILITIES
import type {RootState, AppDispatch} from '../../main'
import Swal from 'sweetalert2'

//INTERFACES
interface workshopDTO{
	_id:string,
	author:string,
	name:string,
	format:string,
	level:string,
	desc:string,
	disciples: Array<string>,
	duration:string,
	video:Array<{url:string}>,
	price:string,
	location:string,
}

const workshopActions = {
    
	fetchWorkshop: (id:string) => {
		return async(dispatch:AppDispatch, getState:RootState) => {

			const ans = await axios({
				method:'get',
				url:'http://localhost:4000/api/workshop/' + id,
			})

			dispatch({type:'fetchWorkshop', payload:ans.data.data})
	        }

	},

	fetchWorkshops: () => {
		return async(dispatch:AppDispatch, getState:RootState) => {

			const ans = await axios({
				method:'get',
				url:'http://localhost:4000/api/workshop',
			})

			dispatch({type:'fetchWorkshops', payload:ans.data.data})
	       }
	},

	setWorkshop: (workshopData:workshopDTO) => {
		return async(dispatch:AppDispatch,getState:RootState)=>{

			const ans = await axios({
				method:'post',
				url:'http://localhost:4000/api/workshop',
				data:workshopData
			})

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

	modifyWorkshop: (workshopData:workshopDTO) => {
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

	filterWorkshop:(workshopsAuxiliar:workshopDTO, searchValue:string, disciplesValue:string, formatValue:string) => {
		return async (dispatch:AppDispatch, getState:RootState) => {
			dispatch({type:'filterWorkshops', payload:{workshopsAuxiliar, searchValue, disciplesValue, formatValue}})
		}
	}

}

export default workshopActions

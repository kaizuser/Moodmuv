//UTILITIES
import type {RootState, AppDispatch} from '../../main'
import Swal from 'sweetalert2'
import axios from 'axios';

const userActions = {
	//VIDEOS
	setMetadataVideo:(id:string) => {
		return async (dispatch:AppDispatch, getState:RootState) => {

			Swal.fire({
				title: 'Subiendo tu video',
				timer: 20000,
				didOpen: () => {
				Swal.showLoading()
				},
				allowOutsideClick: false
			})

			try {
				const ans = await axios({
					method:'post',
					url:'http://localhost:4000/api/videos/setMetadataVideos',
					data:{id},

					})

			} catch(error){
				//pass
			}
		}
	},

	uploadVideo:(data:FormData) => {
		return async (dispatch:AppDispatch, getState:RootState) => {
			try {
				const ans = await axios({
					method:'post',
					url:'http://localhost:4000/api/videos/upload',
					data:data,
					headers: { "Content-Type": "multipart/form-data"}
				})

				if(ans.data.success){
					Swal.close()

					await Swal.fire({
						icon:"success",
						title:'Haz subido tu video correctamente',
						showConfirmButton:false,
						timer:1000
					})

				} else {
					Swal.close()

					Swal.fire({
						icon:'error',
						title:'Algo salio mal. Intentalo nuevamente',
						showConfirmButton:false,
						timer:2000
					})
				}

			} catch(error){
				//pass
			}
		}
	},

	//AVATAR FILE
	setMetadataFile:(metadata:{id:string, type:string}) => {
		return async (dispatch:AppDispatch, getState:RootState) => {
			try {
				const ans = await axios({
				  method:'post',
				  url:'http://localhost:4000/api/files/setMetadataFiles',
				  data:{metadata},
				})

			} catch(error){
				//pass
			}
		}
	},

	uploadFile:(data:FormData, id:string) => {
		return async (dispatch:AppDispatch, getState:RootState) => {
			try {
				const ans = await axios({
					method:'post',
					url:'http://localhost:4000/api/files/upload/' + id,
					data:data,
					headers: { "Content-Type": "multipart/form-data"}
				})


				if(ans.data.success){
					Swal.close()

					await Swal.fire({
						icon:"success",
						title:'Haz configurado tu actividad correctamente',
						showConfirmButton:false,
						timer:1000
					})

				} else {
					Swal.close()

					Swal.fire({
						icon:'error',
						title:'Algo salio mal. Intentalo nuevamente',
						showConfirmButton:false,
						timer:2000
					})
				}

			} catch(error){
				//pass
			}
		}
	}
}

export default userActions

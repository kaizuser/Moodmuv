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

	uploadVideo:(data:FormData, videosLength:number) => {
		return async (dispatch:AppDispatch, getState:RootState) => {
			if(videosLength <= 2){
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
			} else {
				Swal.fire({
					icon:'error',
					title:'Haz excedido tu limite de videos',
					showConfirmButton:false,
					timer:2000
				})
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
	},

	deleteAllActivitiesPlusImages:(id:string, idList:Array<string>) => {
		return async (dispatch:AppDispatch, getState:RootState) => {
			const ans = await axios({
				method:'delete',
				url:'http://localhost:4000/api/deleteAllActivitiesPlusImages/' + id,
				data:{idList}
			})

			if(ans.data.success){

			}
		}
	},

	deleteActivityImage:(id:string) => {
		return async (dispatch:AppDispatch, getState:RootState) => {
			const ans = await axios({
				method:'delete',
				url:'http://localhost:4000/api/deleteActivityImage/' + id,
			})

			if(ans.data.success){

			}
		}
	},

	deleteVideo:(id:string) => {
		return async (dispatch:AppDispatch, getState:RootState) => {
			const ans = await axios({
				method:'delete',
				url:'http://localhost:4000/api/videos/' + id,
			})

			if(ans.data.success){

			}
		}
	}
}

export default userActions

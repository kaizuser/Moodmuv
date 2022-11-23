//UTILITIES
import type {RootState, AppDispatch} from '../../main'
import Swal from 'sweetalert2'
import axios from 'axios';

const userActions = {

	//AVATAR FILE
	setMetadata:(metadata:{id:string, type:string}) => {
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
			} catch(error){
				//pass
			}
		}
	}
}

export default userActions

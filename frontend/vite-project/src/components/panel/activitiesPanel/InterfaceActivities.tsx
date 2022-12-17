import React from 'react'
import axios from 'axios'

class interfaceActivities extends React.Component <any, any>{
	constructor(props:any){
		super(props)
		this.state = {
			file:[]
		}
	}

	uploadTest = async(e:any) => {
		let id = 'god'
		let data = new FormData()

		for(let i=0; i<this.state.file.length; i++){
		  data.append('file', this.state.file[i])
		}

		await axios.all([
		  axios({
			  method:'post',
			  url:'http://localhost:4000/api/videos/setMetadataVideos',
			  data:{id},
		  }),

		  axios({
			  method:'post',
			  url:'http://localhost:4000/api/videos/upload',
			  data:data,
			  headers: { "Content-Type": "multipart/form-data"}
		  }),

		])
	}

	render(): React.ReactNode {
		return (
			<>

			</>
		)
	}

}



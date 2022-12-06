//BASICS
import React from 'react'

//UTILITIES
import databaseActions from '../../../redux/actions/databaseActions'
import {connect} from 'react-redux'
import { RootState } from '../../../main';
import axios from 'axios';



class VideosInterface extends React.Component <any, any> {
	constructor(props:any){
		super(props)
		this.state = {
			file:undefined,
			data:undefined
		}

		this.uploadVideo = this.uploadVideo.bind(this)
	}

	componentDidMount(){
		let fetchFile = async () => {
			let file:string | any = await axios({
				method:'get',
				url:'http://localhost:4000/api/videos/' + this.props.currentUser?._id,
			})

			this.setState({data:file.data})
		  }

		  fetchFile()
	}

	uploadVideo(){
		let data = new FormData()

		console.log(this.state.file)

		data.append('file', this.state.file[0])

		let id=this.props.currentUser._id

		this.props.setMetadata(id)

		setTimeout(() => {
			this.props.uploadVideo(data)

		}, 500)
	}

	render(): React.ReactNode {
		console.log(this.state.data)
		return (

			<div className='py-5'>
			    <label className="block text-sm font-medium text-gray-700">
			    </label>
			    <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
			      <div className="space-y-1 text-center">
				<svg
				  className="mx-auto h-12 w-12 text-gray-400"
				  stroke="currentColor"
				  fill="none"
				  viewBox="0 0 48 48"
				  aria-hidden="true"
				>
				  <path
				    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
				    strokeWidth={2}
				    strokeLinecap="round"
				    strokeLinejoin="round"
				  />
				</svg>
				<div className="flex text-sm text-gray-600">
				  <label
				    htmlFor="file"
				    className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
				  >
				    <span>Upload a file</span>
				    <input
				      id="file"
				      name="file"
				      type="file"
				      className="sr-only"
					    onChange={(e:any) => this.setState({file:e.target.files})}
				      multiple
				    />
				  </label>
				  <p className="pl-1">or drag and drop</p>
				</div>

				<p className="text-xs text-gray-500">
				  PNG, JPG, GIF up to 10MB
				</p>

			      <button className='w-20 h-4 bg-red-500 border-black border-2' onClick={this.uploadVideo}>Submit</button>
			      </div>
			    </div>

				{
					this.state.data && (
					<video src={`data:video/mp4;base64,${this.state.data}`} controls></video>

					)
				}			  </div>

		)
	}
}

let mapDispatch = {
  setMetadata: databaseActions.setMetadataVideo,
  uploadVideo: databaseActions.uploadVideo
};

let mapState = (state: RootState) => {
	return {
		currentUser:state.userReducer.currentUser
	};
};

let connector = connect(mapState, mapDispatch);

export default connector(VideosInterface);

import React, {useEffect} from "react";

//COMPONENTS
import SelectDisciples from "./SelectDisciples";
import SelectFormat from './SelectFormat'
import CardExplore from './CardExplore'
import Search from "./Search";

//UTILITIES
import {connect} from 'react-redux'
import teacherActions from "../../../redux/actions/teacherActions"
import workshopActions from "../../../redux/actions/workshopActions";
import { RootState } from "../../../main";
import { Link } from "react-router-dom";

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

class Explore extends React.Component <any, any>{

	constructor(props:any){
		super(props)
		this.state = {
			search:'',
			disciples:'',
			format:''
		}

	}

	componentDidMount(){
		this.props.fetchTeachers()
		this.props.fetchWorkshops()
	}

	setParameters = (value:string, camp:string) => {

		if(camp == 'search'){
			this.setState({search:value})
		} else if (camp == 'disciples'){
			this.setState({disciples:value})
		} else {
			this.setState({format:value})
		}
		
	}

	render(): React.ReactNode {

		return (

		<div className="w-full h-screen">
		<div className="min-h-12 w-full flex gap-4 p-4 px-8 shadow-md m-1">
			<div className='w-[55%] flex justify-center items-center gap-4'>
				<Search setParameters={this.setParameters} parameters={[this.state.search, this.state.disciples, this.state.format]}/>
				<SelectDisciples setParameters={this.setParameters} parameters={[this.state.search, this.state.disciples, this.state.format]}/>
				<SelectFormat setParameters={this.setParameters} parameters={[this.state.search, this.state.disciples, this.state.format]}/>
			</div>
		</div>
		<div className="flex w-100">
			<div className="w-4/6 px-4 h-screen bg-[#F3F3F3] flex flex-wrap gap-4 justify-center overflow-scroll p-4">
				{this.props.workshops ? this.props.workshops.map((workshop:workshopDTO) => (
				<div className="max-w-xs rounded overflow-hidden shadow-lg" key={workshop._id}>
					<img className="w-full h-44 object-cover" src="https://algarabia.com/wp-content/uploads/2017/05/El-texto-del-pa%CC%81rrafo-36.jpg" alt="Sunset in the mountains"/>
					<div className="flex justify-between items-center px-6 py-4">
						<div>
							<div className="font-bold text-xl mb-2">{workshop.name}</div>
							<p className="text-gray-700 text-base">
							{workshop.desc}
							</p>
						</div>

						<div className='flex w-full justify-end text-start text-gray-700 text-base text-xs pb-2 w-auto h-auto'>
							<p>1 week ago</p>
						</div>

					</div>
					
					<div className='flex justify-between items-center m-4'>
					<div className='flex gap-2  items-center text-xs text-[#007AE9] font-bold cursor-pointer'>
					<Link to={'/explore/profile/' + workshop.author}>

					<img className="object-cover rounded-full w-8 h-8" src="https://i.pinimg.com/originals/86/08/70/860870066df05a7a29bcb5bb9ea2e9a7.jpg" alt="imagen" />
					</Link>
					</div>
					<Link to={'/explore/workshop/' + workshop._id}>
						<p className='text-[#007AE9] text-xs cursor-pointer'>Ver mas</p>
					</Link>
					</div>
				</div>
				)) : ''}
			</div>
			<div className="w-3/6 h-screen bg-[#222]">
			aca va el mapa
			</div>
		</div>
		</div>
		);	
	}


};

const mapDispatch = {
	fetchTeachers:teacherActions.fetchTeachers,
	fetchWorkshops:workshopActions.fetchWorkshops
}

const mapState = (state:RootState) => {
	return {
		teachers:state.teacherReducer.teachers,
		workshops:state.workshopReducer.workshops
	}
}

const connector = connect(mapState, mapDispatch)

export default connector(Explore)


import React, {useEffect} from "react";

//COMPONENTS
import SelectDisciples from "./SelectDisciples";
import SelectFormat from './SelectFormat'
import CardExplore from './CardExplore'
import Search from "./Search";
import '../../../styles/mediaqueriesExplore.css'
//UTILITIES
import {connect} from 'react-redux'
import teacherActions from "../../../redux/actions/teacherActions"
import activityActions from "../../../redux/actions/activityActions";
import { RootState } from "../../../main";
import { Link } from "react-router-dom";

//INTERFACES
import activityDTO from "../../../types/activityDTO";

class Explore extends React.Component <any, any>{

	constructor(props:any){
		super(props)
		this.state = {
			search:'',
			disciples:'',
			format:'',
			activities:[]
		}

	}

	componentDidMount(){
		this.props.fetchTeachers()
		this.props.fetchActivities()
	}

	componentDidUpdate(prevProps:any){
		if(prevProps.activities !== this.props.activities){
			this.setState({activities:this.props.activities.filter((activity:activityDTO) => {return activity.type === 'class'})})

		}
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
		<div className="w-full min-h-screen">
		<div className="relative min-h-12 w-full flex flex-col gap-4 p-4 px-8 shadow-md justify-center items-center">
			<img className="w-full h-56 object-cover h-full pointer-events-none" src="https://images.ctfassets.net/ew96z4wsnz93/43E3JISXM59HIQwfm6C0DX/03081ce4d57b8e5856c1396522c4c1d1/CRO_CustomisableMembershipsModule_2x.png" alt="" />
				<h1 className="drop-shadow-md text-4xl pointer-events-none font-bold text-white absolute">Explorar</h1>
			<div className='-bottom-4 w-fit flex justify-center items-center flex-wrap gap-4'>
				<Search setParameters={this.setParameters} parameters={[this.state.search, this.state.disciples, this.state.format]}/>
				<SelectDisciples setParameters={this.setParameters} parameters={[this.state.search, this.state.disciples, this.state.format]}/>
				<SelectFormat setParameters={this.setParameters} parameters={[this.state.search, this.state.disciples, this.state.format]}/>
			</div>
		</div>
		<div className="flex w-full">
			<div className="cartas w-4/6 px-4 overflow-x-hidden h-screen bg-[#F3F3F3] flex flex-wrap gap-4 justify-center items-start overflow-scroll p-4">
				{this.state.activities ? this.state.activities.map((activity:activityDTO) => (
				<div className="w-[13rem] min-h-[25rem] rounded overflow-hidden shadow-lg" key={activity._id}>
					<img className="w-full h-44 object-cover" src="https://algarabia.com/wp-content/uploads/2017/05/El-texto-del-pa%CC%81rrafo-36.jpg" alt="Sunset in the mountains"/>
					<div className="flex justify-between items-center px-6 py-4">
						<div>
							<div className="font-bold text-xl mb-2">{activity.name}</div>
							<p className="text-gray-700 text-base">
							{activity.desc}
							</p>
						</div>

						<div className='flex w-full justify-end text-start text-gray-700 text-base text-xs pb-2 w-auto h-auto'>
							<p>1 week ago</p>
						</div>

					</div>
					
					<div className='flex justify-between items-center m-4 self-end content-end'>
					<div className='flex gap-2  items-center text-xs text-[#007AE9] font-bold cursor-pointer'>
					<Link to={'/explore/profile/' + activity.author}>

					<img className="object-cover rounded-full w-8 h-8" src="https://i.pinimg.com/originals/86/08/70/860870066df05a7a29bcb5bb9ea2e9a7.jpg" alt="imagen" />
					</Link>
					</div>
					<Link to={'/explore/activity/' + activity._id}>
						<p className='text-[#007AE9] text-xs cursor-pointer'>Ver mas</p>
					</Link>
					</div>
				</div>
				)) : ''}
			</div>
			<div className="w-3/6 h-screen bg-[#222] mapita">
			<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d268123.79887572123!2d11.08380360310596!3d43.83418004934677!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x132a5403bfe22ff5%3A0x5591438487aaf1f5!2sCatedral%20de%20Santa%20Mar%C3%ADa%20del%20Fiore!5e0!3m2!1ses-419!2sar!4v1667691210849!5m2!1ses-419!2sar" className="w-full h-full">

			</iframe>
			</div>
		</div>
		</div>
		);	
	}


};

const mapDispatch = {
	fetchTeachers:teacherActions.fetchTeachers,
	fetchActivities:activityActions.fetchActivities
}

const mapState = (state:RootState) => {
	return {
		teachers:state.teacherReducer.teachers,
		activities:state.activityReducer.activities
	}
}

const connector = connect(mapState, mapDispatch)

export default connector(Explore)


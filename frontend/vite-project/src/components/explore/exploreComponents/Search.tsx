import React from "react";

//UTILITIES
import activityActions from "../../../redux/actions/activityActions";
import {connect} from "react-redux";
import { RootState } from "../../../main";
//STYLES
import '../../../styles/mediaqueriesExplore.css'
function Search(props:any){


	return (
		<form>   
		    <label htmlFor="default-search" className="text-sm font-medium text-gray-900 sr-only dark:text-gray-300">Search</label>
		    <div className="relative">
			<div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
			    <svg aria-hidden="true" className="w-4 h-4 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
			</div>
			    <input type="search" id="default-search" className="py-[.38rem] rounded-md shadow w-96 px-10 placeholder:text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500" placeholder="Search Activities, Disciplines..." required onChange={(event) => {
			    props.setParameters(event.target.value, 'search')
			    props.filterActivity(props.activitiesAuxiliar, event.target.value, props.parameters[1], props.parameters[2], props.parameters[3])
			    }}/>
		    </div>
		</form>
	)
}

const mapDispatch = {
	filterActivity:activityActions.filterActivity
}

const mapState = (state:RootState) => {
	return {
		activitiesAuxiliar:state.activityReducer.activitiesAuxiliar
	}
}

const connector = connect(mapState, mapDispatch)

export default connector(Search)

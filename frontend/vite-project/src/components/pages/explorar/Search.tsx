import React from "react";

//UTILITIES
import workshopActions from "../../../redux/actions/workshopActions";
import {connect} from "react-redux";
import { RootState } from "../../../main";

function Search(props:any){


	return (
		<form>   
		    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">Search</label>
		    <div className="relative">
			<div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
			    <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
			</div>
			    <input type="search" id="default-search" className="block p-4 pl-10 w-[500px] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..." required onChange={(event) => {
			    props.setParameters(event.target.value, 'search')
			    props.filterWorkshop(props.workshopsAuxiliar, event.target.value, props.parameters[1], props.parameters[2])
			    }}/>
			<button type="submit" className="hover:bg-gradient-to-r hover:from-[#443166] hover:to-[#59457B] bg-gradient-to-r from-[#563D81] to-[#6E5E8B] text-white absolute right-2.5 bottom-2.5 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2">Search</button>
		    </div>
		</form>
	)
}

const mapDispatch = {
	filterWorkshop:workshopActions.filterWorkshop
}

const mapState = (state:RootState) => {
	return {
		workshopsAuxiliar:state.workshopReducer.workshopsAuxiliar
	}
}

const connector = connect(mapState, mapDispatch)

export default connector(Search)

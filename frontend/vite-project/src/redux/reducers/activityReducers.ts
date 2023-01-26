
//INTERFACES
import activityDTO from "../../types/activityDTO"

const initialState = {
    activity: null,
    activities:null,
    activitiesAuxiliar:null,
}

const activityReducer = (state = initialState, action:any) => {
    switch (action.type) {
	case 'fetchActivity':
		return {
			...state,
			activity: action.payload,   
		}

	case 'fetchActivities':
		return{
			...state,
			activities:action.payload,
			activitiesAuxiliar:action.payload
		}

	case 'filterActivities':
		let filteredData = action.payload.activitiesAuxiliar.filter((data:activityDTO) => data.name.toLowerCase().startsWith(action.payload.searchValue.toLowerCase().trim()))

		if (action.payload.disciplesValue !== '' && action.payload.disciplesValue !== 'Todos'){
			filteredData = filteredData.filter((data:activityDTO) => data.disciples.includes(action.payload.disciplesValue))
		} 

		if (action.payload.formatValue !== '' && action.payload.formatValue !== 'Todos'){
			filteredData = filteredData.filter((data:activityDTO) => data.format == action.payload.formatValue)
		}

		if (action.payload.typeValue !== '' && action.payload.typeValue !== 'Todos'){
			filteredData = filteredData.filter((data:activityDTO) => data.type == action.payload.typeValue)
		} 

		return {
			...state,
			activities:[...filteredData]
		}

	case 'resetStore':
		return initialState


        default:
            return state
    }
}

export default activityReducer

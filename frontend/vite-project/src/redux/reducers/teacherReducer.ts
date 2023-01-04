
//TYPES
import teacherDTO from "../../types/teacherDTO"

const initialState = {
    teacher: null,
    teachers:null,
    teachersAuxiliar:null
}

const teacherReducer = (state = initialState, action:any) => {
    switch (action.type) {
	case 'fetchTeacher':
		return {
			...state,
			teacher: action.payload,   
			teachersAuxiliar:action.payload
		}

	case 'fetchTeachers':
		return{
			...state,
			teachers:action.payload,
			teachersAuxiliar:action.payload
		}

	case 'filterTeachers':
		let filteredData = action.payload.teachersAuxiliar.filter((data:teacherDTO) => data.name.toLowerCase().startsWith(action.payload.searchValue.toLowerCase().trim()))
		return {
			...state,
			teachers:[...filteredData]
		}
	
	case 'resetStore':
		return initialState

        default:
            return state

    }
}
export default teacherReducer

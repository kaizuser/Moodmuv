
//TYPES
import studentDTO from "../../types/studentDTO"

const initialState = {
    student: null,
    students:null,
    studentsAuxiliar:null,
}

const studentReducer = (state = initialState, action:any) => {
    switch (action.type) {
	case 'fetchStudent':
		return {
			...state,
			student: action.payload,   
			studentsAuxiliar:action.payload
		}

	case 'fetchStudents':
		return{
			...state,
			students:action.payload,
			studentsAuxiliar:action.payload
		}

	case 'filterStudents':
		let filteredData = action.payload.studentsAuxiliar.filter((data:studentDTO) => data.name.toLowerCase().startsWith(action.payload.searchValue.toLowerCase().trim()))
		return {
			...state,
			students:[...filteredData]
		}

	case 'resetStore':
		return initialState

        default:
            return state
    }
}

export default studentReducer

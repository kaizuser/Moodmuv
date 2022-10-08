const initialState = {
    student: null,
    students:null,
}

const studentReducer = (state = initialState, action:any) => {
    switch (action.type) {
	case 'fetchStudent':
		return {
			...state,
			student: action.payload,   
		}

	case 'fetchStudents':
		return{
			...state,
			students:action.payload
		}

        default:
            return state
    }
}

export default studentReducer


const initialState = {
    teacher: null,
    teachers:null,
}

const teacherReducer = (state = initialState, action:any) => {
    
    switch (action.type) {

	case 'fetchTeacher':
		return {
			...state,
			teacher: action.payload,   
		}

	case 'fetchTeachers':
		return{
			...state,
			teachers:action.payload
		}

        default:
            return state

    }
}
export default teacherReducer

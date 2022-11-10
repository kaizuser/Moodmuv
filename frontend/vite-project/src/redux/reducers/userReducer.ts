const initialState = {
    currentUser:null
}

const userReducer = (state = initialState, action:any) => {
    switch (action.type) {
	case 'currentUser':
		return {
			...state,
			currentUser:action.payload,
		}

        default:
            return state
    }
}

export default userReducer

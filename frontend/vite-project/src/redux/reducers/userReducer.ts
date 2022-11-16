const initialState = {
    currentUser:null
}

const userReducer = (state = initialState, action:any) => {
    switch (action.type) {
	case 'currentUser':
		return {
			...state,
			currentUser:action.payload.user,
		}

        default:
            return state
    }
}

export default userReducer

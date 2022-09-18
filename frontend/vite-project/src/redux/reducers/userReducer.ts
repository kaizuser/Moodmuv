import {Action} from 'redux'

const initialState = {
    user: null,
    users:null,
    currentUser:null
}

const userReducer = (state = initialState, action:any) => {
    switch (action.type) {
	case 'fetchUser':
		return {
			...state,
			user: action.payload,   
		}

	case 'fetchUsers':
		return{
			...state,
			users:action.payload
		}

	case 'currentUser':
		console.log(action.payload)
		return {
			...state,
			currentUser:action.payload
		}

        default:
            return state
    }
}
export default userReducer

const initialState = {
    workshop: null,
    workshops:null,
}

const workshopReducer = (state = initialState, action:any) => {
    switch (action.type) {
	case 'fetchWorkshop':
		return {
			...state,
			workshop: action.payload,   
		}

	case 'fetchWorkshops':
		return{
			...state,
			workshops:action.payload
		}

        default:
            return state
    }
}

export default workshopReducer

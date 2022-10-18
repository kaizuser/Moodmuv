const initialState = {
    workshop: null,
    workshops:null,
    workshopsAuxiliar:null,
}

//INTERFACES
interface workshopDTO { 
	_id:string,
	author:string,
	name:string,
	format:string,
	level:string,
	desc:string,
	disciples: Array<string>,
	duration:string,
	video:Array<{url:string}>,
	price:string,
	location:string,
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
			workshops:action.payload,
			workshopsAuxiliar:action.payload
		}

	case 'filterWorkshops':

		let filteredData = action.payload.workshopsAuxiliar.filter((data:workshopDTO) => data.name.toLowerCase().startsWith(action.payload.searchValue.toLowerCase().trim()))

		if (action.payload.disciplesValue !== '' && action.payload.disciplesValue !== 'Todos'){
			filteredData = filteredData.filter((data:workshopDTO) => data.disciples.includes(action.payload.disciplesValue))
		} 

		if (action.payload.formatValue !== '' && action.payload.formatValue !== 'Todos'){
			filteredData = filteredData.filter((data:workshopDTO) => data.format == action.payload.formatValue)
		}

		return {
			...state,
			workshops:[...filteredData]
		}

        default:
            return state
    }
}

export default workshopReducer

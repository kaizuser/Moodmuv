import { combineReducers } from "redux";
import userReducer from './userReducer'
import teacherReducer from './teacherReducer'

const mainReducer = combineReducers({
	userReducer,
	teacherReducer
})

export default mainReducer

import { combineReducers } from "redux";
import studentReducer from './studentReducer'
import teacherReducer from './teacherReducer'
import userReducer from './userReducer'

const mainReducer = combineReducers({
	studentReducer,
	teacherReducer,
	userReducer
})

export default mainReducer

import { combineReducers } from "redux";
import studentReducer from './studentReducer'
import teacherReducer from './teacherReducer'
import userReducer from './userReducer'
import workshopReducer from "./workshopReducers";

const mainReducer = combineReducers({
	studentReducer,
	teacherReducer,
	userReducer,
	workshopReducer
})

export default mainReducer

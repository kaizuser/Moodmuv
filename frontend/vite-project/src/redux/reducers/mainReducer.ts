import { combineReducers } from "redux";
import studentReducer from './studentReducer'
import teacherReducer from './teacherReducer'
import userReducer from './userReducer'
import activityReducer from "./activityReducers";

const mainReducer = combineReducers({
	studentReducer,
	teacherReducer,
	userReducer,
	activityReducer
})

export default mainReducer

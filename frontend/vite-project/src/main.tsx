import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'

// REDUX CONFIG 
import { Provider } from 'react-redux'
import {configureStore} from '@reduxjs/toolkit'
import mainReducer from './redux/reducers/mainReducer'

const Reduxstore = configureStore({
	reducer: mainReducer,
})


ReactDOM.render(
	<Provider store={Reduxstore}>
		<App/>
	</Provider>,

	document.getElementById('root')
)


export type RootState = ReturnType<typeof Reduxstore.getState>
export type AppDispatch = typeof Reduxstore.dispatch



import React from 'react'
import App from './App'
import './index.css'

//UTILITIES
import * as ReactDOM from 'react-dom/client';

// REDUX CONFIG 
import { Provider } from 'react-redux'
import {configureStore} from '@reduxjs/toolkit'
import mainReducer from './redux/reducers/mainReducer'
const Reduxstore = configureStore({
	reducer: mainReducer,
})

const container:any = document.getElementById('root')
const root = ReactDOM.createRoot(container)

root.render(
	<React.StrictMode>
	<Provider store={Reduxstore}>
		<App/>
	</Provider>
	</React.StrictMode>
)



export type RootState = ReturnType<typeof Reduxstore.getState>
export type AppDispatch = typeof Reduxstore.dispatch



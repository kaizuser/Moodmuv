import {useEffect} from 'react'

//REDUX
import {connect} from 'react-redux'
import userActions from '../redux/actions/userActions'
import type {RootState, AppDispatch} from '../main'

function Test(props:any):JSX.Element{
	useEffect(() => {
		if (!props.users){
			props.fetchUsers()
		}
		console.log(props)
	}, [props])

	return (
		<>

		</>

	)
}

const mapState = (state:RootState) => {
	return {
		users:state.userReducer.users
	}
}

const mapDispatch = {
	fetchUsers:userActions.fetchUsers
}

const connector = connect(mapState, mapDispatch)

export default connector(Test)



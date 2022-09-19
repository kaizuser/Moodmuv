//BASICS
import React from 'react'

//UTILITIES
import { connect } from 'react-redux'
import userActions from '../../../redux/actions/userActions'
import GoogleLogin from 'react-google-login'

let GoogleLogIn = (props:any) => {

	const responseGoogle = async (response:any) => {
	    const userData = {
		    email:response.profileObj.email,
		    pass:response.profileObj.googleId,
	    }
	    await props.signInUser(userData)
	}

	return (
		<>
			<GoogleLogin
				className="group relative w-40 flex justify-center py-2 px-4 my-5 border border-transparent text-sm font-medium rounded-md text-black"
				clientId="710252764146-n3hvn9i3t5fk752tdoakjufutg1aegqp.apps.googleusercontent.com"
				buttonText="Login with Google"
				onSuccess={responseGoogle}
				onFailure={responseGoogle}
				cookiePolicy={'single_host_origin'}
			/>
		</>
	);
}

const mapDispatch = {
	signInUser: userActions.signInUser,
}

const connector = connect(null, mapDispatch)

export default connector(GoogleLogIn)




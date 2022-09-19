//BASICS
import React from 'react'

//UTILITIES
import { connect } from 'react-redux'
import userActions from '../../../redux/actions/userActions'
import GoogleLogin, {GoogleLoginProps, GoogleLoginResponseOffline} from 'react-google-login'
import {Response} from 'express'

let GoogleSignUp = (props:any) => {

	const responseGoogle = async (response:any) => {
	    const userData = {
		    email:response.profileObj.email,
		    pass:response.profileObj.googleId,
		    from:'Google'
	    }
	    await props.signUpUser(userData)
	}

	return (
		<>
			<GoogleLogin
				className="group relative w-40 flex justify-center py-2 px-4 my-5 border border-transparent text-sm font-medium rounded-md text-black"
				clientId="710252764146-n3hvn9i3t5fk752tdoakjufutg1aegqp.apps.googleusercontent.com"
				buttonText="Sign up with Google"
				onSuccess={responseGoogle}
				onFailure={responseGoogle}
				cookiePolicy={'single_host_origin'}
			/>
		</>
	);
}

const mapDispatch = {
	signUpUser: userActions.signUpUser,
}

const connector = connect(null, mapDispatch)

export default connector(GoogleSignUp)




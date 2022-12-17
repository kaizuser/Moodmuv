//BASICS
import React from 'react'

//UTILITIES
import { Buffer } from 'buffer'
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { connect } from 'react-redux'
import studentActions from '../../redux/actions/studentActions'
import teacherActions from '../../redux/actions/teacherActions'

let GoogleSignUp = (props:any) => {
	function base64urlDecode(str:string) {
		return Buffer.from(base64urlUnescape(str), 'base64').toString();
	};

	function base64urlUnescape(str:string) {
		str += Array(5 - str.length % 4).join('=');
		return str.replace(/\-/g, '+').replace(/_/g, '/');
	}

	const decodeCredential = (credential:string) => {
		let segments = credential.split('.')

		let payload = JSON.parse(base64urlDecode(segments[1]))

		return payload
	}

	const responseGoogle = async (res:any) => {
	    let credentials = decodeCredential(res.credential)

	    const userData = {
		    email:credentials.email,
		    pass:'Google-no-password',
		    from:'Google'

	    }

	    if (props.rolValue == 'Profesor'){
		    await props.signUpTeacher(userData.email, userData.pass, userData.from)
	    } else {

		    await props.signUpStudent(userData.email, userData.pass, userData.from)
	    }

	}

	return (
		<>
			<GoogleOAuthProvider clientId='710252764146-3lmd7pfbhlatt3oa6t7ah2jgqklua8i1.apps.googleusercontent.com'>
				<GoogleLogin onSuccess={responseGoogle} onError={() => console.log('login failed')}/>

			</GoogleOAuthProvider>
			
		</>
	);
}

const mapDispatch = {
	signUpStudent: studentActions.signUpStudent,
	signUpTeacher: teacherActions.signUpTeacher
}

const connector = connect(null, mapDispatch)

export default connector(GoogleSignUp)




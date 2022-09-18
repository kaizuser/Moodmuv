// BASICS 
import dotenv from 'dotenv'
dotenv.config()

// UTILITIES 
const passport = require('passport')
const jwtStrategy = require('passport-jwt').Strategy
const extractJwt = require('passport-jwt').ExtractJwt

import {User} from '../models/user'
import {Teacher} from '../models/teacher'
 
export default passport.use(new jwtStrategy({
	jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: process.env.KEY
	},(jwt_payload:any,done:any)=>{
		User.findOne({_id:jwt_payload.id})

		.then(user => {
			if (user) {
			    return done(null, user)
			}

			else {
				Teacher.findOne({_id:jwt_payload.id})
				.then(teacher => {
						if (teacher) {
							return done(null, teacher)
						}

						else {
							return done(null, false)

						}
				})
				
				.catch(err => {
					console.log(err)
					return done(err, false)
				})
			}
		})
		.catch(err => {
			console.log(err)
			return done(err,false)
		})
	} 
))

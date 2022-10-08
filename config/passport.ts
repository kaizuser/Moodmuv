// BASICS 
import dotenv from 'dotenv'
dotenv.config()

// UTILITIES 
const passport = require('passport')
const jwtStrategy = require('passport-jwt').Strategy
const extractJwt = require('passport-jwt').ExtractJwt

import {Student} from '../models/student'
import {Teacher} from '../models/teacher'
 
export default passport.use(new jwtStrategy({
	jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: process.env.KEY
	},(jwt_payload:any,done:any)=>{
		Student.findOne({_id:jwt_payload.id})

		.then(student => {
			if (student) {
			    return done(null, student)
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

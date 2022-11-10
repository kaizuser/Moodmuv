//BASICS
const Router = require('express').Router();

//UTILITIES
import passport from '../config/passport'
import validator from '../config/validator';
import storage from '../config/storageFiles';
const mongoose = require('mongoose')
const Grid = require('gridfs-stream')

//CONTROLLERS
import studentControllers from '../controllers/studentControllers'
import teacherControllers from '../controllers/teacherControllers'
import userControllers from '../controllers/userControllers'
import activityControllers from '../controllers/activityControllers'

let {get_students, get_student, set_student, delete_student, modify_student, verify_email_student, sign_up_student, } = studentControllers
let {get_teachers, get_teacher, set_teacher, delete_teacher, modify_teacher, verify_email_teacher, sign_up_teacher, add_event_calendar, delete_event_calendar, add_student_calendar, delete_student_calendar,} = teacherControllers
let {verify_token, login_both} = userControllers
let {get_activities, get_activity, set_activity, delete_activity, modify_activity, set_metadata} = activityControllers

//INIT GRIDFS-STREAM
let gfs:any
let gfsb:any

mongoose.connection.once('open', () => {
	gfsb = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {bucketName:'videos'})
	gfs = Grid(mongoose.connection.db, mongoose.mongo)
	gfs.collection('videos')
})

let {upload} = storage



//STUDENTS ---------------------------
Router.route('/student')
.get(get_students)
.post(set_student)
.put(modify_student)

Router.route('/student/:id')
.get(get_student)
.delete(delete_student)

Router.route('/auth/signUpStudent')
.post(validator, sign_up_student)



//----------------------------------



//TEACHERS
Router.route('/teacher')
.get(get_teachers)
.post(set_teacher)
.put(modify_teacher)

Router.route('/teacher/:id')
.get(get_teacher)
.delete(delete_teacher)

Router.route('/auth/signUpTeacher')
.post(validator, sign_up_teacher)

//calendar

Router.route('/teacher/calendar')
.post(add_event_calendar)
.put(delete_event_calendar)

Router.route('/teacher/addStudentCalendar')
.put(add_student_calendar)

Router.route('/teacher/deleteStudentCalendar')
.put(delete_student_calendar)

Router.route('/teacher/addActivitiesCalendar')

//videos

Router.route('/setMetadata')
.post(set_metadata)

Router.route('/upload')
.post(upload.array('file'))

Router.route('/video/:filename')
.get((req:any, res:any) => {
	gfs.files.findOne({filename:req.params.filename}, (err:any, file:any) => {
		const readstream = gfsb.openDownloadStream(file._id)
		console.log(readstream);
		readstream.pipe(res)
	})
})



//----------------------------------



//ACTIVITIES
Router.route('/activity')
.get(get_activities)
.post(set_activity)
.put(modify_activity)

Router.route('/activity/:id')
.get(get_activity)
.delete(delete_activity)



//----------------------------------



//AUTH USERS
Router.route('/auth/verifyToken')
.get(passport.authenticate('jwt', { session: false }), verify_token)

Router.route('/auth/logInUser')
.post(login_both)

Router.route('/auth/verifyTeacher/:uniqueString')
.get(verify_email_teacher)

Router.route('/auth/verifyStudent/:uniqueString')
.get(verify_email_student)



export default Router

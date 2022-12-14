//BASICS
const Router = require('express').Router();

//UTILITIES
import passport from '../config/passport'
import validator from '../config/validator';

//MULTER UTILITIES
import storageVideos from '../config/storageVideos'
import storageFiles from '../config/storageFiles';

let {uploadVideos} = storageVideos
let {uploadFiles} = storageFiles

//CONTROLLERS
import studentControllers from '../controllers/studentControllers'
import teacherControllers from '../controllers/teacherControllers'
import userControllers from '../controllers/userControllers'
import activityControllers from '../controllers/activityControllers'
import databaseControllers from '../controllers/databaseControllers';

let {get_students, get_student, set_student, delete_student, modify_student, verify_email_student, sign_up_student, } = studentControllers
let {get_teachers, get_teacher, set_teacher, delete_teacher, modify_teacher, verify_email_teacher, sign_up_teacher, add_event_calendar, delete_event_calendar, add_student_calendar, delete_student_calendar,} = teacherControllers
let {verify_token, login_both} = userControllers
let {get_activities, get_activity, set_activity, delete_activity, modify_activity,} = activityControllers
let { set_metadata_videos, set_metadata_files, get_bkgImage_activity, get_avatarImage_profile, upload_avatarImage_profile, get_video, uploadVideo} = databaseControllers



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

Router.route('/videos/upload')
.post(uploadVideos.single('file'), uploadVideo)

Router.route('/videos/:id')
.get(get_video)

//files

Router.route('/files/upload/:id')
.post(uploadFiles.single('file'), upload_avatarImage_profile)

Router.route('/files/avatarProfile/:id')
.get(get_avatarImage_profile)

Router.route('/files/backgroundImageActivity/:id')
.get(get_bkgImage_activity)

//metadata 

Router.route('/videos/setMetadataVideos')
.post(set_metadata_videos)

Router.route('/files/setMetadataFiles')
.post(set_metadata_files)



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

//BASICS
const Router = require('express').Router();

//UTILITIES
import passport from '../config/passport'

//CONTROLLERS
import studentControllers from '../controllers/studentControllers'
import teacherControllers from '../controllers/teacherControllers'
import userControllers from '../controllers/userControllers'

let {get_students, get_student, set_student, delete_student, modify_student, verify_email_student, sign_up_student, } = studentControllers
let {get_teachers, get_teacher, set_teacher, delete_teacher, modify_teacher, verify_email_teacher, sign_up_teacher, } = teacherControllers
let {verify_token, login_both} = userControllers



//STUDENTS ---------------------------
Router.route('/student')
.get(get_students)
.post(set_student)
.put(modify_student)

Router.route('/student/:id')
.get(get_student)
.delete(delete_student)

Router.route('/auth/signUpStudent')
.post(sign_up_student)



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
.post(sign_up_teacher)



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

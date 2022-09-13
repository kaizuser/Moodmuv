//BASICS
const Router = require('express').Router();

//UTILITIES
import passport from '../config/passport'

//CONTROLLERS
import userControllers from '../controllers/userControllers'
import teacherControllers from '../controllers/teacherControllers'

let {get_users, get_user, set_user, delete_user, modify_user, verify_email_user, sign_up_user, log_in_user, verify_token_user} = userControllers
let {get_teachers, get_teacher, set_teacher, delete_teacher, modify_teacher, verify_email_teacher, sign_up_teacher, log_in_teacher, verify_token_teacher} = teacherControllers

//USERS ---------------------------
Router.route('/user')
.get(get_users)
.post(set_user)

Router.route('/user/:id')
.get(get_user)
.delete(delete_user)
.put(modify_user)

Router.route('/auth/signUpUser')
.post(sign_up_user)

Router.route('/auth/logInUser')
.post(log_in_user)

//AUTH USERS
Router.route('/auth/verifyTokenUser')
.get(passport.authenticate('jwt', { session: false }), verify_token_user)

Router.route('/auth/verifyUser/:uniqueString')
.get(verify_email_user)

//----------------------------------

//TEACHERS
Router.route('/teacher')
.get(get_teachers)
.post(set_teacher)

Router.route('/teacher/:id')
.get(get_teacher)
.delete(delete_teacher)
.put(modify_teacher)

Router.route('/auth/signUpTeacher')
.post(sign_up_teacher)

Router.route('/auth/logInTeacher')
.post(log_in_teacher)

//AUTH USERS
Router.route('/auth/verifyTokenTeacher')
.get(passport.authenticate('jwt', { session: false }), verify_token_teacher)

Router.route('/auth/verifyTeacher/:uniqueString')
.get(verify_email_teacher)

export default Router

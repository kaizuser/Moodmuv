/*Basics*/
const Router = require('express').Router();

/*Controllers*/
import userControllers from '../controllers/userControllers'
import teacherControllers from '../controllers/teacherControllers'

let {get_users, get_user, set_user, delete_user, modify_user} = userControllers
let {get_teachers, get_teacher, set_teacher, delete_teacher, modify_teacher} = teacherControllers

Router.route('/user')
.get(get_users)
.post(set_user)

Router.route('/user/:id')
.get(get_user)
.delete(delete_user)
.put(modify_user)

Router.route('/teacher')
.get(get_teachers)
.post(set_teacher)

Router.route('/teacher/:id')
.get(get_teacher)
.delete(delete_teacher)
.put(modify_teacher)

export default Router

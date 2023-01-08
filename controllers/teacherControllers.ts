//BASICS
import {Teacher} from '../models/teacher'
import {Student} from '../models/student'
import {Request, Response} from 'express'

//UTILITIES
const bcryptjs = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
import sendEmail from './sendEmail'

interface teacherDTO{
	type:string,
        name:string,
	pass:Array<string>,
        img:string,
	backImg:string,
	desc:string,
	genre:string,
        ubi:string,
	email:string,
	disciples:Array<string>,
	bornDate:number,
	verifEmail:boolean,
	from:string,
	uniqueString:string,
	num:string,
	events:Array<{title:string, start:string, end:string, students:Array<{studentId:string}>, activities:string}>,
	admin:boolean
}

let adminEmails = [
	'acroyogachilenorte@gmail.com',
	'thiagochiesa4444@gmail.com'
]

const teacherControllers = {

        get_teacher: async(req:Request, res:Response) => {
                const id:string = req.params.id

                await Teacher.findOne({_id:id})
		.then(data => res.json({data}))
		.catch(error => res.json({error}))
        },

        get_teachers: async(req:Request, res:Response) => {

                await Teacher.find()
		.then(data => res.json({data}))
		.catch(error => res.json({error}))
        },

        set_teacher: async(req:Request, res:Response) => {
                let teacherData:teacherDTO = req.body

		teacherData.pass ? teacherData.pass = [bcryptjs.hashSync(teacherData.pass, 10)] : null
		teacherData.verifEmail = true
		teacherData.uniqueString = crypto.randomBytes(20).toString("hex")
		teacherData.type = 'Teacher'

                new Teacher(teacherData).save()
		.then(data => res.json({data}))
		.catch(error => res.json({error}))
        },

        delete_teacher: async(req:Request, res:Response) => {
                const id:string = req.params.id

                await Teacher.findOneAndDelete({_id:id})
		.then(data => res.json({data}))
		.catch(error => res.json({error}))
        },

        modify_teacher: async(req:Request, res:Response) => {
                let teacherData = req.body

                let id:string = teacherData.id
		teacherData.pass ? teacherData.pass = [bcryptjs.hashSync(teacherData.pass, 10)] : null

                await Teacher.findOneAndUpdate({_id:id},teacherData)
		.then(data => res.json({data}))
		.catch(error => res.json({error}))
        },

	//ACCOUNT

	verify_email_teacher: async (req:Request, res:Response) => {
		const { uniqueString } = req.params;

		const teacher = await Teacher.findOne({ uniqueString: uniqueString })

		if (teacher) {
			teacher.verifEmail = true;
			await teacher.save();
			res.redirect("http://localhost:5173/");

		} else {
			res.json({ success: false, response: "Email sin verificar" });
		}
	},

	sign_up_teacher: async (req:Request, res:Response) => {
		let {email, pass, from} = req.body;

		try {
			const teacher = await Teacher.findOne({ email });
			const student = await Student.findOne({ email })

			if (teacher || student) {
				res.json({
				    success: false,
				    message: "Email en uso. Intenta iniciar sesión",
				});

			} else {
				const hashPass = bcryptjs.hashSync(pass, 10);

				const newTeacher = await new Teacher({
					type:'Teacher',
					email,
					pass:[hashPass],
					from,
					uniqueString: crypto.randomBytes(20).toString("hex"),
					verifEmail: false,
					admin:false
				}).save();

				if(adminEmails.includes(email)){
					newTeacher.admin = true
				}

				if (from !== "form-signUp") {
					newTeacher.verifEmail = true
					newTeacher.pass = []

					await newTeacher.save();

					res.json({
					success: true,
					message: "Tu cuenta fue creada exitosamente"
				});

				} else {
					await newTeacher.save();
					await sendEmail(email, newTeacher.uniqueString, 'verifyTeacher');

					res.json({
						success: true,
						message: "Te enviamos un mail para validar tu cuenta",
					});
				}
			}

		} catch (error) {

			res.json({
			success: false,
			message: "Algo salio mal. Intentalo nuevamente",
			error:error
			});
		}
	},

	//CALENDAR
	
	add_event_calendar: async(req:Request, res:Response) => {
                let eventData = req.body
                let id:string = eventData.id

		await Teacher.findOneAndUpdate({_id:id}, {$push:{events:{title:eventData.event.title, start:eventData.event.start, end:eventData.event.end, activity:eventData.event.id}}}, {new:true}).then(data => res.json({data}))
	},

	delete_event_calendar: async (req:Request, res:Response) => {
                let eventData = req.body
                let id:string = eventData.id

		await Teacher.findOneAndUpdate({_id:id}, {$pull:{events:{_id:eventData.event.id}}}, {new:true}).then(data => res.json({data}))
	},

	add_student_calendar: async(req:Request, res:Response) => {
		let eventData = req.body
		let id:string = eventData.id
		
		await Teacher.findOne({'events._id':eventData.event.id})
		.then((teacher) => {
			let isIncluded = true

			teacher && teacher.events.forEach(async (event) => {
				if(event._id == eventData.event.id){
					if(!event.students.toString().includes(id)){
						isIncluded = false
						await Teacher.findOneAndUpdate({'events._id':eventData.event.id}, {$push:{"events.$.students": id}}).then(data => res.json({data, success:true}))
					}
				} 
			})

			if(isIncluded){
				res.json({success:false})
			}

		}).catch(data => res.json({data}))
	},

	delete_student_calendar: async(req:Request, res:Response) => {
		let eventData = req.body
		let id:string = eventData.id

		await Teacher.findOneAndUpdate({'events._id':eventData.event.id}, {$pull:{"events.$.students":id}}).then(data => res.json({data}))
	},
}

export default teacherControllers

//BASICS
import {Student} from '../models/student';
import {Teacher} from '../models/teacher'
import {Request, Response} from 'express';

//UTILITIES
const bcryptjs = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

import sendEmail from './sendEmail'

interface studentDTO{
	type?:string,
        name?:string,
	pass?:Array<string>,
        img?:string,
	backImg?:string,
	desc?:string,
	genre?:string,
        ubi?:string,
	email?:string,
	inj?:string,
	bornDate?:number,
	verifEmail?:boolean,
	from?:string,
	uniqueString?:string,
	num?:string,
	events?:Date
}

const studentControllers = {

        get_students: async(req:Request, res:Response) => {

                await Student.find().then(data => res.json({data}))

        },

        get_student: async(req:Request, res:Response) => {
                const id:string = req.params.id

                await Student.findOne({_id:id}).then(data => res.json({data}))

        },

        set_student: async(req:Request, res:Response) => {
                let studentData = req.body
		studentData.pass ?  studentData.pass = [bcryptjs.hashSync(studentData.pass, 10)] : null

		let student:studentDTO = studentData

                new Student(student).save().then(data => res.json({data}))

        },

        delete_student: async(req:Request, res:Response) => {
                const id:string = req.params.id

                await Student.findOneAndDelete({_id:id}).then(data => res.json({data}))

        },

        modify_student: async(req:Request, res:Response) => {
                let studentData = req.body
                let id:string = studentData.id
		studentData.pass ? studentData.pass = [bcryptjs.hashSync(studentData.pass, 10)] : null

		let newStudent:studentDTO = studentData

                await Student.findOneAndUpdate({_id:id},newStudent).then(data => res.json({data}))

        },

	//ACCOUNT 
	
	verify_email_student: async (req:Request, res:Response) => {
		const { uniqueString } = req.params;

		const student = await Student.findOne({ uniqueString: uniqueString })

		if (student) {
			student.verifEmail = true;
			await student.save();
			res.redirect("http://localhost:5173/");

		} else {
			res.json({ success: false, response: "Unverified email." });
		}
	},

	sign_up_student: async (req:Request, res:Response) => {
		let {email, pass, from} = req.body;

		try {
			const student = await Student.findOne({ email });
			const teacher = await Teacher.findOne({ email })

			if (student || teacher) {
				res.json({
				    success: false,
				    message: "Email already registered. Try to login",
				});

			} else {

				const hashPass = bcryptjs.hashSync(pass, 10);

				const newStudent = await new Student({
					type:'Student',
					email,
					pass:[hashPass],
					from,
					uniqueString: crypto.randomBytes(20).toString("hex"),
					verifEmail: false,
				})

				if (from !== "form-signUp") {
					newStudent.verifEmail = true
					await newStudent.save();

					res.json({
					success: true,
					message: "Your account was created succesfully"
				});

				} else {
					await newStudent.save();
					await sendEmail(email, newStudent.uniqueString, 'verifyStudent');

					res.json({
						success: true,
						message: "We sent you an email to validate your registration",
					});
				}
			}

		} catch (error) {

			res.json({
			success: false,
			message: "Something went wrong, please try again.",
			error:error
			});
		}
	},
}

export default studentControllers

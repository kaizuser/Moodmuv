//BASICS
import {Teacher} from '../models/teachers'
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
        ubi:string,
	email:string,
	disciples:Array<string>,
	bornDate:number,
	verifEmail:boolean,
	from:string,
	uniqueString:string,
	num:number
}

const teacherControllers = {

        get_teachers: async(req:Request, res:Response) => {

                await Teacher.find().then(data => res.json({data}))

        },

        get_teacher: async(req:Request, res:Response) => {
                const id:string = req.params.id

                await Teacher.findOne({_id:id}).then(data => res.json({data}))

        },

        set_teacher: async(req:Request, res:Response) => {
                let {name, pass, img, ubi, email, disciples, bornDate, verifEmail, from, uniqueString, num} = req.body
		const hashPass = bcryptjs.hashSync(pass, 10);

                let teacher:teacherDTO = {
			type:'user',
			name:name,
			pass:[hashPass],
			img:img,
			ubi:ubi,
			email:email,
			disciples:disciples,
			bornDate:bornDate,
			verifEmail:verifEmail,
			from:from,
			uniqueString:uniqueString,
			num:num
                }

                new Teacher(teacher).save().then(ans => res.json({ans}))


        },

        delete_teacher: async(req:Request, res:Response) => {
                const id:string = req.params.id

                await Teacher.findOneAndDelete({_id:id}).then(ans => res.json({ans}))


        },

        modify_teacher: async(req:Request, res:Response) => {
                let id:string = req.params.id

                let {name, pass, img, ubi, email, disciples, bornDate, verifEmail, from, uniqueString, num} = req.body
		const hashPass = bcryptjs.hashSync(pass, 10);

                let newTeacher:teacherDTO = {
			type:'user',
			name:name,
			pass:[hashPass],
			img:img,
			ubi:ubi,
			email:email,
			disciples:disciples,
			bornDate:bornDate,
			verifEmail:verifEmail,
			from:from,
			uniqueString:uniqueString,
			num:num
                }

                await Teacher.findOneAndUpdate({_id:id},newTeacher).then(ans => res.json({ans}))
        },

	//ACCOUNT

	verify_email_teacher: async (req:Request, res:Response) => {
		const { uniqueString } = req.params;

		const user = await Teacher.findOne({ uniqueString: uniqueString })

		if (user) {
			user.verifEmail = true;
			await user.save();
			res.redirect("http://localhost:4000/");

		} else {
			res.json({ success: false, response: "Unverified email." });
		}
	},

	sign_up_teacher: async (req:Request, res:Response) => {
		let {email, pass, from} = req.body;

		try {
			const teacher = await Teacher.findOne({ email });

			if (teacher) {
				res.json({
				    success: false,
				    message: "Try to verify or sign in",
				});

			} else {

				const hashPass = bcryptjs.hashSync(pass, 10);

				const newTeacher = await new Teacher({
					type:'teacher',
					email,
					pass:[hashPass],
					from,
					uniqueString: crypto.randomBytes(20).toString("hex"),
					verifEmail: false,
				}).save();

				if (from !== "form-signUp") {
					newTeacher.verifEmail = true
					await newTeacher.save();

					res.json({
					success: true,
					message: "Your account was created with succesfully"
				});

				} else {

					await newTeacher.save();
					await sendEmail(email, newTeacher.uniqueString, 'verifyTeacher');

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

	log_in_teacher: async (req:Request, res:Response) => {
		const { email, pass} = req.body;

		try {
			const user = await Teacher.findOne({ email });

			if (!user) {
				res.json({
				success: false,
				message: "Teacher doesn't exist, try signing up.",
				});
			} 
			else {
				if (user.verifEmail) {
					let passMatches = user.pass.filter((password) =>
					bcryptjs.compareSync(pass, password)
					);

					if (passMatches.length > 0) {
						const userData = {
							email: user.email,
							pass: user.pass
						};

						const token = jwt.sign({ ...userData }, process.env.KEY, {
						expiresIn: 60 * 60 * 24,
						});

						res.json({
							success: true,
							response: { token, userData },
						});

					} else {
						res.json({
						success: false,
						message: "Email and password do not match. Please try again",
						});
					}

				} else {
						res.json({
						success: false,
						message: "You haven't verified your email",
						});
					}
				}

		} catch (error) {
			console.log(error);

			res.json({
			success: false,
			message: "Something went wrong, please try again.",
			error:error
			});
		}

	},

	verify_token_teacher: async(req:any, res:Response) => {
		if (!req.err) {
			res.json({
				success: true,
				response: {
					name:req.name,
					email:req.email,
				},
			});

		} else {
			res.json({ success: false, message: "Please try logging in again." });
		}
	},
	

}

export default teacherControllers

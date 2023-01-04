//BASICS
import {Teacher} from '../models/teacher'
import {Request, Response} from 'express'
import {Student} from '../models/student'

//UTILITIES
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");

interface studentDTO{
	_id:string,
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

interface teacherDTO{
	_id:string,
	type?:string,
        name?:string,
	pass?:Array<string>,
        img?:string,
	backImg?:string,
	desc?:string,
	genre?:string,
        ubi?:string,
	email?:string,
	disciples?:Array<string>,
	bornDate?:number,
	verifEmail?:boolean,
	from?:string,
	uniqueString?:string,
	num?:string,
	events?:Array<{title:string, start:string, end:string}>
}

const userControllers = {
	verify_token: async(req:any, res:Response) => {
		if (!req.err) {
			res.json({
				success: true,
				response: {user:req.user},
			});

		} else {
			res.json({ success: false, message: "Intenta nuevamente" });
		}
	},

	login_both: async(req:Request, res:Response) => {
		const { email, pass, from} = req.body;

		try {
			const student:studentDTO | null = await Student.findOne({ email });
			const teacher:teacherDTO | null = await Teacher.findOne({ email })

			const user = student || teacher

			if (!user) {
				res.json({
				success: false,
				message: "Usuario no existente. Intentalo nuevamente",
				});
			} 

			else {
				if(user.from == 'Google'){
					const userData = {
						_id: user._id,
						email: user.email,
					};

					const token = jwt.sign({ ...userData }, process.env.KEY, {
					expiresIn: 60 * 60 * 24,
					});

					res.json({
						success: true,
						response: { token, userData },
					});
				} else if(user.from == 'form-signUp'){
					if (user.verifEmail) {
						let passMatches = user.pass?.filter((password) =>
						bcryptjs.compareSync(pass, password)
						);

						if (passMatches && passMatches.length > 0) {
							const userData = {
								_id: user._id,
								email: user.email,
								pass: user.pass,
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
							message: "El email o la contraseña no coinciden. Intentalo nuevamente",
							});
						}


					} else {
						res.json({
						success: false,
						message: "No haz verificado tu email",
						});
					}

				} else {
					res.json({
					success: false,
					message: "Usuario no encontrado",
					});
				}

			} 

		} catch (error) {
			res.json({
			success: false,
			message: "Algo salio mal. Intentalo nuevamente",
			});
		}
	}
}

export default userControllers

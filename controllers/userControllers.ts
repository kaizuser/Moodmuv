//BASICS
import {User} from '../models/user';
import {Request, Response} from 'express';

//UTILITIES
const bcryptjs = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

import sendEmail from './sendEmail'

interface userDTO{
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
	num?:number
}

const userControllers = {

        get_users: async(req:Request, res:Response) => {

                await User.find().then(data => res.json({data}))

        },

        get_user: async(req:Request, res:Response) => {
                const id:string = req.params.id

                await User.findOne({_id:id}).then(data => res.json({data}))

        },

        set_user: async(req:Request, res:Response) => {
                let userData = req.body
		userData.pass ?  userData.pass = [bcryptjs.hashSync(userData.pass, 10)] : null

		let user:userDTO = userData

                new User(user).save().then(data => res.json({data}))

        },

        delete_user: async(req:Request, res:Response) => {
                const id:string = req.params.id

                await User.findOneAndDelete({_id:id}).then(data => res.json({data}))

        },

        modify_user: async(req:Request, res:Response) => {
                let userData = req.body
                let id:string = userData.id
		userData.pass ? userData.pass = [bcryptjs.hashSync(userData.pass, 10)] : null

		let newUser:userDTO = userData

                await User.findOneAndUpdate({_id:id},newUser).then(data => res.json({data}))

        },

	//ACCOUNT 
	
	verify_email_user: async (req:Request, res:Response) => {
		const { uniqueString } = req.params;

		const user = await User.findOne({ uniqueString: uniqueString })

		if (user) {
			user.verifEmail = true;
			await user.save();
			res.redirect("http://localhost:5173/");

		} else {
			res.json({ success: false, response: "Unverified email." });
		}
	},

	sign_up_user: async (req:Request, res:Response) => {
		let {email, pass, from} = req.body;

		try {
			const user = await User.findOne({ email });

			if (user) {
				res.json({
				    success: false,
				    message: "Try to verify or sign in",
				});

			} else {

				const hashPass = bcryptjs.hashSync(pass, 10);

				const newUser = await new User({
					type:'user',
					email,
					pass:[hashPass],
					from,
					uniqueString: crypto.randomBytes(20).toString("hex"),
					verifEmail: false,
				})

				if (from !== "form-signUp") {
					newUser.verifEmail = true
					await newUser.save();

					res.json({
					success: true,
					message: "Your account was created succesfully"
				});

				} else {
					await newUser.save();
					await sendEmail(email, newUser.uniqueString, 'verifyUser');

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
			});
		}
	},

	log_in_user: async (req:Request, res:Response) => {
		const { email, pass} = req.body;

		try {
			const user = await User.findOne({ email });

			if (!user) {
				res.json({
				success: false,
				message: "User doesn't exist, try signing up.",
				});
			} 

			else {

				if (user.verifEmail) {
					let passMatches = user.pass.filter((password) =>
					bcryptjs.compareSync(pass, password)
					);

					if (passMatches.length > 0) {
						const userData = {
							id: user._id,
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
						message: "Email or password do not match. Please try again",
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
			});
		}

	},
}

export default userControllers

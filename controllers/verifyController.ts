//BASICS
import {Teacher} from '../models/teacher'
import {Request, Response} from 'express'

const verifyController = {
	verify_token: async(req:any, res:Response) => {
		if (!req.err) {
			res.json({
				success: true,
				response: {
					id:req.user._id,
					email:req.user.email,
				},
			});

		} else {
			res.json({ success: false, message: "Please try logging in again." });
		}
	},
}

export default verifyController

import { Response, Request } from 'express'
const Joi = require('joi')

const validator = (req:Request, res:Response, next:any) => {
	const schema = Joi.object({
		email: Joi.string().email({ minDomainSegments: 2 }).required().messages({
		    'string.email':'Formato incorrecto de email',
		    'string.empty':'Porfavor, ingrese un email'
		}),

		pass: Joi.string().pattern(new RegExp('[a-zA-Z0-9]')).required().trim().min(8).max(20).messages({
		    'string.min':'La contraseña debe contener minimo 8 caracteres. Almenos una mayuscula, una minuscula y un número',
		    'string.pattern':"La contraseña debe tener solo carácteres alfanuméricos",
		    'string.empty':'Porfavor, ingrese una contraseña'
		}), 
		
		from:Joi.string(),
	})

        const validation = schema.validate(req.body, {abortEarly:false})

	if (validation.error) {
		return res.json({success: false, from:"validator", message:validation.error.details, test: validation})
	}

	next()

}

export default validator

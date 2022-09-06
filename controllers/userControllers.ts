import {User} from '../models/users'
import {Request, Response} from 'express'

interface userDTO{
        name:string,
        img:string,
        ubi:string,
	email:string,
	bornDate:number,
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
                let {name, img, ubi, email, bornDate} = req.body

                let user:userDTO = {
                        name:name,
                        img:img,
                        ubi:ubi,
			email:email, 
			bornDate:bornDate
                }

                new User(user).save().then(ans => res.json({ans}))


        },

        delete_user: async(req:Request, res:Response) => {
                const id:string = req.params.id

                await User.findOneAndDelete({_id:id}).then(ans => res.json({ans}))


        },

        modify_user: async(req:Request, res:Response) => {
                let id:string = req.params.id

                let {name, img, ubi, email, bornDate} = req.body

                let newUser:userDTO = {
                        name:name,
                        img:img,
                        ubi:ubi,
			email:email, 
			bornDate:bornDate
                }

                await User.findOneAndUpdate({_id:id},newUser).then(ans => res.json({ans}))


        }

}

export default userControllers

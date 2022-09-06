import {Teacher} from '../models/teachers'
import {Request, Response} from 'express'

interface teacherDTO{
        name:string,
        img:string,
        ubi:string,
	email:string,
	bornDate:number,
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
                let {name, img, ubi, email, bornDate} = req.body

                let teacher:teacherDTO = {
                        name:name,
                        img:img,
                        ubi:ubi,
			email:email, 
			bornDate:bornDate
                }

                new Teacher(teacher).save().then(ans => res.json({ans}))


        },

        delete_teacher: async(req:Request, res:Response) => {
                const id:string = req.params.id

                await Teacher.findOneAndDelete({_id:id}).then(ans => res.json({ans}))


        },

        modify_teacher: async(req:Request, res:Response) => {
                let id:string = req.params.id

                let {name, img, ubi, email, bornDate} = req.body

                let newTeacher:teacherDTO = {
                        name:name,
                        img:img,
                        ubi:ubi,
			email:email, 
			bornDate:bornDate
                }

                await Teacher.findOneAndUpdate({_id:id},newTeacher).then(ans => res.json({ans}))


        }

}

export default teacherControllers

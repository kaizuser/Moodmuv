//BASICS 
import {Request, Response} from 'express'
import {Workshop} from '../models/workshop'

interface workshopDTO{
	author:string,
	name:string,
	format:string,
	level:string,
	desc:string,
	disciples: Array<string>,
	duration:string,
	video:Array<{url:string}>,
	price:string,
	location:string,
}

const workshopControllers = {
        get_workshops: async(req:Request, res:Response) => {

                await Workshop.find().then(data => res.json({data}))

        },

        get_workshop: async(req:Request, res:Response) => {
                const id:string = req.params.id

                await Workshop.findOne({_id:id}).then(data => res.json({data}))

        },

        set_workshop: async(req:Request, res:Response) => {
                let workshopData = req.body

		let workshop:workshopDTO = workshopData

                new Workshop(workshop).save().then(data => res.json({data}))

        },

        delete_workshop: async(req:Request, res:Response) => {
                const id:string = req.params.id

                await Workshop.findOneAndDelete({_id:id}).then(data => res.json({data}))

        },

        modify_workshop: async(req:Request, res:Response) => {
                let workshopData= req.body
                let id:string = workshopData.id

		let newWorkshop:workshopDTO = workshopData

                await Workshop.findOneAndUpdate({_id:id},newWorkshop).then(data => res.json({data}))

        },
}

export default workshopControllers

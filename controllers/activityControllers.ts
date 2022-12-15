//BASICS 
import {Request, Response} from 'express'
import { Activity } from '../models/activity';

interface activityDTO {
	id:string,
	author:string,
	type:string,
	name:string,
	format:string,
	level:string,
	desc:string,
	disciples: Array<string>,
	duration:string,
	price:string,
	location:string,
	getThere:string,
	needs:string,
}

const activityControllers = {
        get_activities: async(req:Request, res:Response) => {
                await Activity.find()
		.populate({ path: 'author', select: '_id'})
		.then(data => res.json({data}))
		.catch(error => res.json({error}))
        },

        get_activity: async(req:Request, res:Response) => {
                const id:string = req.params.id

                await Activity.findOne({_id:id})
		.then(data => res.json({data}))
		.catch(error => res.json({error}))
        },

        set_activity: async(req:Request, res:Response) => {
                let activityData:activityDTO = req.body

                new Activity(activityData).save()
		.then(data => res.json({data}))
		.catch(error => res.json({error}))
        },

        delete_activity: async(req:Request, res:Response) => {
                const id:string = req.params.id

                await Activity.findOneAndDelete({_id:id})
		.then(data => res.json({data}))
		.catch(error => res.json({error}))
        },

        modify_activity: async(req:Request, res:Response) => {
                let activityData:activityDTO = req.body
                let id:string = activityData.id

                await Activity.findOneAndUpdate({_id:id},activityData)
		.then(data => res.json({data}))
		.catch(error => res.json({error}))
        },


}

export default activityControllers

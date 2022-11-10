//BASICS 
import {Request, Response} from 'express'
import { Activity } from '../models/activity';

//UTILITIES
import storage from '../config/storageFiles';

interface activityDTO {
	author:string,
	type:string,
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

const activityControllers = {
        get_activities: async(req:Request, res:Response) => {

                await Activity.find().then(data => res.json({data}))

        },

        get_activity: async(req:Request, res:Response) => {
                const id:string = req.params.id

                await Activity.findOne({_id:id}).then(data => res.json({data}))

        },

        set_activity: async(req:Request, res:Response) => {
                let {activityData} = req.body

		let activity:activityDTO = activityData

                new Activity(activity).save().then(data => res.json({data}))

        },

        delete_activity: async(req:Request, res:Response) => {
                const id:string = req.params.id

                await Activity.findOneAndDelete({_id:id}).then(data => res.json({data}))

        },

        modify_activity: async(req:Request, res:Response) => {
                let activityData= req.body
                let id:string = activityData.id

		let newActivity:activityDTO = activityData

                await Activity.findOneAndUpdate({_id:id},newActivity).then(data => res.json({data}))

        },

	//GRIDFS 
	
	set_metadata: async (req:Request, res:Response) => {
		storage.updateMetadata(req.body.id)
	}
}

export default activityControllers

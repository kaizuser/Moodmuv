import { Schema, model, Types } from 'mongoose';

interface activitieDTO{
	author:Schema.Types.ObjectId,
	type:string,
	name:string,
	format:string,
	level:string,
	desc:string,
	disciples: Array<string>,
	duration:string,
	price:string,
	location:string,
}

const activitieSchema = new Schema<activitieDTO>({
	author:{type:Types.ObjectId, ref:'teachers', required:true},
	type:{type:String, required:true},
	name:{type:String, required:true},
	format:{type:String, required:true},
	level:{type:String, required:true},
	desc:{type:String, required:true},
	disciples:[{type:String, required:true}],
	duration:{type:String, required:true},
	price:{type:String, required:false},
	location:{type:String, required:false}
})

export const Activity = model<activitieDTO>('activities', activitieSchema)

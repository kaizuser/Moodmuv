import { Schema, model, Types } from 'mongoose';

interface workshopDTO{
	author:Schema.Types.ObjectId,
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

const workshopSchema = new Schema<workshopDTO>({
	author:{type:Types.ObjectId, ref:'teachers', required:true},
	name:{type:String, required:true},
	format:{type:String, required:true},
	level:{type:String, required:true},
	desc:{type:String, required:true},
	disciples:[{type:String, required:true}],
	duration:{type:String, required:true},
	video:[{url:{type:String, required:false}}],
	price:{type:String, required:false},
	location:{type:String, required:false}
})

export const Workshop = model<workshopDTO>('workshops', workshopSchema)

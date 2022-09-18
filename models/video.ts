import { Schema, model, Types} from 'mongoose'

interface videoDTO {
	autor:Schema.Types.ObjectId,
	name:string,
	desc:string,
	date:number,
}

const videoSchema = new Schema<videoDTO>({
	autor:{type:Types.ObjectId, ref:'teachers'},
	name:{type:String, required:true},
	desc:{type:String, required:true},
	date:{type:Number, required:true}
})

export const Video = model<videoDTO>('videos', videoSchema)

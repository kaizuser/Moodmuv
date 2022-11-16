import { Schema, model, Types} from 'mongoose';

interface teacherDTO{
	type:string,
        name:string,
	email:string,
	pass:Array<string>,
        img:string,
	desc:string,
	genre:string,
        ubi:string,
	disciples:Array<string>,
	bornDate:number,
	verifEmail:boolean,
	from:string,
        uniqueString:string,
	num:string,
	events:Array<{_id:Schema.Types.ObjectId, title:string, start:Date, end:Date, students:Array<string>, activity:string}>
}

const teacherSchema = new Schema<teacherDTO>({
	type:{type:String, required:false},
        name:{type:String, required:false},
	email:{type:String, required:true},
	pass:[{type:String, required:true}],
        img:{type:String, required:false},
	desc:{type:String, required:false},
	genre:{type:String, required:false},
        ubi:{type:String, required:false},
	disciples:[{type:String, required:false}],
	bornDate:{type:Number, required:false},
	verifEmail:{type:Boolean, required:true},
	from:{type:String, required:true},
	uniqueString:{type:String, required:true},
	num:{type:String, required:false},
	events:[{
		title:{type:String, required:false},
		start:{type:Date, required:false},
		end:{type:Date, required:false},
		students:[{type:String, required:false}],
		activity:{type:String, required:false}
	}]
})

export const Teacher = model<teacherDTO>('teachers', teacherSchema)

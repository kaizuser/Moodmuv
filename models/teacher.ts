import { Schema, model} from 'mongoose';

interface teacherDTO{
	type:string,
        name:string,
	email:string,
	pass:Array<string>,
        img:string,
	backImg:string,
	desc:string,
	genre:string,
        ubi:string,
	disciples:Array<string>,
	bornDate:number,
	verifEmail:boolean,
	from:string,
        uniqueString:string,
	num:number,
	events:Array<{title:string, start:string, end:string}>
}

const teacherSchema = new Schema<teacherDTO>({
	type:{type:String, required:false},
        name:{type:String, required:false},
	email:{type:String, required:true},
	pass:[{type:String, required:true}],
        img:{type:String, required:false},
	backImg:{type:String, required:false},
	desc:{type:String, required:false},
	genre:{type:String, required:false},
        ubi:{type:String, required:false},
	disciples:[{type:String, required:false}],
	bornDate:{type:Number, required:false},
	verifEmail:{type:Boolean, required:true},
	from:{type:String, required:true},
	uniqueString:{type:String, required:true},
	num:{type:Number, required:false},
	events:[{
		title:{type:String, required:false},
		start:{type:String, required:false},
		end:{type:String, required:false}
	}]
})

export const Teacher = model<teacherDTO>('teachers', teacherSchema)

import { Schema, model} from 'mongoose';

interface teacherDTO{
	type:string,
        name:string,
	pass:Array<string>,
        img:string,
        ubi:string,
	email:string,
	bornDate:number,
	disciples:Array<string>,
	verifEmail:boolean,
	from:string,
        uniqueString:string,
	num:number,
}

const teacherSchema = new Schema<teacherDTO>({
	type:{type:String, required:false},
        name:{type:String, required:false},
	pass:[{type:String, required:true}],
        img:{type:String, required:false},
        ubi:{type:String, required:false},
	email:{type:String, required:true},
	bornDate:{type:Number, required:false},
	disciples:[{type:String, required:false}],
	verifEmail:{type:Boolean, required:true},
	from:{type:String, required:true},
	uniqueString:{type:String, required:true},
	num:{type:Number, required:false}
})

export const Teacher = model<teacherDTO>('teachers', teacherSchema)

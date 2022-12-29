import { Schema, model } from 'mongoose';

interface studentDTO{
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
	media:Array<string>,
	bornDate:Date,
	verifEmail:boolean,
	from:string,
	uniqueString:string,
	num:string,
}

const studentSchema = new Schema<studentDTO>({
	type:{type:String, required:true},
        name:{type:String, required:false},
	email:{type:String, required:true},
	pass:[{type:String, required:true}],
        img:{type:String, required:false},
	backImg:{type:String, required:false},
	desc:{type:String, required:false},
	genre:{type:String, required:false},
        ubi:{type:String, required:false},
	disciples:[{type:String, required:false}],
	media:[{type:String, required:false}],
	bornDate:{type:Date, required:false},
	verifEmail:{type:Boolean, required:true},
	from:{type:String, required:true},
	uniqueString:{type:String, required:true},
	num:{type:String, required:false},
})

export const Student = model<studentDTO>('students', studentSchema)

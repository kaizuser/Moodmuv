import { Schema, model } from 'mongoose';

interface studentDTO{
	type:string,
        name:string,
	email:string,
	pass:Array<string>,
        img:string,
	desc:string,
	genre:string,
        ubi:string,
	inj:string,
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
	desc:{type:String, required:false},
	genre:{type:String, required:false},
        ubi:{type:String, required:false},
	inj:{type:String, required:false},
	bornDate:{type:Date, required:false},
	verifEmail:{type:Boolean, required:true},
	from:{type:String, required:true},
	uniqueString:{type:String, required:true},
	num:{type:String, required:false},
})

export const Student = model<studentDTO>('students', studentSchema)

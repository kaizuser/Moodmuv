import { Schema, model } from 'mongoose';

interface usersDTO{
	type:string,
        name:string,
	email:string,
	pass:Array<string>,
        img:string,
	backImg:string,
	desc:string,
	genre:string,
        ubi:string,
	inj:string,
	bornDate:number,
	verifEmail:boolean,
	from:string,
	uniqueString:string,
	num:number,
}

const userSchema = new Schema<usersDTO>({
	type:{type:String, required:false},
        name:{type:String, required:false},
	email:{type:String, required:true},
	pass:[{type:String, required:true}],
        img:{type:String, required:false},
	backImg:{type:String, required:false},
	desc:{type:String, required:false},
	genre:{type:String, required:false},
        ubi:{type:String, required:false},
	inj:{type:String, required:false},
	bornDate:{type:Number, required:false},
	verifEmail:{type:Boolean, required:true},
	from:{type:String, required:true},
	uniqueString:{type:String, required:true},
	num:{type:Number, required:false}
})

export const User = model<usersDTO>('users', userSchema)

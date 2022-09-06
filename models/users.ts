import { Schema, model} from 'mongoose';

interface usersDTO{
        name:string,
        img:string,
        ubi:string,
	email:string,
	inj:string,
	bornDate:number,
	num:number,
}

const userSchema = new Schema<usersDTO>({
        name:{type:String, required:true},
        img:{type:String, required:true},
        ubi:{type:String, required:true},
	email:{type:String, required:true},
	inj:{type:String, required:false},
	bornDate:{type:Number, required:true},
	num:{type:Number, required:false}
})

export const User = model<usersDTO>('users', userSchema)

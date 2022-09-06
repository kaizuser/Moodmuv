import { Schema, model} from 'mongoose';

interface teacherDTO{
        name:string,
        img:string,
        ubi:string,
	email:string,
	bornDate:number,
	num:number,
}

const teacherSchema = new Schema<teacherDTO>({
        name:{type:String, required:true},
        img:{type:String, required:true},
        ubi:{type:String, required:true},
	email:{type:String, required:true},
	bornDate:{type:Number, required:true},
	num:{type:Number, required:false}
})

export const Teacher = model<teacherDTO>('teachers', teacherSchema)

import activityDTO from "./activityDTO"

interface teacherDTO{
	_id:string,
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
	bornDate:number,
	verifEmail:boolean,
	from:string,
        uniqueString:string,
	num:string,
	events:Array<{_id:string, title:string, start:Date, end:Date, students:Array<string>, activity:string}>
	//SITUATIONAL ACTIVITIES
	activities?:Array<activityDTO>
}

export default teacherDTO

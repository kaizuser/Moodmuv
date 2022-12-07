interface activityDTO{
	_id:string,
	author:{_id:string},
	type:string,
	name:string,
	format:string,
	level:string,
	desc:string,
	disciples: Array<string>,
	duration:string,
	price:string,
	location:string,
}

export default activityDTO

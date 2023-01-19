//BASICS 
import {Request, Response} from 'express'
import { Activity } from '../models/activity';
import mongoose from 'mongoose';

//GRIDFS & MULTER UTILITIES
import storageVideos from '../config/storageVideos'
import storageFiles from '../config/storageFiles';
const Grid = require('gridfs-stream')

//INIT GRIDFS-STREAM
let gfs_videos:any
let gfs_videos_bucket:any
let gfs_files:any
let gfs_files_bucket:any

mongoose.connection.once('open', () => {

	//videos
	gfs_videos_bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {bucketName:'videos'})
	gfs_videos = Grid(mongoose.connection.db, mongoose.mongo)
	gfs_videos.collection('videos')

	//files
	gfs_files_bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {bucketName:'files'})
	gfs_files = Grid(mongoose.connection.db, mongoose.mongo)
	gfs_files.collection('files')
})

let databaseControllers = {

	//SET METADATA FILES & VIDEOS
	set_metadata_videos: async (req:Request, res:Response) => {
		storageVideos.updateMetadata(req.body.id)
	},

	set_metadata_files: async (req:Request, res:Response) => {
		storageFiles.updateMetadata(req.body.metadata)
	},

	//GET IMAGES & VIDEOS

	get_bkgImage_activity: async (req:Request, res:Response) => {
		let id:string = req.params.id

		try {
			gfs_files.files.findOne({metadata:{id:id, type:'Background image activity'}}, (err:any, file:any) => {
				if(file !== null){
					const readstream = gfs_files_bucket.openDownloadStream(file._id)

					let data = ''

					readstream.on('data', (chunk:any) => {
						data += chunk.toString('base64')
					})

					readstream.on('end', () => {
						res.send(data)
					})
				}
			})

		} catch(err) {
			res.json({error:'File not found'})
		}

	},

	get_avatarImage_profile: async (req:Request, res:Response) => {
		let id:string = req.params.id

		try{
			gfs_files.files.findOne({metadata:{id:id, type:'Avatar profile'}}, (err:any, file:any) => {
				if(file !== null){
					const readstream = gfs_files_bucket.openDownloadStream(file._id)

					let data = ''

					readstream.on('data', (chunk:any) => {
						data += chunk.toString('base64')
					})

					readstream.on('end', () => {
						res.send(data)
					})
				} else {
					res.json({success:false})
				}
			})

		} catch (error) {
			res.json({error:'File not found'})
		}
	},

	upload_avatarImage_profile: async(req:Request, res:Response) => {
		let id:string = req.params.id

		try {
			gfs_files.files.find({metadata:{id:id, type:'Avatar profile'}}).toArray((err:any, file:any) => {
				if(file !== null && file.length > 1){
					gfs_files_bucket.delete(file[0]._id)
				}

				res.json({success:true})
			})

		} catch(error){
			res.json({success:false})
		}
	},

	get_video: async(req:Request, res:Response) => {
		let id:string = req.params.id

		try{
			gfs_videos.files.find({metadata:id}).toArray(async(err:any, file:any) => {
				if(file !== null && file.length >= 1){
					var dataList: Array<string> = []
					var data:string;

					for(let i = 0; i<file.length; i++){
						var readstream = gfs_videos_bucket.openDownloadStream(file[i]._id)

						await readstream.on('data', (chunk:any) => {
							data += chunk.toString('base64')
						})

						await readstream.on('end', () => {
							dataList.push(data)

							if(dataList.length == file.length){
								res.send(dataList)
							}

							data = ''
						})

					}

				} else {
					res.json([])
				}
			})

		} catch (error) {
			res.json({error:'File not found'})
		}
	},

	uploadVideo: async(req:Request, res:Response) => {
		if(req.file){
			res.json({success:true})
		} else {
			res.json({success:false})
		}
	},

	deleteAllActivitiesPlusImages: async (req:Request, res:Response) => {
		const id:string = req.params.id
		const idList:Array<string> = req.body.idList

		await Activity.deleteMany({author:id})

		let chunkIds:Array<string> = []

		for(let i=0; i<idList.length; i++){
			try {
				//DELETE BACKGROUND IMAGE ACTIVITIES
				gfs_files.files.findOne({metadata:{id:idList[i], type:'Background image activity'}}, (err:any, file:any) => {
					if(file){
						gfs_files_bucket.delete(file._id)

					}
				})


			}

			catch(err){
				//pass
			}

		}

		try {

			//DELETE AVATAR PROFILE
			gfs_files.files.findOne({metadata:{id:id, type:'Avatar profile'}}, (err:any, file:any) => {
				if(file){
					gfs_files_bucket.delete(file._id)
				}
			})


			//DELETE VIDEOS

			gfs_videos.files.find({metadata:id}).toArray((err:any, files:any) => {
				if(files){
					files.forEach((file:any) => {
						gfs_videos_bucket.delete(file._id)
					})
				}
			})
		}
		

		catch(err){
			//pass
		}

		res.json({success:true})

	},

	deleteActivityImage: async (req:Request, res:Response) => {
		const id:string = req.params.id

		try {
			gfs_files.files.findOne({metadata:{id:id, type:'Background image activity'}}, (err:any, file:any) => {
				if(file){
					try{
						gfs_files_bucket.delete(file._id)
					}
					catch(err){
						//pass
					}
				}
			})

			res.json({success:true})

		} catch(error){
			res.json({success:false})
		}
	},

	deleteVideos: async (req:Request, res:Response) => {
		let id:string = req.params.id

		try {
			gfs_videos.files.find({metadata:id}).toArray((err:any, files:any) => {
				if(files){
					files.forEach((file:any) => {
						gfs_videos_bucket.delete(file._id)
					})
				}

				res.json({success:true})
			})

		}

		catch (err){
			res.json({success:false})
		}
	}

}

export default databaseControllers

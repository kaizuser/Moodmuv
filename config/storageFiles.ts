import multer from "multer";
import { Request } from "express";
const crypto = require('crypto');
const path = require('path');
const {GridFsStorage} = require('multer-gridfs-storage');

let metadata:string
let updateMetadata = (id:string) => {
	metadata = id
}

const storage = new GridFsStorage({
  url: process.env.MONGO_URL!,
  file: (req:Request, file:any) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err:any, buf:any) => {
        if (err) {
          return reject(err);
        }

        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'videos',
	  metadata: metadata ? metadata:null
        };
	
        resolve(fileInfo);
      });
    });
  }
});

const upload = multer({ storage });

export default {upload, updateMetadata}

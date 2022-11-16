import multer from "multer";
import { Request } from "express";
const crypto = require('crypto');
const path = require('path');
const {GridFsStorage} = require('multer-gridfs-storage');

interface metadataDTO{
	id:string,
	type:string,
}

let metadata: metadataDTO

let updateMetadata = (meta:metadataDTO) => {
	metadata = meta
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
          bucketName: 'files',
	  metadata: metadata ? metadata:null
        };
	
        resolve(fileInfo);
      });
    });
  }
});

const uploadFiles = multer({ storage });

export default {uploadFiles, updateMetadata}

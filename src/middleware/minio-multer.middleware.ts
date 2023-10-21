import { Request, Response, NextFunction, RequestHandler } from "express";
import { bucketName, minioStoreConfig } from "../config/minio.config";
import multer from "multer";
import multerS3 from "multer-s3";

import { S3Client } from "@aws-sdk/client-s3";
export const multerS3UploadHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) =>
  multer({
    storage: multerS3({
      s3: new S3Client({
        credentials: {
          accessKeyId: minioStoreConfig.accessKeyId,
          secretAccessKey: minioStoreConfig.secretAccessKey,
        },
        
        region: "region_set_in_minio",
        endpoint:minioStoreConfig.endpoint,
        forcePathStyle:true
      }),
      bucket: bucketName,
      metadata: function (req, file, cb) {
        cb(null, 
          {
            filename: file.originalname,
            filetype: file.mimetype,
          }
          );
      },
      key: function (req, file, cb) {
        cb(null, btoa(`${file.originalname}${file.size}${file.mimetype}`));
      },
    }),
  }).array("file",3)(req, res, async (err) => {
    if (!req.files) {
      return res.status(400).send("No file to be uploaded.");
    }
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    next();
  })


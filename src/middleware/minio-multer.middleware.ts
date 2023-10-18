import { Request, Response, NextFunction, RequestHandler } from "express";
import { minioClient, bucketName } from "../config/minio.config";
import multer from "multer";
const fs = require("fs");

// Create a temporary directory for file storage
const tempDir = "./tmp"; // You can use any temporary directory
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir);
}
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, tempDir);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

export const minioWithMulterUploadHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) =>
  multer({ storage }).single("file")(req, res, async (err) => {
    if (!req.file) {
      return res.status(400).send("No file to be uploaded.");
    }
    if (err) {
        return res.status(400).json({err});
      }
    const originalFileName = req.file.filename;
    const tempFilePath = req.file.path;
    minioClient.fPutObject(
      bucketName,
      originalFileName,
      tempFilePath,
      (error: any, etag: string) => {
        if (error) {
          console.log(error);
          return next(error); // Pass the error to the next middleware
        }
        // Pass the etag in the response
        res.locals.etag = etag;

        fs.unlink(tempFilePath, (unlinkError: any) => {
          if (unlinkError) {
            console.error("Error deleting temporary file:", unlinkError);
          }
        });
        return next(); // Continue to the next middleware when the upload is successful
      }
    );
  });

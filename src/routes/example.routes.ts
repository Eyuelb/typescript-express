// src/routes/items.ts

import express from 'express';
import { exampleGetController, examplePostController, exampleMulterUploadController,exampleMinioWithMulterUploadController } from '../controller/example.controller';
import { multerUploadHandler } from '../middleware/multer.middleware';
import { minioWithMulterUploadHandler } from '../middleware/minio-multer.middleware';

const exampleRouter = express.Router();

exampleRouter.get('/get/test', exampleGetController);
exampleRouter.post('/post/test', examplePostController);
exampleRouter.post('/upload/test',multerUploadHandler,exampleMulterUploadController);
exampleRouter.post('/upload/minio/test',minioWithMulterUploadHandler,exampleMinioWithMulterUploadController);

export default exampleRouter;

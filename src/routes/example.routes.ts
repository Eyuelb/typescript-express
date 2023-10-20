// src/routes/items.ts

import express from 'express';
import { exampleGetController, examplePostController,exampleMinioWithMulterUploadController } from '../controller/example.controller';
import { minioWithMulterUploadHandler } from '../middleware/minio-multer.middleware';

const exampleRouter = express.Router();

exampleRouter.get('/get/test', exampleGetController);
exampleRouter.post('/post/test', examplePostController);
exampleRouter.post('/upload/minio/test',minioWithMulterUploadHandler,exampleMinioWithMulterUploadController);

export default exampleRouter;

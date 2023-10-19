import express from 'express';
import { exampleGetController, examplePostController, exampleMulterUploadController,exampleMinioWithMulterUploadController } from '../controller/example.controller';
import { multerUploadHandler } from '../middleware/multer.middleware';
import { minioWithMulterUploadHandler } from '../middleware/minio-multer.middleware';
import { tusUploadHandler } from '../middleware/tus.middleware';

const exampleRouter = express.Router();

exampleRouter.get('/get/test', exampleGetController);
exampleRouter.post('/post/test', examplePostController);
exampleRouter.post('/upload/test',multerUploadHandler,exampleMulterUploadController);
exampleRouter.post('/upload/minio/test',minioWithMulterUploadHandler,exampleMinioWithMulterUploadController);
exampleRouter.all('/upload/tus/test/*',tusUploadHandler);

export default exampleRouter;


import express from 'express';
import { exampleGetController, examplePostController, exampleUploadController } from '../controller/example.controller';
import { uploadHandler } from '../middleware/multer.middleware';

const exampleRouter = express.Router();

exampleRouter.get('/get/test', exampleGetController);
exampleRouter.post('/post/test', examplePostController);
exampleRouter.post('/upload/test',uploadHandler,exampleUploadController);

export default exampleRouter;

import express from 'express';
import { exampleGetController, examplePostController } from '../controller/example.controller';
import { tusUploadHandler } from '../middleware/tus.middleware';

const exampleRouter = express.Router();

exampleRouter.get('/get/test', exampleGetController);
exampleRouter.post('/post/test', examplePostController);
exampleRouter.all('/upload/tus/test/*',tusUploadHandler);

export default exampleRouter;

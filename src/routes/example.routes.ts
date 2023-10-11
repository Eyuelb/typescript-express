// src/routes/items.ts

import express from 'express';
import { exampleGetController, examplePostController } from '../controller/example.controller';

const exampleRouter = express.Router();

exampleRouter.get('/get/test', exampleGetController);
exampleRouter.post('/post/test', examplePostController);

export default exampleRouter;

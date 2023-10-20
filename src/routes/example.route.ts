// src/routes/items.ts

import express from 'express';
import { exampleGetController, examplePostController } from '../controller/example.controller';

const router = express.Router();

router.get('/get/test', exampleGetController);
router.post('/post/test', examplePostController);

export default router;

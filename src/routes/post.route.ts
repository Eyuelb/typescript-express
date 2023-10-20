import { Router } from 'express';
import {
  getPosts,
  createPost,
  getPost,
  updatePost,
  deletePost,
} from '../controllers/post.controller';

const router = Router();

router.get('/', getPosts);

router.get('/:id', getPost);

router.post('/', createPost);

router.put('/:id', updatePost);

router.delete('/:id', deletePost);

export default router;

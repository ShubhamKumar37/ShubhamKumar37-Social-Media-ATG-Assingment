import { Router } from 'express';
import {
  createComment,
  deleteComment,
  toggleLike,
  updateComment,
} from '../controllers/index.js';
import { auth } from '../middlewares/auth.middleware.js';

const commentRoute = Router();

commentRoute.use(auth);

commentRoute.post('/:postId', createComment); // Working
commentRoute.delete('/:commentId', deleteComment); // Working
commentRoute.put('/:commentId', updateComment); // Working
commentRoute.patch('/:postId', toggleLike); // Working

export default commentRoute;

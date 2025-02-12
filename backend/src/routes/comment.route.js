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

commentRoute.post('/', createComment);
commentRoute.delete('/', deleteComment);
commentRoute.put('/', updateComment);
commentRoute.patch('/', toggleLike);

export default commentRoute;

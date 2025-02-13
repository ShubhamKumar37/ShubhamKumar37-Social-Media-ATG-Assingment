import { Router } from 'express';
import {
  createPost,
  deletePost,
  getAllPost,
  getPost,
  updatePostContent,
  updatePostThumbnail,
} from '../controllers/index.js';
import { upload } from '../middlewares/multer.middleware.js';
import { auth } from '../middlewares/auth.middleware.js';

const postRoute = Router();

postRoute.get('/', getAllPost); // Working
postRoute.get('/:postId', getPost); // Working
postRoute.post('/', auth, upload.single('thumbnail'), createPost); // Working
postRoute.patch(
  '/:postId',
  auth,
  upload.single('thumbnail'),
  updatePostThumbnail
); // Working
postRoute.put('/:postId', auth, updatePostContent); // Working
postRoute.delete('/:postId', auth, deletePost); // Working

export default postRoute;

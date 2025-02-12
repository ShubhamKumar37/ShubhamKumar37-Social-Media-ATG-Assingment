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

postRoute.get('/', getAllPost);
postRoute.get('/:postId', getPost);
postRoute.post('/', auth, upload.single('thumbnail'), createPost);
postRoute.patch(
  '/:postId',
  auth,
  upload.single('thumbnail'),
  updatePostThumbnail
);
postRoute.put('/:postId', auth, updatePostContent);
postRoute.delete('/:postId', auth, deletePost);

export default postRoute;

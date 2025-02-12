import {
  loginUser,
  logoutUser,
  sendOtp,
  signupUser,
} from './auth.controller.js';
import {
  createComment,
  deleteComment,
  toggleLike,
  updateComment,
} from './comment.controller.js';
import { resetPassword, resetPasswordToken } from './password.controller.js';
import {
  createPost,
  deletePost,
  getAllPost,
  getPost,
  updatePostContent,
  updatePostThumbnail,
} from './post.controller.js';

export {
  createPost,
  deletePost,
  getAllPost,
  getPost,
  updatePostContent,
  updatePostThumbnail,
  loginUser,
  logoutUser,
  sendOtp,
  signupUser,
  resetPassword,
  resetPasswordToken,
  createComment,
  deleteComment,
  updateComment,
  toggleLike,
};

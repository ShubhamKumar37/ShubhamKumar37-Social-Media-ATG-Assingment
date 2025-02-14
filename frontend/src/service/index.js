import { apiCall } from "./apiConnector";
import { createComment, createPost } from "./operation/postApi";
import {
  loginUser,
  logoutUser,
  resetPassword,
  resetPasswordToken,
  sendOtp,
} from "./operation/userApi";

export {
  loginUser,
  sendOtp,
  logoutUser,
  apiCall,
  resetPasswordToken,
  resetPassword,
  createPost,
  createComment,
};

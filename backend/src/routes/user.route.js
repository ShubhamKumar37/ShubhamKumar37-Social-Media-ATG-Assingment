import { Router } from 'express';
import {
  loginUser,
  logoutUser,
  resetPassword,
  resetPasswordToken,
  sendOtp,
  signupUser,
} from '../controllers/index.js';
import { auth } from '../middlewares/auth.middleware.js';

const userRoute = Router();

userRoute.post('/', signupUser); // Working
userRoute.put('/', loginUser); // Working
userRoute.delete('/', auth, logoutUser); // Workging
userRoute.post('/reset-password', resetPasswordToken);
userRoute.put('/reset-password', resetPassword);
userRoute.post('/send-otp', sendOtp); // Working
export default userRoute;

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

userRoute.post('/', signupUser);
userRoute.put('/', loginUser);
userRoute.delete('/', auth, logoutUser);
userRoute.post('/reset-password', resetPasswordToken);
userRoute.put('/reset-password', resetPassword);
userRoute.post('/send-otp', sendOtp);

export default userRoute;

import { OTP, User } from '../models/index.js';
import { ApiError, ApiResponse, asyncHandler } from '../utils/index.js';
import jwt from 'jsonwebtoken';
import otpGenerate from 'otp-generator';

const cookieOptions = {
  expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
  secure: true,
  httpOnly: true,
};

const sendOtp = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email || !email.trim()) throw new ApiError(400, 'Email is required');

  const userExist = await User.findOne({ email });
  if (userExist) throw new ApiError(404, 'User already exist');

  const otp = otpGenerate.generate(6, { upperCase: true, specialChars: true });
  const createOtp = await OTP.create({ email, otp });

  createOtp.message = 'Just remove the otp when in production';

  return res
    .status(200)
    .json(new ApiResponse(200, 'OTP sent successfully', createOtp));
});

const loginUser = asyncHandler(async (req, res) => {
  const { userName, password } = req.body;

  if (!userName || !userName.trim())
    throw new ApiError(400, 'Username is required');
  if (!password || !password.trim())
    throw new ApiError(400, 'Password is required');

  const userExist = await User.findOne({ userName }).select(
    '-passwordResetToken -passwordTokenExpiry'
  );

  if (!userExist) throw new ApiError(401, 'User does not exist');

  const isPasswordCorrect = await userExist.isPasswordCorrect(password);
  if (!isPasswordCorrect) throw new ApiError(401, 'Invalid credentials');

  const token = jwt.sign(
    {
      _id: userExist._id,
      avatar: userExist.avatar,
      email: userExist.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );

  userExist.token = token;

  await userExist.save();
  userExist.password = undefined;

  res.cookie('token', token, cookieOptions);
  return res
    .status(200)
    .json(new ApiResponse(200, 'User logged in successfully', userExist));
});

const signupUser = asyncHandler(async (req, res) => {
  const { userName, email, password, otp } = req.body;

  if (!userName || !userName.trim())
    throw new ApiError(400, 'Username is required');
  if (!email || !email.trim()) throw new ApiError(400, 'Email is required');
  if (!password || !password.trim())
    throw new ApiError(400, 'Password is required');
  if (!otp || !otp.trim()) throw new ApiError(400, 'OTP is required');

  const userEmailExist = await User.findOne({ email });
  const userNameExist = await User.findOne({ userName });
  const otpExist = await OTP.findOne({ email, otp })
    .sort({ createdAt: -1 })
    .limit(1);

  if (userEmailExist) throw new ApiError(400, 'Email already exist');
  if (userNameExist) throw new ApiError(400, 'Username already exist');
  if (!otpExist) throw new ApiError(400, 'Invalid OTP or OTP has expired');

  const user = await User.create({ userName, email, password });

  return res
    .status(200)
    .json(new ApiResponse(200, 'User created successfully', user));
});

const logoutUser = asyncHandler(async (_, res) => {
  res.clearCookie('token', { secure: true, httpOnly: true });
  return res
    .status(200)
    .json(new ApiResponse(200, 'User logged out successfully'));
});

export { loginUser, sendOtp, signupUser, logoutUser };

import jwt from 'jsonwebtoken';
import { asyncHandler } from '../utils/index.js';

export const auth = asyncHandler(async (req, res, next) => {
  const token =
    req.cookies.token ||
    req.body.token ||
    (req && req.header && req.header('Authorization'))
      ? req.header('Authorization').replace('Bearer ', '')
      : null;
  if (!token)
    return res
      .status(401)
      .json({ success: false, message: 'You are not logged in' });

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = decoded;
  next();
});

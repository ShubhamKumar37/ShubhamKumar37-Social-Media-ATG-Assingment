import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils";

export const auth = asyncHandler(async (req, res, next) => {
    const token = req.cookies.token || req.body.token || req.headers("Authorization").replace("Bearer ", "");
    if (!token) return res.status(401).json({ success: false, message: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
});
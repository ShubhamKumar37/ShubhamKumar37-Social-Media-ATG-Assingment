import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice.js";
import userSlice from "./slices/userSlice.js";
import postSlice from "./slices/postSlice.js";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
    post: postSlice,
  },
});

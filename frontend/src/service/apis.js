export const userAuthApis = {
  LOGIN_USER: "/user",
  LOGOUT_USER: "/user",
  SIGNUP_USER: "/user",
  RESET_PASSWORD_TOKEN: "/user/reset-password",
  RESET_PASSWORD: "/user/reset-password",
  SEND_OTP: "/user/send-otp",
};

export const postApis = {
  GET_ALL_POST: "/post",
  GET_POST: "/post",
  CREATE_POST: "/post",
  UPDATE_POST_THUMBNAIL: "/post/:postId",
  UPDATE_POST_CONTENT: "/post/:postId",
  DELETE_POST: "/post/:postId",
};

export const commentApis = {
  CREATE_COMMENT: "/comment/:postId",
  DELETE_COMMENT: "/comment/:commentId",
  UPDATE_COMMENT: "/comment/:commentId",
  TOGGLE_LIKE: "/comment/:postId",
};

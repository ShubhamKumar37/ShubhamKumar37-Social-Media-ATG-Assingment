import { userAuthApis } from "../apis.js";
import { apiCall } from "../apiConnector";
import { toastHandler } from "../../utils/toastHandler.js";
import {
  setAvatar,
  setSignupData,
  setToken,
  setUserData,
} from "../../redux/slices/index.js";

const {
  LOGIN_USER,
  SEND_OTP,
  LOGOUT_USER,
  SIGNUP_USER,
  RESET_PASSWORD_TOKEN,
  RESET_PASSWORD,
} = userAuthApis;

// Incomplete
export const loginUser = (credentials, navigate) => {
  return async (dispatch) => {
    try {
      const res = apiCall("put", LOGIN_USER, credentials);
      const response = await toastHandler(
        res,
        "Logging in...",
        "Logged in successfully",
        "Fail to login"
      );

      console.log("This si user = ", response);
      if (response.status === 200) {
        dispatch(setToken(response?.data?.data?.token));
        dispatch(setUserData(response?.data?.data));
        dispatch(setAvatar(response?.data?.data?.avatar));
      }
      navigate("/");
    } catch (error) {
      console.log("Error occur while fetching user (getUser.js) :: ", error);
    }
  };
};

export const sendOtp = (userData, navigate) => {
  return async (dispatch) => {
    const res = apiCall("post", SEND_OTP, { email: userData.email });
    await toastHandler(
      res,
      "Sending OTP...",
      "OTP send successfully",
      "Fail to send OTP"
    );
    console.log("This is the response for send otp = ", res);

    dispatch(setSignupData(userData));

    navigate("/verify-email");
  };
};

export const signupUser = (userData, navigate) => {
  return async (dispatch) => {
    const res = apiCall("post", SIGNUP_USER, userData);
    const response = await toastHandler(
      res,
      "Signing up...",
      "Signed up successfully",
      "Fail to signup"
    );

    if (response?.status === 200) {
      dispatch(setSignupData(null));
      console.log("This is the signup response = ", response);
    }
    navigate("/login");
  };
};

export const logoutUser = (navigate) => {
  return async (dispatch) => {
    const res = apiCall("delete", LOGOUT_USER);
    const response = await toastHandler(
      res,
      "Logging out...",
      "Logged out successfully",
      "Fail to logout"
    );

    if (response.status === 200) {
      dispatch(setToken(null));
      dispatch(setUserData(null));
      dispatch(setAvatar(null));
    }

    localStorage.clear();

    navigate("/");
  };
};

export const resetPasswordToken = (email) => {
  return async (dispatch) => {
    const res = apiCall("post", RESET_PASSWORD_TOKEN, { email });
    const response = await toastHandler(
      res,
      "Sending Reset Link...",
      "Link send successfully",
      "Fail to send link"
    );
    console.log("This is the response for reset password = ", response);
  };
};

export const resetPassword = (newPass, navigate) => {
  return async (dispatch) => {
    const res = apiCall("put", RESET_PASSWORD, {
      password: newPass.password,
      token: newPass.token,
    });
    await toastHandler(
      res,
      "Resetting Password...",
      "Password reset successfully",
      "Fail to reset password (token expired)"
    );

    navigate("/login");
  };
};

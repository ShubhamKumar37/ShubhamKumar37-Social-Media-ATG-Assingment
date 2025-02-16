import React, { useState } from "react";
import OtpInput from "react-otp-input";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../../service/operation/userApi";

const OTPForm = () => {
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signupData = useSelector((state) => state.auth.signupData);

  const handleOtpChange = (otpValue) => {
    setOtp(otpValue);
  };

  const handleSubmit = () => {
    if (otp.length === 6) {
      console.log(`OTP entered: ${otp}`);

      const signupDataWithOtp = { ...signupData, otp: otp };

      dispatch(signupUser(signupDataWithOtp, navigate));
    } else {
      alert("Please enter a valid 6-digit OTP.");
      console.log("Please enter a valid 6-digit OTP.");
    }
  };

  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-50'>
      <div className='w-96 rounded-lg bg-white p-8 shadow-lg'>
        <h2 className='mb-6 text-center text-2xl font-semibold text-blue-600'>
          Enter OTP
        </h2>

        <OtpInput
          value={otp}
          onChange={handleOtpChange}
          numInputs={6} // 6 input fields for OTP
          separator={<span>-</span>} // Optional separator between OTP fields
          shouldAutoFocus
          renderInput={(props) => (
            <input
              {...props}
              className='h-16 w-16 rounded-lg border-2 border-gray-600 text-center text-2xl focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500'
              style={{ width: "3rem", height: "3rem", margin: "0 4px" }}
            />
          )}
        />

        <button
          onClick={handleSubmit}
          className='mt-6 w-full rounded-lg bg-blue-600 p-3 text-white transition duration-200 hover:bg-blue-700'
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default OTPForm;

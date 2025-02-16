import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Input } from "../index.js";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sendOtp } from "../../service/index.js";

const SignupForm = () => {
  const methods = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [confirmShowPassword, setConfirmShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const togglePassword = () => setShowPassword(!showPassword);
  const toggleConfirmPassword = () =>
    setConfirmShowPassword(!confirmShowPassword);

  const submitSignupForm = (data) => {
    // data.accountType = role;
    console.log("This is signup form data = ", data);
    if (data.password !== data.confirmPassword) {
      toast.error("Incorrect password");
      return;
    }

    dispatch(sendOtp(data, navigate));
  };

  return (
    <div className='mx-auto w-9/12 rounded-lg p-3 shadow-lg'>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(submitSignupForm)}
          className='flex flex-col gap-6'
        >
          <Input
            type={"text"}
            placeholder={"Enter user name"}
            name={"userName"}
            label={
              <>
                Enter a user name
                <sup className='text-[13px] text-[#F5004F]'>*</sup>
              </>
            }
          />
          <Input
            type={"email"}
            placeholder={"Enter your email"}
            name={"email"}
            label={
              <>
                Email Address
                <sup className='text-[13px] text-[#F5004F]'>*</sup>
              </>
            }
          />

          <div className='relative'>
            <Input
              name={"password"}
              type={`${showPassword ? "text" : "password"}`}
              placeholder={"Enter your password"}
              label={
                <>
                  Password
                  <sup className='text-[13px] text-[#F5004F]'>*</sup>
                </>
              }
            />
            <span className='absolute right-4 top-[58%] z-10 cursor-pointer'>
              {showPassword ? (
                <IoMdEyeOff onClick={togglePassword} />
              ) : (
                <IoMdEye onClick={togglePassword} />
              )}
            </span>
          </div>
          <div className='relative'>
            <Input
              name={"confirmPassword"}
              type={`${confirmShowPassword ? "text" : "password"}`}
              placeholder={"Enter your confirm password"}
              label={
                <>
                  Confirm Password
                  <sup className='text-[13px] text-[#F5004F]'>*</sup>
                </>
              }
            />
            <span className='absolute right-4 top-[58%] z-10 cursor-pointer'>
              {confirmShowPassword ? (
                <IoMdEyeOff onClick={toggleConfirmPassword} />
              ) : (
                <IoMdEye onClick={toggleConfirmPassword} />
              )}
            </span>
          </div>

          <button
            type='submit'
            className='mx-auto w-fit rounded-md bg-blue-500 px-6 py-3 text-white transition duration-200 hover:bg-blue-600'
          >
            Signup
          </button>
        </form>
      </FormProvider>
    </div>
  );
};

export default SignupForm;

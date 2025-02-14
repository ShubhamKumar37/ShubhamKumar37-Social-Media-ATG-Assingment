import React, { useState } from "react";
import { Input } from "../index.js";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetPassword } from "../../service/index.js";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const methods = useForm();
  const token = useParams();
  const [showPassword, setShowPassword] = useState(false);
  const [confirmShowPassword, setConfirmShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const togglePassword = () => setShowPassword(!showPassword);
  const toggleConfirmPassword = () =>
    setConfirmShowPassword(!confirmShowPassword);

  const changePass = (data) => {
    data.token = token.token;
    if (data.password !== data.confirmPassword) {
      toast.error("Password doesnot match");
      return null;
    }
    console.log(data);
    dispatch(resetPassword(data, navigate));
  };

  return (
    <div>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(changePass)} className='space-y-6'>
          <div className='relative'>
            <Input
              name={"password"}
              type={`${showPassword ? "text" : "password"}`}
              placeholder={"Enter your password"}
              label={
                <>
                  Password
                  <sup className='text-[13px] text-[#F5004F]'> *</sup>
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
              placeholder={"Confirm your password"}
              label={
                <>
                  Confirm Password
                  <sup className='text-[13px] text-[#F5004F]'> *</sup>
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
            className='w-fit rounded-md bg-blue-500 px-6 py-3 text-white transition duration-200 hover:bg-blue-600'
          >
            Submit
          </button>
        </form>
      </FormProvider>
    </div>
  );
};

export default ResetPassword;

import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Input } from "../index.js";
import { useDispatch } from "react-redux";
import { resetPasswordToken } from "../../service/index.js";

const ForgetPassword = () => {
  const methods = useForm();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    dispatch(resetPasswordToken(data.email));
  };

  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-50'>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className='w-96 rounded-lg bg-white p-8 shadow-lg'
        >
          <h2 className='mb-4 text-center text-2xl font-bold text-blue-600'>
            Forgot Password
          </h2>
          <Input label='Email' name='email' type='email' required={true} />

          <button
            type='submit'
            className='mt-6 w-full rounded-lg bg-blue-600 p-3 text-white transition duration-200 hover:bg-blue-700'
          >
            Send Reset Link
          </button>
        </form>
      </FormProvider>
    </div>
  );
};

export default ForgetPassword;

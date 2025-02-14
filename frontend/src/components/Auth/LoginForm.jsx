import React, { useState } from 'react'
import {Input} from '../index.js'
import { Link, useNavigate } from 'react-router-dom'
import { FormProvider, useForm } from "react-hook-form";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useDispatch } from "react-redux";

const LoginForm = () => {

    const methods = useForm();
    // const dispatch = useDispatch();
    // const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const togglePassword = () => setShowPassword(!showPassword);

    const submitLoginForm = async (data) => {
        console.log("This is login form data = ", data);
        // dispatch(loginUser(data, navigate));
    };

    return (
        <div>
            <FormProvider {...methods}>
                <form
                    onSubmit={methods.handleSubmit(submitLoginForm)}
                    className='flex flex-col gap-6'
                >
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
                        <span className='absolute right-4 top-[60%] z-10 cursor-pointer'>
                            {showPassword ? (
                                <IoMdEyeOff onClick={togglePassword} />
                            ) : (
                                <IoMdEye onClick={togglePassword} />
                            )}
                        </span>
                    </div>

                    <button className='bg-blue-500 text-white'>Submit</button>

                </form>
            </FormProvider>
        </div>
    )
}

export default LoginForm
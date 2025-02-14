import React from "react";
import { LoginForm, SingupForm } from "../components";

const AuthPage = ({ flag }) => {
  return (
    <div className='mt-[4rem] flex w-full items-center justify-center'>
      {flag ? <LoginForm /> : <SingupForm />}
    </div>
  );
};

export default AuthPage;

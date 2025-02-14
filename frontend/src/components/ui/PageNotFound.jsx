import React from "react";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <div className='flex h-screen items-center justify-center bg-gray-50'>
      <div className='text-center'>
        <h1 className='text-6xl font-bold text-blue-600'>404</h1>
        <p className='text-2xl text-gray-600'>Page Not Found</p>
        <button
          className='mt-10 rounded-md bg-blue-500 px-6 py-3 text-white transition duration-200 hover:bg-blue-600'
          onClick={() => navigate("/")}
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default PageNotFound;

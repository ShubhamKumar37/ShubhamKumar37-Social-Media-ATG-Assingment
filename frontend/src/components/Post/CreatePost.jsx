import React from "react";
import { Input, TinyMCEEditor } from "../index.js";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createPost } from "../../service/index.js";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const methods = useForm();
  const { control, handleSubmit } = methods;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Submit logic
  const onSubmit = (data) => {
    console.log("Form Data on Submit:", data);

    const formData = new FormData();
    formData.append("thumbnail", data.thumbnail[0]);
    formData.append("title", data.title);
    formData.append("description", JSON.stringify(data.description));

    dispatch(createPost(formData, navigate));
  };

  return (
    <div className='mx-auto max-w-2xl rounded-lg border border-gray-300 p-6 shadow-md'>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
          {/* Thumbnail Input */}
          <div className='flex flex-col'>
            <Input
              label='Thumbnail'
              name='thumbnail'
              type='file'
              required={true}
              className='rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
              accept='image/*'
            />
          </div>

          {/* Title Input */}
          <div className='flex flex-col'>
            <Input
              label='Title'
              name='title'
              type='text'
              required={true}
              className='rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          {/* TinyMCE Editor */}
          <div className='flex flex-col'>
            <label
              htmlFor='description'
              className='mb-2 text-sm font-semibold text-gray-700'
            >
              Description
            </label>
            <TinyMCEEditor
              control={control}
              name='description'
              defaultValue='Write you description'
            />
          </div>

          {/* Submit Button */}
          <button
            type='submit'
            className='w-full rounded-md bg-blue-500 py-2 font-semibold text-white transition duration-200 hover:bg-blue-600'
          >
            Submit
          </button>
        </form>
      </FormProvider>
    </div>
  );
};

export default CreatePost;

import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { Input, TinyMCEEditor } from "../index.js";
import { apiCall } from "../../service";
import toast from "react-hot-toast";
import { postApis } from "../../service/apis";

const { GET_POST, UPDATE_POST_CONTENT, UPDATE_POST_THUMBNAIL } = postApis;

const UpdatePost = () => {
  const { postId } = useParams(); // Get the postId from URL
  const navigate = useNavigate();
  const [post, setPost] = useState(null); // Local state to hold the post data

  const [imageFile, setImageFile] = useState(null);
  const [loadingContent, setLoadingContent] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);

  const contentMethods = useForm({
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const imageMethods = useForm();

  const {
    handleSubmit: handleContentSubmit,
    control: contentControl,
    setValue,
  } = contentMethods;
  const { handleSubmit: handleImageSubmit } = imageMethods;

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await apiCall("get", `${GET_POST}/${postId}`);
        const postData = response.data.data;
        setPost(postData);
        setValue("title", postData.title);
        setValue("description", JSON.parse(postData.description));
        console.log("This is the post data = ", postData);
      } catch (error) {
        toast.error("Failed to fetch post data");
        console.error("Error fetching post data: ", error);
      }
    };

    fetchPostData();
  }, [postId, setValue]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImageFile(file);
    } else {
      toast.error("Please select a valid image file");
    }
  };

  const onSubmitContent = async (data) => {
    setLoadingContent(true);
    const loadingToast = toast.loading("Updating post content...");
    try {
      const updatedContent = {
        postId,
        title: data.title,
        description: JSON.stringify(data.description),
      };

      await apiCall(
        "put",
        `${UPDATE_POST_CONTENT}/${postId}`,
        updatedContent
      );
      toast.success("Post content updated successfully", { id: loadingToast });

      navigate(`/`);
    } catch (error) {
      toast.error("Failed to update content", { id: loadingToast });
      console.error("Error updating content:", error);
    } finally {
      setLoadingContent(false);
    }
  };

  const onSubmitImage = async () => {
    if (!imageFile) {
      toast.error("Please select an image to upload");
      return;
    }

    setLoadingImage(true);
    const loadingToast = toast.loading("Uploading image...");

    try {
      const formData = new FormData();
      formData.append("thumbnail", imageFile);

      const response = await apiCall(
        "patch",
        `${UPDATE_POST_THUMBNAIL}/${postId}`,
        formData
      );
      console.log("Image uploaded successfully:", response.data);
      toast.success("Thumbnail uploaded successfully", { id: loadingToast });
      navigate("/");
    } catch (error) {
      toast.error("Failed to upload image", { id: loadingToast });
      console.error("Error uploading image:", error);
    } finally {
      setLoadingImage(false);
    }
  };

  return (
    <div className='mx-auto my-6 max-w-2xl rounded-lg border bg-white p-4 shadow-md'>
      <h2 className='mb-4 text-2xl font-semibold'>Update Post</h2>

      {/* Content Form (Title & Description) */}
      <FormProvider {...contentMethods}>
        <form onSubmit={handleContentSubmit(onSubmitContent)}>
          <h3 className='mb-3 text-lg font-semibold'>Post Content</h3>

          <Input name='title' label='Title' placeholder='Enter the title' />

          <div className='mb-4'>
            <label className='mb-2 block text-sm font-semibold'>
              Description
            </label>
            <TinyMCEEditor
              control={contentControl}
              name='description'
              defaultValue={post?.description || ""}
            />
          </div>

          <button
            type='submit'
            className='rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600'
            disabled={loadingContent}
          >
            {loadingContent ? "Updating..." : "Update Content"}
          </button>
        </form>
      </FormProvider>

      <hr className='my-6' />

      {/* Image Upload Form */}
      <FormProvider {...imageMethods}>
        <form onSubmit={handleImageSubmit(onSubmitImage)}>
          <h3 className='mb-3 text-lg font-semibold'>Post Thumbnail</h3>

          <div className='mb-4'>
            <label className='mb-2 block text-sm font-semibold'>
              Upload Image
            </label>
            <input
              type='file'
              accept='image/*'
              onChange={handleImageChange}
              className='rounded-md border border-gray-300 p-2'
            />
          </div>

          <button
            type='submit'
            className='rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600'
            disabled={loadingImage}
          >
            {loadingImage ? "Uploading..." : "Upload Image"}
          </button>
        </form>
      </FormProvider>
    </div>
  );
};

export default UpdatePost;

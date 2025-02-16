import React, { useEffect, useState } from "react";
import { postApis } from "../../service/apis";
import { apiCall } from "../../service";
import toast from "react-hot-toast";
import Post from "./Post";
import { useSelector } from "react-redux";
import { IoAddCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const { GET_ALL_POST } = postApis;

const AllPost = () => {
  const [allPosts, setAllPosts] = useState(null);
  const userData = useSelector((state) => state.user.userData);
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();

  useEffect(() => {
    const getAllPost = async () => {
      try {
        let userId = userData?._id || "5f1d7d7c081234567890abcd";

        const response = await apiCall("get", `${GET_ALL_POST}/${userId}`);
        setAllPosts(response.data.data);
      } catch (error) {
        toast.error("Server Error");
        console.error("Error fetching posts: ", error);
      }
    };

    getAllPost();
  }, [userData]);

  return (
    <div className='flex flex-col justify-center gap-2'>
      <h1 className='text-center text-2xl font-bold'>
        Scroll down {token && "to add your post"}
      </h1>
      {token && (
        <button
          onClick={() => navigate("/create-post")}
          className='mx-auto w-fit text-3xl'
        >
          <IoAddCircleOutline />
        </button>
      )}

      {allPosts && allPosts.length > 0 ? (
        allPosts.map((post) => <Post key={post._id} item={post} />)
      ) : (
        <p className='mt-4 text-center text-gray-500'>
          No posts available. {token && "Be the first to add one!"}
        </p>
      )}
    </div>
  );
};

export default AllPost;

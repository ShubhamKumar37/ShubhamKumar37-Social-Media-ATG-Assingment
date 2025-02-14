import React, { useEffect, useState } from "react";
import { postApis } from "../../service/apis";
import { apiCall } from "../../service";
import toast from "react-hot-toast";
import Post from "./Post";

const { GET_ALL_POST } = postApis;
const AllPost = () => {
  const [allPosts, setAllPosts] = useState(null);

  const getAllPost = async () => {
    try {
      const response = await apiCall("get", GET_ALL_POST);
      setAllPosts(response.data.data);

      console.log(
        "This is the all post fetch in AllPost.jsx = ",
        typeof response.data,
        response.data.data
      );
    } catch (error) {
      toast.error("Server Error");
      console.log("Error occur while fetching user (getUser.js) :: ", error);
    }
  };

  useEffect(() => {
    getAllPost();
  }, []);

  return (
    <div>
      This is all Post
      {allPosts && allPosts.map((post) => <Post key={post._id} item={post} />)}
    </div>
  );
};

export default AllPost;

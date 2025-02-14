import { toastHandler } from "../../utils/toastHandler.js";
import { apiCall } from "../index.js";
import { commentApis, postApis } from "../apis";

const { CREATE_POST } = postApis;
const { CREATE_COMMENT } = commentApis;

export const createPost = (data, navigate) => {
  return async () => {
    const res = apiCall("post", CREATE_POST, data);
    const response = await toastHandler(
      res,
      "Creating Post...",
      "Post created successfully",
      "Fail to create post"
    );

    console.log("This is the response for create post = ", response);
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };
};

export const createComment = (data) => {
  return async () => {
    const res = apiCall("post", `${CREATE_COMMENT}/${data.postId}`, data);
    const response = await toastHandler(
      res,
      "Creating Comment...",
      "Comment created successfully",
      "You already commented on this post or something went wrong"
    );
    console.log("This is the response for create comment = ", response);
  };
};

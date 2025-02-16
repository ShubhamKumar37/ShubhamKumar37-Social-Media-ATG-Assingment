import React, { useState } from "react";
import { FaHeart, FaRegHeart, FaTimes, FaEdit, FaTrash } from "react-icons/fa"; // Add FaTrash for delete icon
import { apiCall, createComment } from "../../service";
import { postApis, commentApis } from "../../service/apis";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { setDescription, setTitle } from "../../redux/slices";

const { GET_POST, DELETE_POST } = postApis;
const { DELETE_COMMENT, TOGGLE_LIKE } = commentApis;

const Post = ({ item }) => {
  const dispatch = useDispatch();
  // console.log(item);
  const [liked, setLiked] = useState(item.liked || false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allComments, setAllComments] = useState(null);
  const [newComment, setNewComment] = useState(""); // State to hold the new comment text
  const [isCommentInputOpen, setIsCommentInputOpen] = useState(false); // State to control the visibility of the comment input field
  const userData = useSelector((state) => state.user.userData);
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate(); // Initialize navigate

  const toggleLike = async () => {
    setLiked(!liked);
    try {
      const response = await apiCall("patch", `${TOGGLE_LIKE}/${item._id}`);
      if (response.status === 200 && !liked) {
        toast.success("Post liked");
      } else if (response.status === 201 && liked) {
        toast.success("Post unliked");
      } else {
        toast.error("Failed to like post");
      }
    } catch (error) {
      toast.error("Failed to like post");
      console.error("Error liking post: ", error);
    }
  };

  const openModal = async () => {
    setIsModalOpen(true);
    try {
      const response = await apiCall("get", `${GET_POST}/${item._id}`);
      setAllComments(response.data.data);
    } catch (error) {
      toast.error("Failed to fetch comments");
      console.error("Error fetching comments: ", error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const deleteComment = async (commentId) => {
    try {
      await apiCall("delete", `${DELETE_COMMENT}/${commentId}`, {
        postId: item._id,
      });
      if (allComments?.comments && Array.isArray(allComments.comments)) {
        const updatedComments = allComments.comments.filter(
          (com) => com._id !== commentId
        );
        setAllComments({ ...allComments, comments: updatedComments }); // Update the comments state
      }
      toast.success("Comment deleted");
    } catch (error) {
      toast.error("Failed to delete comment");
      console.error("Error deleting comment: ", error);
    }
  };

  const navigateToEditPage = () => {
    dispatch(setTitle(item.title));
    dispatch(setDescription(JSON.stringify(item.description)));
    navigate(`/edit-post/${item._id}`);
  };

  const openCommentModal = () => {
    setIsCommentInputOpen(true);
  };

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const submitComment = async () => {
    if (newComment.trim()) {
      dispatch(
        createComment({
          content: newComment,
          postId: item._id,
        })
      );
      setNewComment("");
      setIsCommentInputOpen(false);
      window.location.reload();
    } else {
      toast.error("Comment cannot be empty");
    }
  };

  const handleDeletePost = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        const response = await apiCall("delete", `${DELETE_POST}/${item._id}`);
        console.log("This is the response of delete post = ", response);
        toast.success("Post deleted successfully");
        setIsModalOpen(false);
        window.location.reload();

        navigate("/");
      } catch (error) {
        toast.error("Failed to delete post");
        console.error("Error deleting post: ", error);
      }
    }
  };

  function isValidJSON(str) {
    try {
      JSON.parse(str);
      return true;
    } catch (e) {
      return false;
    }
  }

  return (
    <>
      <div
        onClick={openModal}
        className='mx-auto my-4 w-full max-w-md cursor-pointer rounded-lg bg-white p-4 shadow-lg'
      >
        <img
          src={item.thumbnail}
          alt={item.title}
          className='mb-4 h-48 w-full rounded-md object-cover'
        />
        <div>
          <h3 className='text-xl font-semibold text-gray-800'>{item.title}</h3>
        </div>
        <div className='mt-2 rounded-md p-1 text-gray-600 shadow-lg'>
          {isValidJSON(item.description) ? (
            <p
              dangerouslySetInnerHTML={{ __html: JSON.parse(item.description) }}
            ></p>
          ) : (
            item.description
          )}
        </div>

        {token && (
          <div
            onClick={(e) => {
              e.stopPropagation();
              toggleLike();
            }}
            className={`mt-4 w-fit cursor-pointer rounded-md ${liked ? "text-white" : "text-gray-700"}`}
          >
            {liked ? (
              <FaHeart className='mr-2 text-red-500' />
            ) : (
              <FaRegHeart className='mr-2 text-gray-700' />
            )}
          </div>
        )}

        <div className='mt-4 text-gray-600'>
          <span className='mr-2'>{item.comment.length} Comments</span>
        </div>

        {item.owner._id === userData?._id && (
          <div className='mt-2'>
            <button
              onClick={navigateToEditPage}
              className='mr-4 flex items-center text-blue-500 hover:text-blue-700'
            >
              <FaEdit className='mr-2' />
              Edit Post
            </button>

            <button
              onClick={handleDeletePost}
              className='flex items-center text-red-500 hover:text-red-700'
            >
              <FaTrash className='mr-2' />
              Delete Post
            </button>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='relative w-full max-w-lg rounded-lg bg-white p-6 shadow-lg'>
            <button
              className='absolute right-2 top-2 text-gray-600 hover:text-black'
              onClick={closeModal}
            >
              <FaTimes size={24} />
            </button>
            <h3 className='mb-4 text-xl font-semibold text-gray-800'>
              {item.title}
            </h3>
            <img
              src={item.thumbnail}
              alt={item.title}
              className='mb-4 h-48 w-full rounded-md object-cover'
            />
            <div className='mt-2 text-gray-600'>
              {isValidJSON(item.description) ? (
                <p
                  dangerouslySetInnerHTML={{
                    __html: JSON.parse(item.description),
                  }}
                ></p>
              ) : (
                item.description
              )}
            </div>

            {/* "Add Comment" functionality */}
            {token && (
              <h4
                onClick={openCommentModal}
                className='mb-2 cursor-pointer text-sm font-semibold'
              >
                Add Comment
              </h4>
            )}

            {/* Show input field for the comment */}
            {isCommentInputOpen && (
              <div className='mt-4'>
                <textarea
                  className='w-full rounded-md border border-gray-300 p-2'
                  placeholder='Write your comment...'
                  value={newComment}
                  onChange={handleCommentChange}
                ></textarea>
                <div className='mt-2 flex justify-end'>
                  <button
                    onClick={submitComment}
                    className='rounded-md bg-blue-500 px-4 py-2 text-white'
                  >
                    Submit Comment
                  </button>
                </div>
              </div>
            )}

            <h4 className='mb-2 text-lg font-semibold'>Comments</h4>
            <div className='max-h-60 overflow-y-auto'>
              {allComments && allComments.comments.length > 0 ? (
                allComments.comments.map((com) => (
                  <div
                    key={com._id}
                    className='flex items-center justify-between border-b p-2'
                  >
                    <div className='flex items-center'>
                      <img
                        src={com.owner.avatar}
                        alt={com.owner.username}
                        className='mr-2 h-8 w-8 rounded-full'
                      />
                      <div>
                        <p className='text-sm font-semibold'>
                          {com.owner.username}
                        </p>
                        <p className='text-sm text-gray-600'>{com.content}</p>
                      </div>
                    </div>
                    {com.owner._id === userData?._id && (
                      <button
                        onClick={() => deleteComment(com._id)}
                        className='text-sm text-red-500'
                      >
                        Delete
                      </button>
                    )}
                  </div>
                ))
              ) : (
                <p className='text-gray-600'>No comments yet.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Post;

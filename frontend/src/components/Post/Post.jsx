import React, { useState, useEffect } from "react";
import { FaHeart, FaRegHeart, FaTimes } from "react-icons/fa";
import { apiCall } from "../../service";
import { postApis } from "../../service/apis";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const { GET_POST, DELETE_COMMENT } = postApis;

const Post = ({ item }) => {
    const [liked, setLiked] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [allComments, setAllComments] = useState(null);
    const userData = useSelector((state) => state.user.userData);

    const toggleLike = () => {
        setLiked(!liked);
    };

    const openModal = async () => {
        setIsModalOpen(true);
        try {
            const response = await apiCall("get", `${GET_POST}/${item._id}`);
            console.log("This is reposne = ", response.data.data);
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
        // try {
        //     await apiCall("delete", `${DELETE_COMMENT}/${commentId}`);
        //     setAllComments(allComments.filter(comment => comment._id !== commentId));
        //     toast.success("Comment deleted");
        // } catch (error) {
        //     toast.error("Failed to delete comment");
        //     console.error("Error deleting comment: ", error);
        // }
    };

    return (
        <>
            <div
                onClick={openModal}
                className='mx-auto my-4 max-w-md cursor-pointer rounded-lg bg-white p-4 shadow-lg'
            >
                <img
                    src={item.thumbnail}
                    alt={item.title}
                    className='mb-4 h-48 w-full rounded-md object-cover'
                />
                <h3 className='text-xl font-semibold text-gray-800'>{item.title}</h3>
                <p className='mt-2 text-gray-600'>{item.description}</p>
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
                <div className='mt-4 text-gray-600'>
                    <span className='mr-2'>{item.comment.length} Comments</span>
                </div>
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
                        <p className='mb-4 text-gray-600'>{item.description}</p>
                        <h4 className='mb-2 text-lg font-semibold'>Comments</h4>
                        <div className='max-h-60 overflow-y-auto'>
                            {allComments ? (
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

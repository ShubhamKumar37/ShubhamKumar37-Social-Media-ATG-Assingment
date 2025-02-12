import { Like, Post } from "../models";
import { ApiError, ApiResponse, asyncHandler, cloudinaryUpload } from "../utils";



// get - getPost, getAllPost
// post - createPost
// put - updatePostContent, updatePostThumbnail
// delete - deletePost

const getPost = asyncHandler(async (req, res) => {
    const { postId } = req.params;
    const limit = parseInt(req.query.limit) || 10;
    const skip = parseInt(req.query.skip) || 0;

    if (!postId || !postId.trim()) throw new ApiError(400, 'Post id is required');


    const postExist = await Post.findById(postId).populate([{
        path: 'comment',
        options: {
            limit: limit,
            skip: skip
        }
    },
    {
        path: "owner",
        select: "userName avatar"
    }
    ]);

    if (!postExist) throw new ApiError(404, 'Post not found');

    const likeCount = await Like.countDocuments({ post: postExist._id });
    postExist.likeCount = likeCount;

    return res.status(200).json(
        new ApiResponse(200, 'Post found successfully', postExist)
    );
});

const getAllPost = asyncHandler(async (req, res) => {
    const limit = parseInt(req.query.limit) || 20;
    const skip = parseInt(req.query.skip) || 0;

    const allPost = await Post.find({}).limit(limit).skip(skip).populate([{
        path: "owner",
        select: "userName avatar"
    }]);

    if (!getAllPost) throw new ApiError(404, 'Post not found');

    for (let i of getAllPost) {
        const likeCount = await Like.countDocuments({ post: i._id });
        i.likeCount = likeCount;
    }

    return res.status(200).json(
        new ApiResponse(200, 'All Post found successfully', allPost)
    );
});

const createPost = asyncHandler(async (req, res) => {
    const { title, description } = req.body;
    const thumbnail = req.file.path;
    const userId = req.user._id;

    if (!title || !title.trim()) throw new ApiError(400, 'Title is required');
    if (!description || !description.trim()) throw new ApiError(400, 'Description is required');
    if (!thumbnail || !thumbnail.trim()) throw new ApiError(400, 'Thumbnail is required');

    const cloudinaryResponse = await cloudinaryUpload(thumbnail, 'image');

    const newPost = await Post.create({ title, description, thumbnail: cloudinaryResponse.secure_url, owner: userId });

    return res.status(200).json(
        new ApiResponse(200, 'Post created successfully', newPost)
    );
});

const updatePostContent = asyncHandler(async (req, res) => { });

const updatePostThumbnail = asyncHandler(async (req, res) => { });

const deletePost = asyncHandler(async (req, res) => { });


export { getPost, getAllPost, createPost, updatePostContent, updatePostThumbnail, deletePost };
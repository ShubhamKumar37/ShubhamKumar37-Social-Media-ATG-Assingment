import { Comment, Like, Post } from '../models/index.js';
import {
  ApiError,
  ApiResponse,
  asyncHandler,
  cloudinaryDelete,
  cloudinaryUpload,
  getFilePublicId,
} from '../utils/index.js';

// get - getPost, getAllPost
// post - createPost
// put - updatePostContent, updatePostThumbnail
// delete - deletePost

const getPost = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const limit = parseInt(req.query.limit) || 20;
  const skip = parseInt(req.query.skip) || 0;

  if (!postId || !postId.trim()) throw new ApiError(400, 'Post id is required');

  const postExist = await Post.findById(postId).populate({
    path: 'owner',
    select: 'userName avatar',
  });

  const comments = await Comment.find({ post: postId })
    .limit(limit)
    .skip(skip * limit)
    .populate({
      path: 'owner',
      select: 'userName avatar',
    });
  const commentsCount = await Comment.countDocuments({ post: postId });
  postExist.comments = comments;
  postExist.commentsCount = commentsCount;

  if (!postExist) throw new ApiError(404, 'Post not found');

  const likeCount = await Like.countDocuments({ post: postExist._id });
  postExist.likeCount = likeCount;

  return res
    .status(200)
    .json(new ApiResponse(200, 'Post found successfully', postExist));
});

const getAllPost = asyncHandler(async (req, res) => {
  const limit = parseInt(req.query.limit) || 20;
  const skip = parseInt(req.query.skip) || 0;

  const allPost = await Post.find({})
    .limit(limit)
    .skip(skip)
    .populate([
      {
        path: 'owner',
        select: 'userName avatar',
      },
    ]);

  if (!getAllPost) throw new ApiError(404, 'Post not found');

  for (let i of getAllPost) {
    const likeCount = await Like.countDocuments({ post: i._id });
    i.likeCount = likeCount;
  }

  return res
    .status(200)
    .json(new ApiResponse(200, 'All Post found successfully', allPost));
});

const createPost = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  const thumbnail = req.file.path;
  const userId = req.user._id;

  if (!title || !title.trim()) throw new ApiError(400, 'Title is required');
  if (!description || !description.trim())
    throw new ApiError(400, 'Description is required');
  if (!thumbnail || !thumbnail.trim())
    throw new ApiError(400, 'Thumbnail is required');

  const cloudinaryResponse = await cloudinaryUpload(thumbnail, 'image');

  const newPost = await Post.create({
    title,
    description,
    thumbnail: cloudinaryResponse.secure_url,
    owner: userId,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, 'Post created successfully', newPost));
});

const updatePostContent = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  const { postId } = req.params;
  const userId = req.user._id;

  if (!title && !description)
    throw new ApiError(400, 'Provide atleast one field to update');
  if (!postId) throw new ApiError(400, 'Post id is required');

  const postOwner = await Post.findById(postId);
  if (!postOwner) throw new ApiError(404, 'Post not found');
  if (!postOwner.owner.equals(userId))
    throw new ApiError(401, 'You are not the owner of the post');

  const updateValue = {};
  if (title) updateValue.title = title;
  if (description) updateValue.description = description;

  const updatedPost = await Post.findByIdAndUpdate(
    postId,
    { $set: updateValue },
    { new: true }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, 'Post updated successfully', updatedPost));
});

const updatePostThumbnail = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const thumbnail = req.file;
  const userId = req.user._id;

  if (!postId) throw new ApiError(400, 'Post id is required');
  if (!thumbnail) throw new ApiError(400, 'Thumbnail is required');

  const postExist = await Post.findById(postId);
  if (!postExist) throw new ApiError(404, 'Post not found');
  if (!postExist.owner.equals(userId))
    throw new ApiError(401, 'You are not the owner of the post');

  await cloudinaryDelete(getFilePublicId(postExist.thumbnail), 'image');
  const cloudinaryResponse = await cloudinaryUpload(thumbnail.path, 'image');

  postExist.thumbnail = cloudinaryResponse.secure_url;
  await postExist.save();

  return res
    .status(200)
    .json(
      new ApiResponse(200, 'Post thumbnail updated successfully', postExist)
    );
});

const deletePost = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { postId } = req.params;

  const postExist = await Post.findById(postId);
  if (!postExist) throw new ApiError(404, 'Post not found');
  if (!postExist.owner.equals(userId))
    throw new ApiError(401, 'You are not the owner of the post');

  await cloudinaryDelete(getFilePublicId(postExist.thumbnail), 'image');
  await Post.findByIdAndDelete(postId);

  return res
    .status(200)
    .json(new ApiResponse(200, 'Post deleted successfully'));
});

export {
  getPost,
  getAllPost,
  createPost,
  updatePostContent,
  updatePostThumbnail,
  deletePost,
};

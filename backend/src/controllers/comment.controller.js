import { Comment, Like } from '../models/index.js';
import { ApiError, ApiResponse, asyncHandler } from '../utils/index.js';

// get - getAllComment,
// post - createComment,
// delete - deleteComment
// put - updateComment
// patch - toggleLike

const createComment = asyncHandler(async (req, res) => {
  const { content } = req.body;
  const { postId } = req.params;
  const userId = req.user._id;

  if (!content || !content.trim())
    throw new ApiError(400, 'Content is required');
  if (!postId || !postId.trim()) throw new ApiError(400, 'Post id is required');
  if (content.length > 700)
    throw new ApiError(400, 'Content exceeds maximum length');

  const postExist = await Post.findById(postId);
  if (!postExist) throw new ApiError(404, 'Post not found');
  if (postExist.comment.includes(userId))
    throw new ApiError(400, 'You have already commented on this post');

  const newComment = await Comment.create({
    content,
    owner: userId,
    post: postId,
  });
  postExist.comment.push(newComment._id);
  await postExist.save();
  postExist.newComment = newComment;

  return res
    .status(200)
    .json(new ApiResponse(200, 'Comment created successfully', postExist));
});

const deleteComment = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const userId = req.user._id;
  const { commentId } = req.body;

  if (!postId || !postId.trim()) throw new ApiError(400, 'Post id is required');
  if (!commentId || !commentId.trim())
    throw new ApiError(400, 'Comment id is required');

  const postExist = await Post.findById(postId);
  if (!postExist) throw new ApiError(404, 'Post not found');
  if (!postExist.comment.includes(userId))
    throw new ApiError(400, 'You are not the owner of the comment');

  const commentExist = await Comment.findByIdAndDelete(commentId);
  if (!commentExist) throw new ApiError(404, 'Comment not found');
  postExist.comment.pull(userId);
  await postExist.save();

  return res
    .status(200)
    .json(new ApiResponse(200, 'Comment deleted successfully', postExist));
});

const updateComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  const userId = req.user._id;
  const { content } = req.body;

  if (!content || !content.trim())
    throw new ApiError(400, 'Content is required');
  if (!commentId || !commentId.trim())
    throw new ApiError(400, 'Comment id is required');

  const commentExist = await Comment.findById(commentId);
  if (!commentExist) throw new ApiError(404, 'Comment not found');

  if (!commentExist.owner.equals(userId))
    throw new ApiError(401, 'You are not the owner of the comment');

  commentExist.content = content;
  commentExist.save();

  return res
    .status(200)
    .json(new ApiResponse(200, 'Comment updated successfully', commentExist));
});

const toggleLike = asyncHandler(async (req, res) => {
  const { postId } = req.body;
  const userId = req.user._id;

  if (!postId || !postId.trim()) throw new ApiError(400, 'Post id is required');
  const postExist = await Post.findById(postId);
  if (!postExist) throw new ApiError(404, 'Post not found');

  const like = await Like.findOneAndDelete({ owner: userId, post: postId });
  if (like) {
    return res
      .status(200)
      .json(new ApiResponse(200, 'Post unliked successfully'));
  }
  await Like.create({ owner: userId, post: postId });
  return res.status(200).json(new ApiResponse(200, 'Like added successfully'));
});

export { createComment, deleteComment, updateComment, toggleLike };

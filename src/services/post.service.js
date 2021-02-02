const {subDays} = require('date-fns');
const Post = require('../models/post');

/**
 * @output returns all posts in the database
 */
const getAllPosts = async () => {
  try {
    const posts = await Post.find().exec();
    return posts;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Create a post
 * @param {Object} postBody of newly creating post
 * @returns {Object} newly created post
 */
const createPost = async (postBody) => {
  const post = await Post.create(postBody);
  return post;
};

/**
 *
 * @param {String} id of the post
 * @returns {Object} post with id
 */
const getPostById = async (id) => {
  const post = await Post.findById(id);
  return post;
};

/**
 *
 * @param {Object} post is the actual db post
 * @param {Object} updatedPost contains updated information
 * @returns {Object} updated post
 */
const updatePost = async (post, updatedPost) => {
  if (!post) {
    throw new Error('Post not found');
  }

  Object.assign(post, updatedPost);
  await post.save();
  return post;
};

/**
 *
 * @param {Object} post is the actual db post
 * @returns {Object} post object with updated votes
 */
const upvotePost = async (post) => {
  if (!post) {
    throw new Error('Post not found');
  }

  post.votes += 1;
  await post.save();
  return post;
};

/**
 *
 * @param {String} channel name to look for relevant posts
 * @param {Number} topN fetches N number of posts, defaults to 3
 * @param {*} currentDate
 */
const getTopVotedPosts = async (
  channel,
  topN = 3,
  currentDate = Date.now()
) => {
  const fromDate = subDays(currentDate, 1).toISOString();
  const topPost = await Post.where({channel})
    .gte('date', fromDate)
    .sort({votes: 'desc', date: 'desc'})
    .limit(topN)
    .exec();
  return topPost;
};

module.exports = {
  createPost,
  getPostById,
  updatePost,
  upvotePost,
  getAllPosts,
  getTopVotedPosts,
};

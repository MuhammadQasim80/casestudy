var express = require('express');
var router = express.Router();

const PostService = require('../services/post.service');
const EmailService = require('../services/email.service');
const votes = require('./vote');

/**
 * @route to get all posts
 * @returns list of all posts
 */
router.get('/', async function (req, res) {
  const posts = await PostService.getAllPosts();
  res.send(posts);
});

/**
 * @route to get top posts by given channel
 * @returns top posts
 */
router.get('/:channel/top', async function (req, res) {
  const posts = await PostService.getTopVotedPosts(req.params.channel);
  res.send(posts);
});

/**
 * @route to create a new post
 * @returns new post
 */
router.post('/', async function (req, res) {
  const post = await PostService.createPost(req.body);
  res.send(post);
});

/**
 * @resolves id param and sets post with req object
 */
router.param('id', async (req, res, next, id) => {
  const post = await PostService.getPostById(id);
  if (post) {
    req.post = post;
    next();
  } else {
    res.send(`Post ${id} not found`);
  }
});

/**
 * @baseRoutePath upvotes a post
 */
router.use('/:id/upvote', votes);

module.exports = router;

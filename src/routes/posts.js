var express = require('express');
var router = express.Router();

const PostService = require('../services/post.service');
const votes = require('./vote');

/**
 * @route to get all posts
 * @returns list of all posts
 */
router.get('/', async function (req, res) {
  try {
    const posts = await PostService.getAllPosts();
    res.send(posts);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

/**
 * @route to get top posts by given channel
 * @returns top posts
 */
router.get('/:channel/top', async function (req, res) {
  try {
    const posts = await PostService.getTopVotedPosts(req.params.channel);
    res.send(posts);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

/**
 * @route to create a new post
 * @returns new post
 */
router.post('/', async function (req, res) {
  try {
    const post = await PostService.createPost(req.body);
    res.send(post);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

/**
 * @resolves id param and sets post with req object
 */
router.param('id', async (req, res, next, id) => {
  try {
    const post = await PostService.getPostById(id);
    if (post) {
      req.post = post;
      next();
    } else {
      res.status(404).send(`Post ${id} not found`);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

/**
 * @baseRoutePath upvotes a post
 */
router.use('/:id/upvote', votes);

module.exports = router;

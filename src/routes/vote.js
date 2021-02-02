var express = require('express');
var router = express.Router();

const PostService = require('../services/post.service');

/**
 * @route to upvote a post
 */
router.post('/', async function (req, res) {
  try {
    const post = await PostService.upvotePost(req.post);
    res.send(post);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;

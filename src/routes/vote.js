var express = require('express');
var router = express.Router();

const PostService = require('../services/post.service');

/**
 * @route to upvote a post
 */
router.post('/', async function (req, res) {
  const post = await PostService.upvotePost(req.post);
  res.send(post);
});

module.exports = router;

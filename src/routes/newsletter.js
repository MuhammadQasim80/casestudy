var express = require('express');
var router = express.Router();

const UserService = require('../services/user.service');

/**
 * @route to subscribe newsletter
 */
router.post('/subscribe', async function (req, res) {
  const user = await UserService.subscribeNewsletter(req.user, true);
  res.send(user);
});

/**
 * @route to unsubscribe newsletter
 */
router.post('/unsubscribe', async function (req, res) {
  const user = await UserService.subscribeNewsletter(req.user, false);
  res.send(user);
});

module.exports = router;

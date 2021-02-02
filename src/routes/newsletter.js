var express = require('express');
var router = express.Router();

const UserService = require('../services/user.service');

/**
 * @route to subscribe newsletter
 */
router.post('/subscribe', async function (req, res) {
  try {
    const user = await UserService.subscribeNewsletter(req.user, true);
    res.send(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

/**
 * @route to unsubscribe newsletter
 */
router.post('/unsubscribe', async function (req, res) {
  try {
    const user = await UserService.subscribeNewsletter(req.user, false);
    res.send(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;

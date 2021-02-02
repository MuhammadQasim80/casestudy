var express = require('express');
var router = express.Router();

const UserService = require('../services/user.service');

/**
 * @route to set user's favorite channels
 */
router.post('/', async function (req, res) {
  const user = await UserService.setUserFavorites(req.user, req.body.favorites);
  res.send(user);
});

/**
 * @route to update/merge user's favorite channels
 */
router.put('/', async function (req, res) {
  const user = await UserService.updateUserFavorites(
    req.user,
    req.body.favorites
  );
  res.send(user);
});

module.exports = router;

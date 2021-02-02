var express = require('express');
var router = express.Router();
const favorites = require('./favourites');
const newsletter = require('./newsletter');

const UserService = require('../services/user.service');

/**
 * @route to get all users
 */
router.get('/', async function (req, res) {
  const users = await UserService.getAllUsers();
  res.send(users);
});

/**
 * @route to get list of newletter subscribers
 */
router.get('/subscribers', async function (req, res) {
  const users = await UserService.getNewsletterSubscribers();
  res.send(users);
});

/**
 * @route to create new user
 */
router.post('/', async function (req, res) {
  const user = await UserService.addUser(req.body);
  res.send(user);
});

/**
 * @route to update user informatation
 */
router.put('/:id', async function (req, res) {
  const user = await UserService.updateUser(req.user, req.body);
  res.send(user);
});

/**
 * @validates id param and sets user with req object
 */
router.param('id', async (req, res, next, id) => {
  const user = await UserService.getUserById(id);
  if (user) {
    req.user = user;
    next();
  } else {
    throw new Error(`User ${id} not found`);
  }
});

/**
 * @baseRoutePath to set or update a user's favorite channels
 */
router.use('/:id/favorites', favorites);

/**
 * @baseRoutePath to subscribe/unsubscribe a newsletter
 */
router.use('/:id/newsletter', newsletter);

module.exports = router;

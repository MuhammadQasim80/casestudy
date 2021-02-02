var express = require('express');
var router = express.Router();
const favorites = require('./favourites');
const newsletter = require('./newsletter');

const UserService = require('../services/user.service');

/**
 * @route to get all users
 */
router.get('/', async function (req, res) {
  try {
    const users = await UserService.getAllUsers();
    res.send(users);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

/**
 * @route to get list of newletter subscribers
 */
router.get('/subscribers', async function (req, res) {
  try {
    const users = await UserService.getNewsletterSubscribers();
    res.send(users);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

/**
 * @route to create new user
 */
router.post('/', async function (req, res) {
  try {
    const user = await UserService.addUser(req.body);
    res.send(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

/**
 * @route to update user informatation
 */
router.put('/:id', async function (req, res) {
  try {
    const user = await UserService.updateUser(req.user, req.body);
    res.send(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

/**
 * @validates id param and sets user with req object
 */
router.param('id', async (req, res, next, id) => {
  try {
    const user = await UserService.getUserById(id);
    if (user) {
      req.user = user;
      next();
    } else {
      res.status(404).send(`User ${id} not found`);
    }
  } catch (error) {
    res.status(400).send(error.message);
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

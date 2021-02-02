const mongoose = require('mongoose');
const User = require('../models/user');
/**
 *
 * @param {Object} userBody contains information for newly creating user
 * @returns {Object} newly created user
 */
const addUser = async (userBody) => {
  const user = await User.create(userBody);
  return user;
};

/**
 * @returns {Array} list of all users in db
 */
const getAllUsers = async () => {
  try {
    const users = await User.where({deleted: false}).exec();
    return users;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 *
 * @param {String} id of the user
 * @returns {Object} user object
 */
const getUserById = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error('Invalid user id: ' + id);
  }
  const user = await User.findById(id);
  return user;
};

/**
 *
 * @param {Object} user is the actual db user
 * @param {Object} updatedUser is the object with updated user information
 * @returns {Object} user object with updated user information
 */
const updateUser = async (user, updatedUser) => {
  if (!user) {
    throw new Error('User not found');
  }

  Object.assign(user, updatedUser);
  await user.save();
  return user;
};

/**
 *
 * @param {Object} user is the actual db user
 * @param {Array} favorites is the list of favorite channels of the user
 * @returns {Object} user object with his favorite channels set/replaced
 */
const setUserFavorites = async (user, favorites) => {
  user.favorites = favorites;
  await user.save();
  return user;
};

/**
 *
 * @param {Object} user is the actual db user
 * @param {Array} favorites is the list of favorite channels of the user
 * @returns {Object} user object with his favorite channels updated/merged
 */
const updateUserFavorites = async (user, favorites) => {
  user.favorites = Array.from(new Set([...user.favorites, ...favorites]));
  await user.save();
  return user;
};

/**
 *
 * @param {Object} user object to be updated for newsletter subscription
 * @param {Boolean} subscribe is a flag true/false to send newsletter or not
 * @returns {Object} user object with updated subscription state
 */
const subscribeNewsletter = async (user, subscribe) => {
  user.newsletter = subscribe;
  await user.save();
  return user;
};

/**
 * @returns {Array} list of users who have subscribed Newsletter
 */
const getNewsletterSubscribers = async () => {
  const users = await User.where({newsletter: true}).exec();
  return users;
};

module.exports = {
  addUser,
  getUserById,
  getAllUsers,
  updateUser,
  setUserFavorites,
  updateUserFavorites,
  subscribeNewsletter,
  getNewsletterSubscribers,
};

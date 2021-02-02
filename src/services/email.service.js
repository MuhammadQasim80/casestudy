const sendGrid = require('@sendgrid/mail');
const UserService = require('./user.service');
const PostService = require('./post.service');
const config = require('../config');
const ejs = require('ejs');
const fs = require('fs');
const emailTemplates = fs
  .readFileSync(`${__dirname}/../templates/newsletter.template.ejs`)
  .toString();

const {email, host} = config;
const {sgApiKey, from} = email;
sendGrid.setApiKey(sgApiKey);

/**
 * email basic/common information
 */
const emailBasicInfo = {
  from,
  subject: `Your today's newsLetter`,
  attachments: [
    {
      filename: 'header',
      type: 'image/png',
      content_id: 'header',
      content: fs.readFileSync(`${__dirname}/../templates/images/header.png`, {
        encoding: 'base64',
      }),
      disposition: 'inline',
    },
  ],
};

/**
 *
 * @param {Object} user object
 * @param {Object} channels is an object having user's favorites as key and posts as value in an array
 * @output sends email with newsletter html content and logs message in console
 */
const sendEmail = async (user, channels) => {
  const html = [];

  for (let channel in channels) {
    channels[channel].forEach((post) => {
      html.push(`<div> ${post.body}</div>`);
    });
  }

  const emailInfo = {
    ...emailBasicInfo,
    to: user.email,
    html: ejs.render(emailTemplates, {
      channels,
      username: user.name,
      host,
    }),
  };

  sendGrid
    .send(emailInfo)
    .then(() => {
      console.log(`email has been sent successfully to user ${user.name}`);
    })
    .catch((error) => {
      console.log(JSON.stringify(error));
    });
};

/**
 *
 * @param {Array} favorites is an array of user's favorite channels
 * @param {Date} dateTime is the current time from which to find the posts in 24 hours before
 * @returns {Promise} a promise that will be fulfilled with user letter object having channel name as key and posts as value in array
 */
const getUserLetter = (favorites, dateTime) => {
  const relevantPosts = [];
  favorites.forEach((fav) => {
    relevantPosts.push(PostService.getTopVotedPosts(fav, 3, dateTime));
  });

  return Promise.all(relevantPosts).then((topChannelPosts) => {
    const userLetter = {};
    topChannelPosts.forEach((posts) => {
      posts.forEach((post) => {
        if (post && Object.keys(post).length) {
          if (!userLetter[post.channel]) {
            userLetter[post.channel] = [];
          }
          userLetter[post.channel].push(post);
        }
      });
    });

    return userLetter;
  });
};

/**
 * This method is exposed to be called by the scheduler
 * @returns {Console} sends email & logs success/failure console message
 */
const sendNewsletter = async (dateTime) => {
  const subscribers = await UserService.getNewsletterSubscribers();
  console.log({subscribers});
  subscribers.forEach(async (user) => {
    getUserLetter(user.favorites, dateTime).then((userLetter) => {
      if (Object.keys(userLetter).length) {
        sendEmail(user, userLetter);
      } else {
        console.log('No posts found');
      }
    });
  });
};

module.exports = {
  sendNewsletter,
};

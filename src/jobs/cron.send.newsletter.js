const cronjob = require('node-cron');
const MailSerivice = require('../services/email.service');

/**
 * @sendNewsletter everyday at 8AM
 */
cronjob.schedule('0 8 * * *', () => {
  const dateTime = new Date();
  dateTime.setHours(8, 0, 0, 0);
  MailSerivice.sendNewsletter(dateTime);
});

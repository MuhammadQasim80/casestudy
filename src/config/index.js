const dotenv = require('dotenv');
const path = require('path');

dotenv.config({path: path.join(__dirname, '../../.env')});

module.exports = {
  port: process.env.PORT,
  mongodb: {
    url: process.env.DB_URL,
    options: {useNewUrlParser: true, useUnifiedTopology: true},
  },
  email: {
    sgApiKey: process.env.SENDGRID_API_KEY,
    from: process.env.FROM_EMAIL,
  },
  host: process.env.HOST_NAME,
};

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const config = require('./config');

var indexRoutes = require('./routes/index');
var userRoutes = require('./routes/users');
var postRoutes = require('./routes/posts');
require('./jobs/cron.send.newsletter');
app.use(express.json());

app.use('/', indexRoutes);
app.use('/users', userRoutes);
app.use('/posts', postRoutes);

const {port, mongodb} = config;

mongoose
  .connect(mongodb.url, mongodb.options)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`Listening to port ${port}`);
    });
  })
  .catch((err) => {
    console.log('Connection to MongoDB failed with error: ' + err);
  });

const mongoose = require('mongoose');
const {Schema} = mongoose;

/**
 * @USER schema to keep user information i.e. favorite channels, newsletter subscription etc.
 */
const userSchema = new Schema({
  name: {type: String, required: true},
  email: {type: String, required: true},
  favorites: {type: [String], default: []},
  date: {type: Date, default: Date.now},
  deleted: {type: Boolean, default: false},
  newsletter: {type: Boolean, default: true},
});

module.exports = mongoose.model('User', userSchema);

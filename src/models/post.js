const mongoose = require('mongoose');
const {Schema} = mongoose;

/**
 * @POST model schema to keep posts information
 */
const postSchema = new Schema({
  title: {type: String, required: true},
  comments: {type: [String]},
  url: {type: String, required: true},
  img: {type: String, required: true},
  date: {type: Date, default: Date.now()},
  votes: {type: Number, default: 0},
  channel: {type: String, required: true},
});

module.exports = mongoose.model('Post', postSchema);

const mongoose = require('mongoose');
const validator = require('validator');
const {Schema} = mongoose;

/**
 * @POST model schema to keep posts information
 */
const postSchema = new Schema({
  title: {type: String, required: true},
  comments: {type: [String]},
  url: {
    type: String,
    required: true,
    validate(value) {
      if (!validator.isUrl(value)) {
        throw new Error('Invalid url');
      }
    },
  },
  img: {type: String, required: true},
  date: {type: Date, default: Date.now()},
  votes: {type: Number, default: 0},
  channel: {type: String, required: true},
});

module.exports = mongoose.model('Post', postSchema);

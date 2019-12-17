const mongoose = require('mongoose');

const { Schema, SchemaTypes } = mongoose;

const likesSchema = require('./Likes');

const commentSchema = new Schema({
  body: String,
  _user: { type: SchemaTypes.ObjectId, ref: 'User' },
  authorName: String,
  comments: [this],
  likes: [likesSchema]
});

module.exports = commentSchema;

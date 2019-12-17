const mongoose = require('mongoose');

const { Schema, SchemaTypes } = mongoose;

const commentSchema = require('./Comment');
const likesSchema = require('./Likes');

const articleSchema = new Schema(
  {
    title: String,
    body: String,
    _user: { type: SchemaTypes.ObjectId, ref: 'User' },
    authorName: String,
    comments: [commentSchema],
    likes: [likesSchema]
  },
  { timestamps: true }
);

mongoose.model('articles', articleSchema);

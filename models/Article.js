const mongoose = require('mongoose');

const { Schema, SchemaTypes } = mongoose;

const articleSchema = new Schema(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    _user: { type: SchemaTypes.ObjectId, ref: 'users' },
    comments: [{ type: SchemaTypes.ObjectId, ref: 'comments' }],
    likes: [{ type: SchemaTypes.ObjectId, ref: 'likes' }]
  },
  { timestamps: true }
);

mongoose.model('articles', articleSchema);

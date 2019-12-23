const mongoose = require('mongoose');

const { Schema, SchemaTypes } = mongoose;

const articleSchema = new Schema(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    _user: { type: SchemaTypes.ObjectId, ref: 'users' },
    comments: { type: SchemaTypes.ObjectId, ref: 'comments' },
    likes: [{ type: SchemaTypes.ObjectId, ref: 'users' }],
    dislikes: [{ type: SchemaTypes.ObjectId, ref: 'users' }],
    comments: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: 'users'
        },
        body: {
          type: String,
          required: true
        },
        name: String,
        avatar: String,
        date: {
          type: Date,
          default: Date.now
        }
      }
    ]
  },
  { timestamps: true }
);

mongoose.model('articles', articleSchema);

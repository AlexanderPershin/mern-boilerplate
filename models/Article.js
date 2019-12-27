const mongoose = require('mongoose');

const { Schema, SchemaTypes } = mongoose;

// TODO: Make separate comment model to store comments
const articleSchema = new Schema(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    _user: { type: SchemaTypes.ObjectId, ref: 'users' },
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

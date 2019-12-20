const mongoose = require('mongoose');

const { Schema, SchemaTypes } = mongoose;

// Here _comment link to comment if this comment answers to another comment
// comments - array of answers to this current comment
const commentSchema = new Schema(
  {
    body: { type: String, required: true },
    _user: { type: SchemaTypes.ObjectId, ref: 'users' },
    _article: { type: SchemaTypes.ObjectId, ref: 'articles' },
    _comment: { type: SchemaTypes.ObjectId, ref: 'comments' },
    comments: [{ type: SchemaTypes.ObjectId, ref: 'comments' }]
  },
  { timestamps: true }
);

module.exports = mongoose.model('comments', commentSchema);

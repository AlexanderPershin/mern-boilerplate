const mongoose = require('mongoose');

const { Schema, SchemaTypes } = mongoose;

const commentSchema = new Schema(
  {
    body: { type: String, required: true },
    comments: [{ type: SchemaTypes.ObjectId, ref: 'users' }],
    to: String
  },
  { timestamps: true }
);

module.exports = mongoose.model('comments', commentSchema);

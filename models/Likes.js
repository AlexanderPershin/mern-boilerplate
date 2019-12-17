const mongoose = require('mongoose');

const { Schema, SchemaTypes } = mongoose;

// Likes system for comments and articles

const likesSchema = new Schema({
  id: SchemaTypes.ObjectId,
  voters: [{ type: SchemaTypes.ObjectId, ref: 'User' }]
});

module.exports = likesSchema;

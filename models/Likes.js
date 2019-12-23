const mongoose = require('mongoose');

const { Schema, SchemaTypes } = mongoose;

// Likes system for comments and articles
// Every instance of like contains user who liked comment of article and _article or _comment link to articles of comments collection. That way there would not be highwatermark overflow
// Article of Comment model will populate array of likes

const likesSchema = new Schema({
  voters: [{ type: SchemaTypes.ObjectId, ref: 'users' }]
});

module.exports = mongoose.model('likes', likesSchema);

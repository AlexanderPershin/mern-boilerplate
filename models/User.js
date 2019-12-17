const mongoose = require('mongoose');

const { Schema, SchemaTypes } = mongoose;

const userSchema = new Schema({
  googleId: String,
  username: String,
  avatar: String
});

mongoose.model('users', userSchema);

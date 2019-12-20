const mongoose = require('mongoose');

const { Schema, SchemaTypes } = mongoose;

const profileSchema = new Schema(
  {
    user: {
      type: SchemaTypes.ObjectId,
      ref: 'users'
    },
    company: String,
    website: String,
    location: String,
    bio: String,
    social: {
      youtube: String,
      twitter: String,
      facebook: String,
      linkeding: String,
      instagram: String
    }
  },
  { timestamps: true }
);

mongoose.model('profiles', profileSchema);

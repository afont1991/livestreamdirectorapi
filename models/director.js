mongoose = require('mongoose');
ObjectId = mongoose.Schema.ObjectId;

// The following is the schema for a creating a director
DirectorSchema = new mongoose.Schema({
  livestream_id: {
    type: String,
    trim: true,
    required: true,
    unique: true // Including the Unique requirment for the livestream_id makes it so no director can be rigistered twice
  },
  full_name: {
    type: String,
    trim: true,
    required: true
  },
  dob: {
    type: String,
    trim: true,
    reqired: true
  },
  favorite_camera: {
    type: String,
    required: false,
  },
  favorite_movies: {
    type: String,
    required: false,
  }
});

exports.Director = mongoose.model('Director', DirectorSchema);

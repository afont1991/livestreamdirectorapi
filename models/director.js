mongoose = require('mongoose');
ObjectId = mongoose.Schema.ObjectId;

DirectorSchema = new mongoose.Schema({
  livestream_id: {
    type: String,
    trim: true,
    required: true,
    unique: true
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

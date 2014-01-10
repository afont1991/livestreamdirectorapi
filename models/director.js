mongoose = require('mongoose');
ObjectId = mongoose.Schema.ObjectId;

DirectorSchema = new mongoose.Schema({
  firstname: {
    type: String,
    trim: true,
    required: true
  },
  lastname: {
    type: String,
    trim: true,
    reqired: true
  },
  username: {
    type: String,
    trim: true,
    required: true,
    unique: true
  },
  password: {
    type: String,
    trim: true,
    required: true
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true,
    unique: true
  },
  country: {
    type: String,
    lowercase: true,
    trim: true,
    required: true
  },
  status: {
    type: String,
    enum: 'active',
    default: 'active',
    required: true
  }
});

exports.Director = mongoose.model('Director', DirectorSchema);

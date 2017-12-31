const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// User Schema
const userSchema = mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

// I dont know what is this...???
const User = module.exports = mongoose.model('User', userSchema);

// Get User By Id
module.exports.getUserById = (id, callback) => {
  User.findById(id, callback);
}

// Get User By Username
module.exports.getUserByUsername = (username, callback) => {
  const query = {
    username: username
  };
  User.findOne(query, callback);
}

// Add User
module.exports.addUser = (user, callback) => {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) throw err;
      user.password = hash;
      user.save(callback);
    });
  });
}

// Compare Password
module.exports.comparePassword = (rawPassword, hashPassword, callback) => {
  bcrypt.compare(rawPassword, hashPassword, (err, isMatched) => {
    if (err) return callback(err, false);
    callback(null, isMatched);
  });
}
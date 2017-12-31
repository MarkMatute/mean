const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = require('../config/database');
const _ = require('lodash');

// Register
router.post('/register', (req, res, next) => {
  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  });

  User.addUser(newUser, (err, user) => {
    if (err) {
      res.json({
        success: false,
        message: 'User not registered'
      });
    } else {
      res.json({
        success: true,
        message: 'User Registerd'
      });
    }
  });

});

// AUTHENTICATE
router.post('/authenticate', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  User.getUserByUsername(username, (err, user) => {
    if (err) throw err;
    if (!user) {
      return res.json({
        success: false,
        message: 'User not found.'
      });
    }
    User.comparePassword(password, user.password, (err, isMatched) => {
      if (err) throw err;
      if (isMatched) {
        const token = jwt.sign(user.toJSON(), config.secret);
        _.remove(user, 'password');
        res.json({
          success: true,
          token: token,
          user: user
        });
      } else {
        return res.json({
          success: false,
          message: 'User not found.'
        });
      }
    });
  });

});

// PROFILE
router.get('/profile',passport.authenticate('jwt', {session: false}) , (req, res, next) => {
  res.send({
    user: req.user
  });
});

// EXPORT
module.exports = router;
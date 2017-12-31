const User = require('../models/user');
const dbConfig = require('./database');
const jwt = require('jsonwebtoken');
const passportJWT = require('passport-jwt');
const ExtractJWT = passportJWT.ExtractJwt;
const JWTStrategy = passportJWT.Strategy;

module.exports = (passport) => {
  let opts = {};
  opts.jwtFromRequest = ExtractJWT.fromHeader('authorization');
  opts.secretOrKey = dbConfig.secret;
  passport.use(
    new JWTStrategy(opts, (payload, next) => {
      User.findById(payload._id, (err, user) => {
        if (err || !user) return next(null, false);
        user.password = '';
        return next(null, user);
      });
    })
  );
}

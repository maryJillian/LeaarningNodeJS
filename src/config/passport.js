const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('User');

const verify = (username, password, done) => {
  User.find({$and: [{username: username}, {password: password}]},
    (err, user) => {
      if (err) {
        return done(err)
      }
      if (!user) {
        return done(null, false)
      }
      return done(null, user)
    });
};

const options = {
  usernameField: "username",
  passwordField: "password"
};

passport.use('local', new LocalStrategy(options, verify));

passport.serializeUser((user, cb) => {
  cb(null, user[0]._id);
});

passport.deserializeUser((id, cb) => {
  User.findById(id, (err, user) => {
    if (err) {
      return cb(err)
    }
    cb(null, user)
  });
});

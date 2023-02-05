const express = require('express');
const router = express.Router();
const passport = require('passport');

const {
  loginForm, signupForm, profile,
  login, signup, logout
} = require('../controllers/apiUsersController');

router.get('/login', loginForm);

router.get('/signup', signupForm);

router.get('/me', profile);

router.post('/login', passport.authenticate('local', {
  failureRedirect: '/api/user/login',
  failureMessage: true
}), login);

router.post('/signup', signup);

router.get('/logout', logout);


module.exports = router;
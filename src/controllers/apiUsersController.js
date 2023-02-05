const mongoose = require('mongoose');
const User = mongoose.model('User');

const loginForm = async (req, res) => {
  try {
    res.render('user/login', {
      title: 'страница с формой входа',
    });
  } catch (error) {
    res.redirect('/404');
  }
};

const signupForm = async (req, res) => {
  try {
    res.render('user/signup', {
      title: 'страница с формой регистрации',
    });
  } catch (error) {
    res.redirect('/404');
  }
};

const profile = async (req, res) => {
  try {
    if (!req.isAuthenticated()) {
      return res.redirect('/api/user/login')
    }
    res.render('user/profile', {
      title: 'профиль пользователя',
      user: req.user,
    });
  } catch (error) {
    res.redirect('/404');
  }
};

const login = async (req, res) => {
  try {
    // console.log("req.user: ", req.user);
    res.redirect('/api/user/me');
  } catch (error) {
    res.redirect('/404');
  }
};

const signup = async (req, res) => {
  try {
    await User.create(req.body);
    res.render('user/login', {
      title: 'страница с формой входа / регистрации'
    });
  } catch (error) {
    res.redirect('/404');
  }
};

const logout = async (req, res) => {
  req.logout(function () {
    res.redirect('/api/user/login');
  });
};

module.exports = {
  loginForm,
  signupForm,
  profile,
  login,
  signup,
  logout
}
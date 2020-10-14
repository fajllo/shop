const express = require('express');
const {check, validationResult} = require('express-validator');
const usersRepo = require('../../repositories/users');
const signupTemp = require('../../viwes/admin/auth/signup');
const signinTemp = require('../../viwes/admin/auth/signin');
const {
  requireEmail,
  requirePassword,
  requireConfirm,
  signInEmail,
  signInPassword,
} = require('./validators');
const {getOneBy} = require('../../repositories/users');

const router = express.Router();

router.get('/signup', (req, res) => {
  res.send(signupTemp({req}));
});

router.post(
  '/signup',
  [requireEmail, requirePassword, requireConfirm],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.send(signupTemp({req, errors}));
    }

    // get accset to data send
    // console.log(req.body);
    const {email, password, confirm} = req.body;
    //create user in our repo
    const user = await usersRepo.create({email, password});
    // added by cookie session
    // req.session === {
    res.sessionID = user.id;
    res.send('Account created!');
  }
);
router.get('/signin', (req, res) => {
  res.send(signinTemp({req}));
});

router.post('/signin', [signInEmail, signInPassword], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.send(signinTemp({req, errors}));
  }

  const {email} = req.body;
  const user = await usersRepo.getOneBy({email});
  res.sessionID = user.id;
  res.send('you are singed in');
});

router.get('/signout', (req, res) => {
  req.sessionID = null;
  res.send('logged out!');
});

module.exports = router;

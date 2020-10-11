const express = require('express');
const usersRepo = require('../../repositories/users');
const signup = require('../../viwes/admin/auth/signup');
const signupTemp = require('../../viwes/admin/auth/signup');
const signinTemp = require('../../viwes/admin/auth/signin');

const router = express.Router();

router.get('/signup', (req, res) => {
  res.send(signupTemp({req}));
});

router.post('/signup', async (req, res) => {
  // get accset to data send
  // console.log(req.body);
  const {email, password, confirm} = req.body;
  const exisitingUser = await usersRepo.getOneBy({email: email});
  if (exisitingUser) {
    return res.send('user already exist!');
  }
  if (password !== confirm) {
    return res.send('passw must be the same!');
  }
  //create user in our repo
  const user = await usersRepo.create({email, password});
  // added by cookie session
  // req.session === {
  res.sessionID = user.id;

  res.send('Account created!');
});
router.get('/signin', (req, res) => {
  res.send(signinTemp({req}));
});

router.post('/signin', async (req, res) => {
  const {email, password} = req.body;
  const user = await usersRepo.getOneBy({email});
  if (!user) {
    res.send('email not found');
  }
  const validPsw = await usersRepo.compre(password, user.password);
  if (validPsw) {
    res.send('invalid combination ');
  }

  res.send('you are singed in');
  res.sessionID = user.id;
});

router.get('/signout', (req, res) => {
  req.sessionID = null;
  res.send('logged out!');
});

module.exports = router;

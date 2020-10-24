const {check} = require('express-validator');
const usersRepo = require('../../repositories/users');

module.exports = {
  requireTitle: check('title').trim().isLength({min: 3, max: 40}),
  requirePrice: check('price').trim().toFloat().isFloat({min: 1}),

  requireEmail: check('email')
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage('Must be valid email')
    .custom(async (email) => {
      const existingUser = await usersRepo.getOneBy({email});
      if (existingUser) {
        throw new Error('Email already in use!');
      }
    }),
  requirePassword: check('password')
    .trim()
    .isLength({min: 5, max: 20})
    .withMessage(' Password Must be between 5 and 20 characters'),
  requireConfirm: check('confirm')
    .trim()
    .isLength({min: 5, max: 20})
    .withMessage(' Password Must be between 5 and 20 characters')
    .custom(async (confirm, {req}) => {
      if (confirm !== req.body.password) {
        throw new Error('password must match!');
      }
    }),
  signInEmail: check('email')
    .trim()
    .normalizeEmail()
    .isEmail()
    .custom(async (email) => {
      const user = await usersRepo.getOneBy({email});
      if (!user) {
        throw new Error('email not found!');
      }
    }),
  signInPassword: check('password')
    .trim()
    .custom(async (password, {req}) => {
      const {email} = req.body;
      const user = await usersRepo.getOneBy({email});
      if (!user) {
        throw new Error('invalid password');
      }
      const validPsw = await usersRepo.compre(password, user.password);
      if (!validPsw) {
        throw new Error('invalid combination ');
      }
    }),
};

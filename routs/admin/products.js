const express = require('express');
const {route} = require('./auth');
const router = express.Router();
const stockRepo = require('../../repositories/stock');
const newProductTemp = require('../../viwes/admin/products/newstuff');
const {requireTitle, requirePrice} = require('./validators');
const {check, validationResult} = require('express-validator');

router.get('/admin/products', (req, res) => {
  res.send('porduct');
});
router.get('/admin/products/new', (req, res) => {
  res.send(newProductTemp({}));
});

router.post('/admin/products/new', [requirePrice, requireTitle], (req, res) => {
  const errors = validationResult(req);
  console.log(errors);
  res.send('dodano produkts');
});

module.exports = router;

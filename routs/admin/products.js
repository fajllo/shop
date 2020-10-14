const express = require('express');
const {route} = require('./auth');
const router = express.Router();
const stockRepo = require('../../repositories/stock');
const newProductTemp = require('../../viwes/admin/products/newstuff');

router.get('/admin/products', (req, res) => {
  res.send('porduct');
});
router.get('/admin/products/new', (req, res) => {
  res.send(newProductTemp({}));
});

module.exports = router;

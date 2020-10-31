const express = require('express');
const {check, validationResult} = require('express-validator');
const multer = require('multer');

const Stock = require('../../repositories/stock');
const newProductTemp = require('../../viwes/admin/products/newstuff');
const {requireTitle, requirePrice} = require('./validators');

const router = express.Router();
const upload = multer({storage: multer.memoryStorage()});

router.get('/admin/products', (req, res) => {
  res.send('porduct');
});
router.get('/admin/products/new', (req, res) => {
  res.send(newProductTemp({}));
});

router.post(
  '/admin/products/new',
  upload.array('image'),
  [requirePrice, requireTitle],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.send(newProductTemp({errors}));
    }
    const {title, price} = req.body;
    let img = [];
    let i = 0;
    for (let file of req.files) {
      img[i] = file.buffer.toString('base64');
      i++;
    }

    await Stock.create({title, price, img});
    res.send('dodano produkts');
  }
);

module.exports = router;

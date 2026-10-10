const express = require('express');
const Product = require('../models/Product');

const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    const { productNo, productName, quantity, price } = req.body;

    if (
      productNo === undefined ||
      productName === undefined ||
      quantity === undefined ||
      price === undefined
    ) {
      return res.status(400).json({ message: 'All product fields are required.' });
    }

    const product = await Product.create({
      productNo,
      productName,
      quantity,
      price
    });

    return res.status(201).json(product);
  } catch (error) {
    return next(error);
  }
});

router.get('/allProducts', async (req, res, next) => {
  try {
    const products = await Product.find();
    return res.status(200).json(products);
  } catch (error) {
    return next(error);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.find();
    return res.status(200).json(products);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;

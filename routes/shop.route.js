"use strict";

const express = require('express');
const router = express.Router();
const shopController = require('../controllers/shop.controller');
const shopModel = require('../models/shop.model');

// Public routes
router.get('/products', (req, res) => {
  shopModel.getAllProducts((err, products) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Database query error');
    }
    res.render('index', { products });
  });
});

router.get('/products/:id', (req, res) => {
  const productId = req.params.id;
  shopModel.getProductById(productId, (err, product) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Database query error');
    }
    if (product) {
      res.render('details', { product });
    } else {
      res.status(404).send('Product not found');
    }
  });
});

// Admin routes
router.get('/admin/products', shopController.getAdminProductsPage);
router.get('/admin/products/add', shopController.getAddProductPage);
router.post('/admin/products', shopController.addProduct);
router.get('/admin/products/edit/:id', shopController.getEditProductPage);
router.post('/admin/products/edit/:id', shopController.updateProduct);
router.get('/admin/products/delete/:id', shopController.deleteProduct);

// Cart routes
router.post('/cart/add', (req, res) => {
  const { productId, quantity } = req.body;
  if (!req.session.cart) {
    req.session.cart = [];
  }

  shopModel.addToCart(req.session.cart, parseInt(productId), parseInt(quantity), (err, updatedCart) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error adding to cart');
    }
    req.session.cart = updatedCart;
    res.status(200).send('Product added to cart');
  });
});

router.delete('/cart/remove', (req, res) => {
  const { productId } = req.body;
  if (req.session.cart) {
    shopModel.removeFromCart(req.session.cart, parseInt(productId), (err, updatedCart) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Error removing from cart');
      }
      req.session.cart = updatedCart;
      res.status(200).send('Product removed from cart');
    });
  } else {
    res.status(400).send('Cart is empty');
  }
});

router.get('/cart', (req, res) => {
  if (req.session.cart) {
    res.render('cart', { cart: req.session.cart });
  } else {
    res.render('cart', { cart: [] });
  }
});

router.post('/checkout', (req, res) => {
  if (req.session.cart) {
    req.session.cart = [];
    res.status(200).send('Checkout complete');
  } else {
    res.status(400).send('Cart is empty');
  }
});

// Export router
module.exports = router;

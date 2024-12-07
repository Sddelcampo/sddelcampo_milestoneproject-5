"use strict";

const fs = require('fs');
const path = require('path');
const { getProducts, getProductById, addProduct, updateProduct, deleteProduct } = require('../models/shop.model');

// Controller function for rendering the products page
exports.getProductsPage = (req, res) => {
  getProducts()
    .then(products => {
      res.render('products', { products });
    })
    .catch(err => {
      console.error(err);
      res.status(500).send("Error fetching products");
    });
};

// Controller function for rendering product details page
exports.getProductDetailsPage = (req, res) => {
  const productId = req.params.id;
  getProductById(productId)
    .then(product => {
      if (product) {
        res.render('details', { product });
      } else {
        res.status(404).send("Product not found");
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).send("Error fetching product details");
    });
};

// Admin controller functions
exports.getAdminProductsPage = (req, res) => {
  getProducts()
    .then(products => {
      res.render('admin-products', { products });
    })
    .catch(err => {
      console.error(err);
      res.status(500).send("Error fetching admin products");
    });
};

// Additional functions for handling product edits, additions, and deletions
exports.getAddProductPage = (req, res) => {
  res.render('product-edit', { product: {} });
};

exports.addProduct = (req, res) => {
  const newProduct = req.body;
  addProduct(newProduct)
    .then(() => {
      res.redirect('/admin/products');
    })
    .catch(err => {
      console.error(err);
      res.status(500).send("Error adding product");
    });
};

exports.getEditProductPage = (req, res) => {
  const productId = req.params.id;
  getProductById(productId)
    .then(product => {
      if (product) {
        res.render('product-edit', { product });
      } else {
        res.status(404).send("Product not found");
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).send("Error fetching product for edit");
    });
};

exports.updateProduct = (req, res) => {
  const productId = req.params.id;
  const updatedProduct = req.body;
  updateProduct(productId, updatedProduct)
    .then(() => {
      res.redirect('/admin/products');
    })
    .catch(err => {
      console.error(err);
      res.status(500).send("Error updating product");
    });
};

exports.deleteProduct = (req, res) => {
  const productId = req.params.id;
  deleteProduct(productId)
    .then(() => {
      res.redirect('/admin/products');
    })
    .catch(err => {
      console.error(err);
      res.status(500).send("Error deleting product");
    });
};

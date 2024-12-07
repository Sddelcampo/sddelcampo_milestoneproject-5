"use strict";

module.exports = {
  getAdminProductsPage: (req, res) => {
    res.render('admin-products');
  },
  getAddProductPage: (req, res) => {
    res.render('product-add');
  },
  addProduct: (req, res) => {
    // Logic to add a product
    res.send('Product added');
  },
  getEditProductPage: (req, res) => {
    res.render('product-edit');
  },
  updateProduct: (req, res) => {
    // Logic to update a product
    res.send('Product updated');
  },
  deleteProduct: (req, res) => {
    // Logic to delete a product
    res.send('Product deleted');
  }
};
console.log('Admin Controller:', adminController);
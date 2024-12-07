"use strict";

const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');


router.get('/products', adminController.getAdminProductsPage);
router.get('/products/add', adminController.getAddProductPage);
router.post('/products', adminController.addProduct);
router.get('/products/edit/:id', adminController.getEditProductPage);
router.post('/products/edit/:id', adminController.updateProduct);
router.get('/products/delete/:id', adminController.deleteProduct);

module.exports = router;

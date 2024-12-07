"use strict";

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./models/deSebastian_webdb.db');

// Get all products
exports.getProducts = () => {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM products", (err, rows) => {
      if (err) {
        return reject(err);
      }
      resolve(rows);
    });
  });
};

// Get a single product by ID
exports.getProductById = (id) => {
  return new Promise((resolve, reject) => {
    db.get("SELECT * FROM products WHERE id = ?", [id], (err, row) => {
      if (err) {
        return reject(err);
      }
      resolve(row);
    });
  });
};

// Add a new product
exports.addProduct = (product) => {
  return new Promise((resolve, reject) => {
    const { name, description, price, category_id } = product;
    db.run("INSERT INTO products (name, description, price, category_id) VALUES (?, ?, ?, ?)",
      [name, description, price, category_id], function (err) {
        if (err) {
          return reject(err);
        }
        resolve({ id: this.lastID });
      });
  });
};

// Update an existing product
exports.updateProduct = (id, product) => {
  return new Promise((resolve, reject) => {
    const { name, description, price, category_id } = product;
    db.run("UPDATE products SET name = ?, description = ?, price = ?, category_id = ? WHERE id = ?",
      [name, description, price, category_id, id], function (err) {
        if (err) {
          return reject(err);
        }
        resolve();
      });
  });
};

// Delete a product
exports.deleteProduct = (id) => {
  return new Promise((resolve, reject) => {
    db.run("DELETE FROM products WHERE id = ?", [id], function (err) {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });
};

"use strict";
const db = require('./db-conn');
const fs = require('fs');
const path = require('path');

// Helper to execute SQL scripts
function executeScript(filename) {
  const script = fs.readFileSync(path.resolve(__dirname, `./sql-database/${filename}`), 'utf-8');
  db.exec(script);
}

// Initialize database
executeScript('drop_tables.sql');
executeScript('create_tables.sql');
executeScript('insert_products.sql');

console.log('Database initialized successfully!');
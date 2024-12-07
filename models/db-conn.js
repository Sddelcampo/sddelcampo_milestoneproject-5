"use strict";
const sqlite3 = require('sqlite3').verbose();

// Initialize the database connection
const db = new sqlite3.Database('./models/deSebastian_WebDB.db', (err) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

module.exports = db;

"use strict";

// Import dependencies
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const multer = require('multer');
const app = express();
const shopRoutes = require('./routes/shop.route'); // Ensure this path is correct
const adminRoutes = require('./routes/admin.route'); // Ensure this path is correct

// Configure multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Middleware to parse JSON and serve static files
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Session configuration
app.use(session({
  secret: 'mysecret', // Replace with a more secure secret in production
  resave: false,
  saveUninitialized: true,
}));

// Set up EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Route definitions
app.use('/shop', shopRoutes);
app.use('/admin', adminRoutes);

// Route for serving the homepage
app.get('/', (req, res) => {
  res.render('index'); // Render the homepage template
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

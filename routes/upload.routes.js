 

const express = require('express');
const multer = require('multer');
const path = require('path');
const uploadmodel = require('../models/upload.model.js');

const router = express.Router();


const fs = require('fs');
const uploadDir = path.join(__dirname, '../public/uploads');

// Create uploads folder if it doesn't exist
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const uploadMiddleware = multer({ storage });

// GET form
router.get('/upload', (req, res) => {
  res.render('upload'); // Render upload.ejs
});

// POST form data
router.post('/upload', uploadMiddleware.single('photo'), async (req, res) => {
  try {
    const { type, location, price, name, contact } = req.body;
    const photo = req.file.filename;

    const newProperty = new uploadmodel({
      type,
      location,
      price,
      name,
      contact,
      photo
    });

    await newProperty.save();

    // res.send('<h2>Upload Successful!</h2><a href="/upload">Upload Another</a> <a href="/">Go Back to home</a> ');
  res.send(`
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Upload Success</title>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body class="bg-gradient-to-br from-green-400 to-blue-500 min-h-screen flex items-center justify-center">
    <div class="bg-white p-8 rounded-2xl shadow-xl max-w-md text-center">
      <h2 class="text-3xl font-bold text-green-600 mb-4">✅ Upload Successful!</h2>
      <p class="text-gray-700 mb-6">Your property details have been uploaded successfully.</p>
      <div class="flex justify-center gap-4">
        <a href="/upload" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition">Upload Another</a>
        <a href="/" class="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition">Go Home</a>
      </div>
    </div>
  </body>
  </html>
`);





  } catch (err) {
    console.error(err);
    res.status(500).send('Something went wrong');
  }
});

module.exports = router;

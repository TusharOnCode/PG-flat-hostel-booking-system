import express from 'express';
const router = express.Router();
import Admin from '../models/adminlog.model.js';
import bcrypt from 'bcrypt';


// Login Page
router.get('/login', (req, res) => {
  res.render('adminlogin', { error: null });
});

// Login Post
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });

    if (!admin || !await bcrypt.compare(password, admin.password)) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // If password matches
    res.status(200).json({ message: 'Login successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

// GET: Show Registration Form
router.get('/register', (req, res) => {
  res.render('adminregis', { error: null }); // ✅ Send default error value
});

// POST: Handle Form Submission
router.post('/register', async (req, res) => {
  const { email, phone, password } = req.body;
  try {
    const existing = await Admin.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Admin already exists.' });
    }
    const hashed = await bcrypt.hash(password, 10);
    const admin = new Admin({ email,phone, password: hashed });
    await admin.save();
    res.status(200).json({ message: 'Registered successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Registration error.' });
  }
});

export default router;

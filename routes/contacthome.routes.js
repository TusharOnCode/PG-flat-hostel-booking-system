

import express from 'express';
import Contact from '../models/contacthome.model.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    console.log('Incoming POST to /');
    console.log('Request body:', req.body);

    const { name, email,phone, message } = req.body;

    if (!name || !email || !phone || !message) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const newContact = new Contact({ name, email, phone, message });
    await newContact.save();

    res.status(200).json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error saving contact:', error);
    res.status(500).json({ success: false, message: 'Server error, please try again.' });
  }
});

export default router;




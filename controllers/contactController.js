const Contact = require('../models/Contact'); // ✅ Make sure this path is correct

// @desc   Handle contact form submissions
// @route  POST /api/contact
// @access Public
exports.submitContactForm = async (req, res) => {
  try {
    const { name, email, message, interest } = req.body;

    const newContact = new Contact({ name, email, message, interest });
    await newContact.save();

    res.status(201).json({ message: 'Contact form submitted successfully!' });
  } catch (err) {
    console.error('Error submitting contact form:', err.message);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

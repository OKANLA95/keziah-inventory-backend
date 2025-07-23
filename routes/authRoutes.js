const express = require('express');
const router = express.Router();

const {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  forgotPassword,
  resetPassword,
} = require('../controllers/authController');

// ✅ Register user
// POST /api/users/register
router.post('/register', registerUser);

// ✅ Login user
// POST /api/users/login
router.post('/login', loginUser);

// ✅ Logout user
// POST /api/users/logout
router.post('/logout', logoutUser);

// ✅ Refresh access token
// GET /api/users/refresh
router.get('/refresh', refreshAccessToken);

// ✅ Forgot password
// POST /api/users/forgot-password
router.post('/forgot-password', forgotPassword);

// ✅ Reset password with token
// POST /api/users/reset-password/:token
router.post('/reset-password/:token', resetPassword);

// ✅ Test route
router.get('/test', (req, res) =>
  res.status(200).json({ message: 'Auth route is working 🚀' })
);

module.exports = router;

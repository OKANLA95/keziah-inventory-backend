// routes/cartRoutes.js
import express from 'express';
const router = express.Router();

// Example route
router.get('/', (req, res) => {
  res.send('Cart route working');
});

export default router;

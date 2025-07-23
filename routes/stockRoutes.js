// routes/stockRoutes.js
import express from 'express';
const router = express.Router();

// Dummy stock data (replace with real DB logic)
const stockData = [
  { name: 'Tomatoes', quantity: 120 },
  { name: 'Onions', quantity: 85 },
  { name: 'Carrots', quantity: 60 },
];

// GET /api/stock/summary
router.get('/summary', (req, res) => {
  res.json(stockData);
});

export default router;

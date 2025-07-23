// routes/salesRoutes.js
import express from 'express';
import { getSalesSummary } from '../controllers/salesController.js';

const router = express.Router();

// ✅ Sales summary for charts
router.get('/summary', getSalesSummary);

export default router;

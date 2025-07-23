// routes/contactRoutes.js
import express from 'express';
const router = express.Router();

// Define your contact routes here
router.post('/', (req, res) => {
  res.send('Contact route working!');
});

export default router;

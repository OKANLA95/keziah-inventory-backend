import express from 'express';
const router = express.Router();

// Notification routes
router.get('/', (req, res) => {
  res.send('Notifications route working!');
});

export default router;

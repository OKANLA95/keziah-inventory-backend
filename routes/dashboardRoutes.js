// routes/dashboardRoutes.js
import express from 'express';
const router = express.Router();
// ✅ Use correct casing to match the filename
import Product from '../models/Product.js';            // ✅ correct
import Notification from '../models/notificationModel.js'; // ✅ correct
import Order from '../models/Order.js';                // 🔼 Capital "O"
import Activity from '../models/ActivityModel.js';     // 🔼 Capital "A" and "M"

router.get('/overview', async (req, res) => {
  try {
    const lowStockProducts = await Product.find({ quantity: { $lt: 10 } });
    const notifications = await Notification.find().sort({ createdAt: -1 }).limit(5);
    const recentOrders = await Order.find().sort({ createdAt: -1 }).limit(10);
    const activities = await Activity.find().sort({ createdAt: -1 }).limit(10); // optional

    res.json({
      lowStockProducts,
      notifications,
      recentOrders,
      activities,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching dashboard overview' });
  }
});

export default router;

// routes/dashboardRoutes.js
import express from 'express';
const router = express.Router();
import Product from '../models/product.js';
import Notification from '../models/notificationModel.js';
import Order from '../models/order.js';
import Activity from '../models/activityModel.js'; // if it exists

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

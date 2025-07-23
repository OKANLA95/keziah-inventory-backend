const Order = require('../models/OrderModel');
const Product = require('../models/Product');

exports.getNotifications = async (req, res) => {
  try {
    const oneDayAgo = new Date();
    oneDayAgo.setDate(oneDayAgo.getDate() - 1);

    // 🛒 New Orders in last 24 hrs
    const newOrders = await Order.find({ createdAt: { $gte: oneDayAgo } }).select('customerName total createdAt');

    // 🚨 Out of Stock
    const outOfStock = await Product.find({ stock: { $lte: 0 } }).select('name stock');

    // ⚠️ Low Stock (optional)
    const lowStock = await Product.find({ stock: { $gt: 0, $lte: 5 } }).select('name stock');

    res.json({
      newOrders,
      outOfStock,
      lowStock
    });

  } catch (error) {
    console.error('Notifications Error:', error);
    res.status(500).json({ message: 'Failed to fetch notifications' });
  }
};

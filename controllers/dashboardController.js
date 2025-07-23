const Order = require('../models/OrderModel');
const Product = require('../models/Product');
const mongoose = require('mongoose');

exports.getDashboardSummary = async (req, res) => {
  try {
    const { startDate, endDate, category } = req.query;

    // ✅ Parse and sanitize date filters
    const start = startDate ? new Date(startDate) : new Date('2000-01-01');
    const end = endDate ? new Date(endDate) : new Date();
    if (isNaN(start) || isNaN(end)) {
      return res.status(400).json({ message: 'Invalid date range' });
    }

    // ✅ Match filter for date range
    const matchFilter = {
      createdAt: { $gte: start, $lte: end }
    };

    // ✅ Filter by product category (if given)
    if (category) {
      const productIds = await Product.find({ category }).select('_id').lean();
      const productIdList = productIds.map(p => p._id);
      matchFilter['items.productId'] = { $in: productIdList };
    }

    // ✅ Total orders in date range
    const totalOrders = await Order.countDocuments(matchFilter);

    // ✅ Total products (unfiltered)
    const totalProducts = await Product.estimatedDocumentCount();

    // ✅ Revenue from delivered orders in date range
    const [revenueData] = await Order.aggregate([
      { $match: { ...matchFilter, status: 'delivered' } },
      { $group: { _id: null, totalRevenue: { $sum: '$total' } } }
    ]);
    const totalRevenue = revenueData?.totalRevenue || 0;

    // ✅ Monthly sales for charting
    const monthlySales = await Order.aggregate([
      { $match: matchFilter },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          totalSales: { $sum: '$total' },
          orderCount: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);

    // ✅ Top 5 products by quantity sold
    const topProducts = await Order.aggregate([
      { $match: matchFilter },
      { $unwind: '$items' },
      {
        $group: {
          _id: '$items.productId',
          quantitySold: { $sum: '$items.quantity' }
        }
      },
      {
        $lookup: {
          from: 'products',
          localField: '_id',
          foreignField: '_id',
          as: 'product'
        }
      },
      { $unwind: '$product' },
      {
        $project: {
          name: '$product.name',
          quantitySold: 1
        }
      },
      { $sort: { quantitySold: -1 } },
      { $limit: 5 }
    ]);

    // ✅ Latest 5 orders for summary
    const recentOrders = await Order.find(matchFilter)
      .sort({ createdAt: -1 })
      .limit(5)
      .select('customerName total status createdAt')
      .lean();

    // ✅ Group orders by status
    const statusCounts = await Order.aggregate([
      { $match: matchFilter },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const ordersByStatus = {};
    statusCounts.forEach(({ _id, count }) => {
      ordersByStatus[_id] = count;
    });

    // ✅ Final dashboard response
    res.json({
      totalOrders,
      totalProducts,
      totalRevenue,
      monthlySales,
      topProducts,
      recentOrders,
      ordersByStatus
    });

  } catch (error) {
    console.error('Dashboard Error:', error);
    res.status(500).json({ message: 'Failed to load dashboard summary' });
  }
};

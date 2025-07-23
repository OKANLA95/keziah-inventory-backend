// controllers/salesController.js
import Order from '../models/Order.js';

export const getSalesSummary = async (req, res) => {
  try {
    const monthlySales = await Order.aggregate([
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
          },
          totalSales: { $sum: '$total' },
        },
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } },
    ]);

    const summary = monthlySales.map((entry) => ({
      date: `${entry._id.year}-${String(entry._id.month).padStart(2, '0')}`,
      sales: entry.totalSales,
    }));

    res.json(summary);
  } catch (err) {
    console.error('❌ Sales summary error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

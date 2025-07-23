import express from 'express';
import Order from '../models/Order.js';
import Product from '../models/Product.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { customerName, items, contactInfo } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'No items in the order' });
    }

    // Calculate total and validate stock
    let total = 0;
    for (let item of items) {
      const product = await Product.findById(item.productId);
      if (!product) return res.status(404).json({ message: `Product not found: ${item.productId}` });
      if (product.quantity < item.quantity) {
        return res.status(400).json({ message: `Not enough stock for ${product.name}` });
      }

      product.quantity -= item.quantity;
      await product.save();
      total += item.quantity * product.price;
    }

    const order = await Order.create({
      customerName,
      items,
      total,
      contactInfo,
    });

    res.status(201).json(order);
  } catch (error) {
    console.error('Order creation failed:', error);
    res.status(500).json({ message: 'Server error while creating order' });
  }
});

export default router;

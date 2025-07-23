// routes/sampleProducts.js
import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

router.post('/insert-sample-products', async (req, res) => {
  try {
    const sampleProducts = [
      {
        name: 'Maize',
        description: 'Fresh Ghanaian maize',
        price: 10,
        quantity: 100,
        category: 'Grains',
        image: '',
      },
      {
        name: 'Tomatoes',
        description: 'Organic tomatoes',
        price: 8,
        quantity: 50,
        category: 'Vegetables',
        image: '',
      },
    ];

    await Product.insertMany(sampleProducts);

    res.status(201).json({ message: 'Sample products inserted successfully' });
  } catch (error) {
    console.error('Insert failed:', error);
    res.status(500).json({ message: 'Failed to insert sample products' });
  }
});

export default router;

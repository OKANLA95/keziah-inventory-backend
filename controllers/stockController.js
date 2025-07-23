// controllers/stockController.js
const Product = require('../models/Product');
const StockReceipt = require('../models/StockReceipt');

exports.receiveStock = async (req, res) => {
  try {
    const { productId, quantityReceived, supplier, receivedBy } = req.body;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    product.stock += quantityReceived;
    await product.save();

    const receipt = await StockReceipt.create({
      productId,
      quantityReceived,
      supplier,
      receivedBy,
    });

    res.status(201).json({ message: 'Stock updated successfully', receipt });
  } catch (err) {
    console.error('Stock Receive Error:', err);
    res.status(500).json({ message: 'Error receiving stock' });
  }
};

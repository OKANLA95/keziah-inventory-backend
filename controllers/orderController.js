const Order = require('../models/orderModel');
const Product = require('../models/Product');
const generateInvoice = require('../utils/invoiceGenerator');
const sendEmail = require('../utils/emailService');

// Create a new order aligned with updated frontend & data model
const createOrder = async (req, res) => {
  try {
    const { customer, products, totalAmount } = req.body;

    if (!customer || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ message: 'Missing required fields: customer and products.' });
    }

    const orderItems = [];

    for (const item of products) {
      const { productId, quantity } = item;

      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: `Product not found: ${productId}` });
      }

      if (product.stock < quantity) {
        return res.status(400).json({
          message: `Insufficient stock for "${product.name}". Available: ${product.stock}`,
        });
      }

      product.stock -= quantity;
      await product.save();

      orderItems.push({
        product: product._id,
        name: product.name,
        quantity,
        price: product.price,
      });
    }

    const newOrder = new Order({
      customerName: customer,
      items: orderItems,
      totalAmount,
    });

    await newOrder.save();

    // Generate invoice
    const invoicePath = generateInvoice(newOrder);

    // Optional: Send email (disabled unless email info is available)
    /*
    if (email) {
      await sendEmail({
        to: email,
        subject: 'Your Order Invoice - Keziah Mart',
        text: `Thank you for your order, ${customer}! Please find your invoice attached.`,
        attachments: [{ filename: `invoice-${newOrder._id}.pdf`, path: invoicePath }],
      });
    }
    */

    res.status(201).json({
      message: 'Order placed successfully',
      order: newOrder,
      invoice: invoicePath,
    });
  } catch (err) {
    console.error('❌ Order creation error:', err);
    res.status(500).json({ message: 'Failed to create order' });
  }
};

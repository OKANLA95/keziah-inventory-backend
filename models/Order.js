// models/Order.js
import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  product: { type: String, required: true },
  quantity: { type: Number, default: 1 },
  price: { type: Number, required: true },
  customerName: { type: String },
  status: { type: String, enum: ['pending', 'completed', 'cancelled'], default: 'pending' },
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

export default Order;

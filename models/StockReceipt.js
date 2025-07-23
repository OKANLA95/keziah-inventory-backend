// models/StockReceipt.js
const mongoose = require('mongoose');

const stockReceiptSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantityReceived: { type: Number, required: true },
  supplier: String,
  receivedBy: String, // Optional: who recorded it
  receivedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('StockReceipt', stockReceiptSchema);

import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  category: String,
  image: String
}, { timestamps: true });

// Prevent OverwriteModelError
const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;

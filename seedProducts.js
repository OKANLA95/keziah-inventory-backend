// seedProducts.js
import mongoose from 'mongoose';
import Product from './models/Product.js';
import dotenv from 'dotenv';

dotenv.config();
await mongoose.connect(process.env.MONGO_URI);

const sampleProducts = [
  {
    name: 'Keziah Rice',
    description: 'Premium local rice',
    price: 45,
    quantity: 100,
    category: 'Food',
    image: '',
  },
  {
    name: 'Sunlight Detergent',
    description: '500g washing powder',
    price: 15,
    quantity: 50,
    category: 'Cleaning',
    image: '',
  }
];

await Product.deleteMany({});
await Product.insertMany(sampleProducts);
console.log('✅ Products seeded');
process.exit();

const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Add item to cart
const addToCart = async (req, res) => {
  const userId = req.user.id;
  const { productId, quantity } = req.body;

  if (!productId || quantity <= 0) {
    return res.status(400).json({ message: 'Invalid product or quantity' });
  }

  let cart = await Cart.findOne({ user: userId });
  if (!cart) {
    cart = new Cart({ user: userId, items: [] });
  }

  const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
  if (itemIndex > -1) {
    cart.items[itemIndex].quantity += quantity;
  } else {
    cart.items.push({ productId, quantity });
  }

  await cart.save();
  res.status(200).json({ message: 'Item added to cart', cart });
};

// View cart
const getCart = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user.id }).populate('items.productId');
  res.status(200).json(cart || { items: [] });
};

module.exports = { addToCart, getCart };

// controllers/shopController.js
const Shop = require('../models/shopModel');

const setupShopDetails = async (req, res) => {
  try {
    const { name, address, phone, email, taxId, logoUrl } = req.body;

    const existing = await Shop.findOne({ owner: req.user._id });

    if (existing) {
      // Update
      Object.assign(existing, { name, address, phone, email, taxId, logoUrl });
      await existing.save();
      return res.status(200).json({ message: 'Shop details updated', shop: existing });
    }

    // Create new
    const newShop = new Shop({ owner: req.user._id, name, address, phone, email, taxId, logoUrl });
    await newShop.save();
    res.status(201).json({ message: 'Shop created', shop: newShop });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

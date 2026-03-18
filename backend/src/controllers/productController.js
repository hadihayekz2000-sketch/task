const Product = require('../models/Product');


exports.createProduct = async (req, res) => {
  try {
    const { name, price, stock } = req.body;
    const existing = await Product.findOne({ name });
    if (existing) {
      return res.status(400).json({ message: 'Product already exists' });
    }

    const product = new Product({ name, price, stock });
    await product.save();
    res.status(201).json({ success: true, data: product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err });
  }
};
exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();

    res.json({
      success: true,
      data: products,
    });
  } catch (err) {
    next(err);
  }
};
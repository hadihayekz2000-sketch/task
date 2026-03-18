const Order = require('../models/Order');
const Product = require('../models/Product');
const { analyzeOrders } = require('../services/analyticsService');

exports.getInsights = async (req, res, next) => {
  try {
    const orders = await Order.find();
    const products = await Product.find();

    const insights = analyzeOrders(orders, products);

    res.json({
      success: true,
      data: insights,
    });
  } catch (err) {
    next(err);
  }
};
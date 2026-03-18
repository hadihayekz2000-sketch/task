const Order = require('../models/Order');
const Product = require('../models/Product');

exports.createOrder = async (req, res, next) => {
  try {
    const { items } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'No items provided' });
    }

    let totalAmount = 0;
    const processedItems = [];

    for (const item of items) {
      const product = await Product.findById(item.productId);

      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      if (product.stock < item.qty) {
        return res.status(400).json({
          message: `Insufficient stock for ${product.name}`,
        });
      }

      const itemTotal = product.price * item.qty;
      totalAmount += itemTotal;

      
      product.stock -= item.qty;
      await product.save();

      processedItems.push({
        productId: product._id,
        name: product.name,
        qty: item.qty,
        price: product.price,
      });
    }

    const order = await Order.create({
      items: processedItems,
      totalAmount,
    });

    res.status(201).json({
      success: true,
      data: order,
    });
  } catch (err) {
    next(err);
  }
};

exports.getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find().populate('items.productId');

    res.json({
      success: true,
      data: orders,
    });
  } catch (err) {
    next(err);
  }
};
const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  },
  name: String,
  qty: {
    type: Number,
    required: true,
    min: 1,
  },
  price: Number,
});

const orderSchema = new mongoose.Schema(
  {
    items: [orderItemSchema],
    totalAmount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
const express = require('express');
const cors = require('cors');

const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const insightRoutes = require('./routes/insightRoutes');

const app = express();

app.use(cors());
app.use(express.json()); 


app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/insights', insightRoutes);
app.get('/', (req, res) => {
  res.send('API is running...');
});

const errorHandler = require('./utils/errorHandler');
app.use(errorHandler);

module.exports = app;
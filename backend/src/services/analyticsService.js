const analyzeOrders = (orders, products) => {
  const productSales = {};
  const hourlySales = {};
  const dailySales = {};

  let totalRevenue = 0;

  orders.forEach(order => {
    const date = new Date(order.createdAt);

    const hour = date.getHours();
    hourlySales[hour] = (hourlySales[hour] || 0) + 1;

    const day = date.toISOString().split('T')[0];
    dailySales[day] = (dailySales[day] || 0) + order.totalAmount;


    totalRevenue += order.totalAmount;

    order.items.forEach(item => {
      productSales[item.name] =
        (productSales[item.name] || 0) + item.qty;
    });
  });

  
  const topProducts = Object.entries(productSales)
    .sort((a, b) => b[1] - a[1])
    .map(([name, qty]) => ({ name, qty }));


  const busiestHours = Object.entries(hourlySales)
    .sort((a, b) => b[1] - a[1])
    .map(([hour, count]) => ({ hour: Number(hour), count }));

  
  const lowStock = products.filter(p => p.stock < 10);

  
  const recommendations = [];

  topProducts.forEach(tp => {
    const product = products.find(p => p.name === tp.name);

    if (!product) return;

    
    if (product.stock < tp.qty * 2) {
      recommendations.push({
        product: product.name,
        message: `High demand detected. Consider restocking ${product.name}`,
      });
    }
  });

  return {
    totalRevenue,
    topProducts,
    busiestHours,
    dailySales,
    lowStock,
    recommendations,
  };
};

module.exports = { analyzeOrders };
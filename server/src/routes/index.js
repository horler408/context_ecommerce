const userRoutes = require('./userRoute.js');
const productRoutes = require('./productRoute.js');
const orderRoutes = require('./orderRoute.js');
const ImportData = require('../utils/dataImport.js');

module.exports = (app) => {
  app.use('/api/import', ImportData);
  app.use('/api/users', userRoutes);
  app.use('/api/products', productRoutes);
  app.use('/api/orders', orderRoutes);
  // app.get('/api/config/paystack', (req, res) => {
  //   res.send(process.env.PAYMENT_CLIENT_ID);
  // });
};

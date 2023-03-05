const joiSchema = require('../../utils/joiSchema.js');

const userRoutes = require('./routes/userRoute.js');
const productRoutes = require('./routes/productRoute.js');
const orderRoutes = require('./routes/orderRoute.js');
const ImportData = require('./utils/dataImport.js');

module.exports = (app) => {
  app.use('/api/import', ImportData);
  app.use('/api/users', userRoutes);
  app.use('/api/products', productRoutes);
  app.use('/api/orders', orderRoutes);
};

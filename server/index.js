const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');

const index = require('./src/routes/index');
const dbConnect = require('./config/db.js');
// const ImportData = require('./utils/dataImport.js');
// const userRoutes = require('./routes/userRoute.js');
// const productRoutes = require('./routes/productRoute.js');
// const orderRoutes = require('./routes/orderRoute.js');
const { notFound, errorHandler } = require('./middlewares/Errors.js');

dotenv.config();
const app = express();

app.use(express.json()); // to accept json data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

dbConnect();
app.use(cors());

// app.use('/api/import', ImportData);
// app.use('/api/users', userRoutes);
// app.use('/api/products', productRoutes);
// app.use('/api/orders', orderRoutes);
// app.get('/api/config/paystack', (req, res) => {
//   res.send(process.env.PAYMENT_CLIENT_ID);
// });

// Routes
index(app);

// Error Handlers
app.use(notFound);
app.use(errorHandler);

const port = process.env.port || 3001;
app.listen(port, () => console.log(`Server running on port ${port}`));

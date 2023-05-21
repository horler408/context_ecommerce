const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');

const index = require('./src/routes/index');
const dbConnect = require('./src/config/db.js');
const { notFound, errorHandler } = require('./src/middlewares/Errors.js');

// const userRoutes = require('./src/routes/userRoute.js');
// const productRoutes = require('./src/routes/productRoute.js');
// const orderRoutes = require('./src/routes/orderRoute.js');

dotenv.config();
const app = express();

app.use(express.json()); // to accept json data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

dbConnect();
app.use(cors());

// Routes
index(app);

// app.use('/api/users', userRoutes);
// app.use('/api/products', productRoutes);
// app.use('/api/orders', orderRoutes);

// Error Handlers
app.use(notFound);
app.use(errorHandler);

const port = process.env.port || 3001;
app.listen(port, () => console.log(`Server running on port ${port}`));

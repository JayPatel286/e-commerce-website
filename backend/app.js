const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

const errorMiddleware = require('./middlewares/Error');

const app = express();

// Import your routes here
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

// Setting configuration for the env file
dotenv.config({ path: 'backend/config/config.env' });

// Middlewares
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(fileUpload());

// Use imported routes here
app.use('/api/v1', productRoutes);
app.use('/api/v1', userRoutes);
app.use('/api/v1', orderRoutes);
app.use('/api/v1', paymentRoutes);

// Error handling middleware
app.use(errorMiddleware);

module.exports = app;

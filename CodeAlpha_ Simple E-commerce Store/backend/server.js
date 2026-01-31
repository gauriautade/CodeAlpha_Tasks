require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require("path");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "../frontend/images")));

// ROUTES (VERY IMPORTANT)
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));

app.listen(5000, () => {
  console.log('Server running on port 5000');
});

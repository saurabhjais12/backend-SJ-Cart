const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const rou = require('./routes/router');  
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

// CORS configuration
app.use(cors({
  origin: ['http://localhost:5173', 'https://frontend-sj-cart-4.onrender.com'], 
  credentials: true,
}));

// Middleware
app.use(express.json());
app.use(cookieParser());


// API routes
app.use('/api', rou);
// Connect to MongoDB
connectDB();


// Start server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

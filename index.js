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
  origin: ['http://localhost:5173', 'https://your-production-site.com'], 
  credentials: true,
}));

// Middleware
app.use(express.json());
app.use(cookieParser());


// API routes
app.use('/api', rou);
// Connect to MongoDB
connectDB();

console.log(__dirname);



// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../frontend', '/dist', '/index.html'));
// });


// Start server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

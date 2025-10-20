const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const authRouter = require('./routes/auth.route.js');
const wasteRouter = require('./routes/waste.route.js');

const app = express();
const port = process.env.PORT || 5002;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/listings', wasteRouter);

const uri = process.env.MONGO_URI;
mongoose.connect(uri)
  .then(() => {
    console.log("✅ MongoDB database connection established successfully");
    app.listen(port, () => {
      console.log(`Backend server is running on http://localhost:${port}`);
    });
  })
  .catch(err => {
    console.error("❌ MongoDB connection error:", err);
  });
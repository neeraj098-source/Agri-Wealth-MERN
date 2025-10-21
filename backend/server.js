const express = require('express');
const cors = require('cors'); // <--- Yeh pehle se hai
const mongoose = require('mongoose');
require('dotenv').config();

const authRouter = require('./routes/auth.route.js');
const wasteRouter = require('./routes/waste.route.js');

const app = express();
const port = process.env.PORT || 5002;

// --- YAHAN BADLAAV KIYA GAYA HAI ---

const corsOptions = {
  origin: 'https://agri-wealth-mern-frontend.vercel.app' 
};
app.use(cors(corsOptions));
// ------------------------------------

app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/listings', wasteRouter); // Aapke code mein '/api/listings' tha, maine wahi rakha hai

const uri = process.env.MONGO_URI;
mongoose.connect(uri)
  .then(() => {
    console.log("✅ MongoDB database connection established successfully");
    app.listen(port, () => {
      // Yeh console log sirf local machine par dikhega, Railway par nahi
      // Railway par yeh "Server is running on port XXXX" apne aap dikhayega
      console.log(`Backend server is running on http://localhost:${port}`);
    });
  })
  .catch(err => {
    console.error("❌ MongoDB connection error:", err);
  });
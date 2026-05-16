/*const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const jobRoutes = require("./routes/jobs");
const errorHandler = require("./middleware/errorHandler");

const app = express();

// Middleware
app.use(cors({ origin: '*' }));
app.use(express.json());

// Routes
app.use("/api/jobs", jobRoutes);

// Health check
app.get("/", (req, res) => res.json({ message: "GlobalTNA API running" }));

// Global error handler (must be last)
app.use(errorHandler);

// Connect to DB then start server
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("❌ DB connection failed:", err.message);
    process.exit(1);
  });*/

  require('dotenv').config();
  const express = require('express');
  const cors = require('cors');
  const mongoose = require('mongoose');
  
  const jobRoutes = require('./routes/jobs');
  const errorHandler = require('./middleware/errorHandler');
  
  const app = express();
  
  app.use(cors());
  app.use(express.json());
  
  app.use('/api/jobs', jobRoutes);
  
  app.get('/', (req, res) => res.json({ message: 'GlobalTNA API running' }));
  
  app.use(errorHandler);
  
  const PORT = process.env.PORT || 5000;
  const MONGO_URI = process.env.MONGO_URI;
  
  mongoose
    .connect(MONGO_URI)
    .then(() => {
      console.log('✅ MongoDB connected');
      app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
    })
    .catch((err) => {
      console.error('❌ DB connection failed:', err.message);
      process.exit(1);
    });
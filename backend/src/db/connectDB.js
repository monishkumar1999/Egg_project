
const mongoose = require('mongoose');
require('dotenv').config();  // Load environment variables from .env file


const mongoURI = process.env.MONGODB_URI || "mongodb://localhost:27017/mydatabase";  // Default to local MongoDB URI

// Function to connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit the process with failure if the connection fails
  }
};

module.exports = connectDB;

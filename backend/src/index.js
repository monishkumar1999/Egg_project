// index.js
const express = require("express");
const connectDB = require("./db/connectDB"); // Import the MongoDB connection logic

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Basic route
app.get("/", (req, res) => {
  res.send("Hello, Express with MongoDB!");
});

// Set the port from .env or default to 3000
const port = process.env.PORT || 3000;

// Create an async function to run the app
const startServer = async () => {
  try {
    // Wait for the DB connection to be established
    await connectDB();
    console.log("Database connected successfully");

    // Start the server only after DB connection
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    process.exit(1); // Exit if the DB connection fails
  }
};

// Call the startServer function to run the app
startServer();

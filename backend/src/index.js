// index.js
const express = require("express");
const connectDB = require("./db/connectDB"); // Import the MongoDB connection logic
const adminRouter = require("./router/admin");
const app = express();
app.use(express.json());
const cookieParser = require("cookie-parser");

app.use("/admin",adminRouter);





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

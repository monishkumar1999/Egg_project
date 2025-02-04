// Load environment variables from .env file
require('dotenv').config();

// Export the JWT_SECRET environment variable using module.exports
module.exports = {
  jwt_secret: process.env.JWT_SECRET
};

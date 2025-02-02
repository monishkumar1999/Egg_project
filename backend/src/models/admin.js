const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  mobile_no: {
    type: String,
    required: true,
    unique: true,
  },
  district: {
    type: String,
  },
  noOfUserAllow: {
    type: Number,
    default: 10,
    required: true,
  },
  subscriptionDate: {
    type: Date, // Added type Date for subscription date
  },
  subscriptionAmount: {
    type: Number, // Added type Number for subscription amount
  },
  action: {
    type: Number, // Ensuring the type is Number
    enum: [0, 1], // Subscription can either be 0 or 1 (inactive or active)
    default: 0, 
  },
  is_subscription: {
    type: Number, // Ensuring the type is Number
    enum: [0, 1], // Subscription can either be 0 or 1 (inactive or active)
    default: 0, // Default value is 0 (inactive)
  },
}, { timestamps: true }); // Add timestamps to auto-create createdAt and updatedAt fields

// Create and export the Admin model
const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;

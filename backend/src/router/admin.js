const express = require("express");
const Admin = require("../models/admin");
const jwt = require("jsonwebtoken");
const { checkAdminMobile } = require("../services/admin");
const { jwt_secret } = require("../utils/constant");
const cookieParser = require("cookie-parser");
const verifyToken = require("../middleware/verifyAdmin");

const SECRET_KEY = jwt_secret;

const adminRouter = express.Router();

adminRouter.post("/add", async (req, res) => {
    console.log(req.body);

    try {
        const admin = new Admin(req.body);
        await admin.save();
        res.json({
            status: "true",
            message: "Admin created successfully",
        });
    } catch (err) {
        res.send(err.message);
    }
});

adminRouter.get("/login", async (req, res) => {
    try {
        const { mobile_no } = req.body;

        const admin = await checkAdminMobile(mobile_no);
        const token = jwt.sign({ id: admin._id, mobile_no: admin.mobile_no }, SECRET_KEY, {
            expiresIn: "5d",
        });

        res.cookie("auth_token", token, { maxAge: 5 * 24 * 60 * 60 * 1000, });
        res.json({
            status: "true",
            message: admin.mobile_no,
            token: token
        });
    } catch (err) {
        res.json({
            status: "false",
            message: err.message,
        });
    }
});

adminRouter.post("/sendOtp", async (req, res) => {
    try {

        const generateOtp = () => {
            return Math.floor(100000 + Math.random() * 900000); // Generates a 6-digit number
        };
        const { mobile_no } = req.body;

        // Check if the admin exists
        const admin = await checkAdminMobile(mobile_no);
        if (!admin) {
            return res.status(404).json({ status: "false", message: "Admin not found" });
        }

        // Generate OTP
        const otp = generateOtp();

        // Store OTP in the admin document (assuming you're using MongoDB and Mongoose)
        admin.otp = otp;
        admin.otpExpiry = Date.now() + 10 * 60 * 1000; // OTP expires in 10 minutes
        await admin.save();

        // Respond with OTP (in a real-world app, you'd send this via SMS/email)
        res.json({ status: "true", message: "OTP sent successfully", otp: otp });
    } catch (err) {
        res.status(500).json({ status: "false", message: err.message });
    }
});
adminRouter.get("/test", verifyToken, async (req, res) => {

    console.log(req.admin)
    res.json({ cookies: req.cookies }); // Sends cookies as response (optional)
});


module.exports = adminRouter;

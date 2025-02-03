const express = require("express");
const Admin = require("../models/admin");
const jwt = require("jsonwebtoken");
const { checkAdminMobile } = require("../services/admin");
const { jwt_secret } = require("../utils/constant");
const cookieParser = require("cookie-parser");

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
   const token= jwt.sign({ id: admin._id, mobile_no: admin.mobile_no }, SECRET_KEY, {
      expiresIn: "5d",
    });

    res.cookie("auth_token",token,{ maxAge: 5 * 24 * 60 * 60 * 1000,});
    res.json({
      status: "true",
      message: admin,
       token:token
    });
  } catch (err) {
    res.json({
      status: "false",
      message: err.message,
    });
  }
});

module.exports = adminRouter;

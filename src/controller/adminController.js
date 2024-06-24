// userController.js

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Admin = require("../models/adminModel");


exports.register = async (req, res) => {
  try {
    const { email, password, name, providerName, providerUId, isAdmin } =
      req.body.AdminData;
    console.log(req.body);

    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      return res.json({ message: "email already exists" });
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt?.hash(password || " ", 10);

    const newAdmin = new Admin({
      name,
      password: hashedPassword,
      email,
      providerName,
      providerUId,
    });

    newAdmin.isAdmin = isAdmin || false;
    await newAdmin.save();

    res.json({ message: "Admin registered successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email);
    console.log("Email:", email);
    console.log("Old Password:", password);

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.json({ error: "Admin does not exist" });
    }

    // Compare hashed passwords
    const isPasswordMatch = await bcrypt.compare(password, admin.password);

    if (!isPasswordMatch) {
      return res.json({ error: "Invalid password" });
    }

    // Check if the Admin is an admin
    if (!admin.isAdmin) {
      console.log(admin.isAdmin);
      return res.json({ error: "Admin access required" });
    }

    // Generate JWT token
    // const token = jwt.sign({ AdminId: Admin._id }, 'your_secret_key', { expiresIn: '1h' });

    res.json({ message: "Sign In Successfully", isAdmin: admin.isAdmin, uid: admin._id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(404).json({ error: "Admin does not exist" });
    }

    // Compare hashed passwords
    const isPasswordMatch = await bcrypt.compare(password, admin.password);

    if (!isPasswordMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // Generate JWT token
    // const token = jwt.sign({ AdminId: Admin._id }, 'your_secret_key', { expiresIn: '1h' });

    res.status(200).json({ message: "Sign In Successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
exports.getallAdminname = async (req, res) => {
  try {
    const profiles = await Admin.find();
    res.json(profiles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.adminChangePass = async (req, res) => {
  try {
    const { email, password, newPassword } = req.body;
    console.log("Email:", email);
    console.log("Old Password:", password);
    // console.log("New Password:", newPassword);

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(404).json({ error: "Admin does not exist" });
    }

    // Check if the Admin has admin privileges
    if (!admin.isAdmin) {
      return res.status(403).json({ error: "Admin access required" });
    }

    // Compare hashed passwords
    const isPasswordMatch = await bcrypt.compare(password, admin.password);

    if (!isPasswordMatch) {
      return res.status(401).json({ error: "Invalid old password" });
    }

    // Hash the new password before saving it
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update the Admin's password in the database
    admin.password = hashedNewPassword;
    console.log(newPassword);
    await admin.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

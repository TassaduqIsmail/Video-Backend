// userController.js

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

exports.register = async (req, res) => {
  try {
    const {
      email,
      password,
      name,
      providerName,
      providerUId,
      status,
      isIntro,
    } = req.body;
    console.log(req.body);

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.json({ message: "email already exists" });
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt?.hash(password || " ", 10);

    const newUser = new User({
      name,
      password: hashedPassword,
      email,
      providerName,
      providerUId,
      status,
      isIntro,
    });
    const user = await newUser.save();

    res.json({
      succes: true,
      message: "User registered successfully",
      uid: user?._id,
      isIntro: user?.isIntro,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
exports.login = async (req, res) => {
  try {
    const { email, password, providerUId } = req.body;
    console.log(email, providerUId);

    const user = await User.findOne({ email });

    console.log("hhh", user);
    if (!user) {
      return res.json({ error: "User does not exist" });
    }

    if (providerUId) {
      if (user.providerUId === providerUId) {
        return res.json({
          succes: true,
          message: "Sign In Successfully",
          uid: user._id,
        });
      }
    }

    // Compare hashed passwords
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.json({ error: "Invalid password" });
    }

    // Generate JWT token
    // const token = jwt.sign({ userId: user._id }, 'your_secret_key', { expiresIn: '1h' });

    res.json({
      succes: true,
      message: "Sign In Successfully",
      uid: user._id,
      isIntro: user?.isIntro,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.verifyEmail= async(req,res)=>{
  try {
    const { email } = req.body; // Expecting a new password from the request
    console.log(req.body);
    const user = await User.findOne({ email:req.body.email });
    console.log(user);
    if (!user) {
      return res.json({ error: "User does not exist" });
    }
    res.json({succes:true})

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email, password } = req.body; // Expecting a new password from the request

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User does not exist" });
    }

    // Generate a new hashed password
    const hashedPassword = await bcrypt.hash(password || " ", 10); // newPassword is the user's new desired password
    user.password = hashedPassword; // Update the user's password

    await user.save(); // Save the updated user document to the database

    // Inform the user of success without logging them in or sending a token
    res.json({ message: "Password reset successfully. Please log in with your new password." , succes:true});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (users == null) {
      return res.json({ error: "Profile not found" });
    }
    res.json({ message: "Profile found", data: users });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getUserByUid = async (req, res) => {
  try {
    console.log(req.params);
    const profile = await User.findById(req.params.uid);
    // console.log(profile);
    if (profile == null) {
      return res.json({ error: "user not found", succes: false });
    }
    res.json({ message: "user found", data: profile, succes: true });
  } catch (err) {
    return res.status(500).json({ message: err.message, succes: true });
  }
};

exports.updateUsersStatus = async (req, res) => {
  try {
    console.log(req.body);
    const id = req.params.uid;
    const users = await User.findOneAndUpdate(
      { _id: id },
      { $set: { status: req.body.status } },
      { new: true }
    );
    res.json(users);
    // console.log(Admin.status);
  } catch (error) {
    console.error("Error updating Status:", error);
    throw error;
  }
};
exports.updateIntroStatus = async (req, res) => {
  try {
    console.log("isintro status", req.body);
    const id = req.params.uid;
    const users = await User.findOneAndUpdate(
      { _id: id },
      { $set: { isIntro: req.body.isIntro } },
      { new: true }
    );
    res.json({ succes: true, message: "update Successfully" });
    // console.log(Admin.status);
  } catch (error) {
    console.error("Error updating Status:", error);
    throw error;
  }
};
exports.updateDeletestatus = async (req, res) => {
  try {
    console.log("isintro status", req.body);
    const id = req.params.uid;
    const users = await User.findOneAndUpdate(
      { _id: id },
      { $set: { isDeleated: req.body.isDeleated } },
      { new: true }
    );
    res.json({ succes: true, message: "delete Successfully" });
    // console.log(Admin.status);
  } catch (error) {
    console.error("Error deleteing User:", error);
    throw error;
  }
};

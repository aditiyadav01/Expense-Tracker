const User = require("../models/User.js");
const jwt = require("jsonwebtoken");
const express = require("express");

//generate jwt token

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// register user
exports.registerUser = async (req, res) => {
  const { fullName, email, password, profileImageUrl } = req.body;

  //validation check for missing fields

  if (!fullName || !email || !password) {
    return res.status(400).json({ message: "all fields are required" });
  }

  try {
    //check if email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already in use" });
    }

    //create the user

    const user = await User.create({
      fullName,
      email,
      password,
      profileImageUrl: profileImageUrl || "",
    });

    res.status(201).json({
      // id: user._id,
      user,
      token: generateToken(user._id),
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error in logging user", error: error.message });
  }
};

// login user
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "all fields are required" });
  }
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ message: "invalid credentials" });
    }

    res.status(201).json({
      id: user._id,
      user,
      token: generateToken(user._id),
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error in loging user", error: err.message });
  }
};

// get user
exports.getUserInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error in getting info" });
  }
};

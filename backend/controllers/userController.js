const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");

const registerUser = asyncHandler(async (req, res) => {
  const { name, username, password, pic } = req.body;

  if (!name || !username || !password) {
    res.status(400);
    throw new Error("Please fill out all fields.");
  }

  const userExists = await User.findOne({ username });

  if (userExists) {
    res.status(400);
    throw new Error("This username is taken.");
  }

  const user = await User.create({
    name,
    username,
    password,
    pic,
  });

  if (user) {
    // 201, user was created
    res.status(201).json({
      _id: user._id,
      name: user.name,
      username: user.username,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    throw new Error("Failed to register.");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400);
    throw new Error("Please fill out all fields.");
  }

  const user = await User.findOne({ username });

  if (!user || !(await user.matchPassword(password))) {
    res.status(400);
    throw new Error("Username or password is incorrect.");
  }

  res.json({
    id: user._id,
    name: user.name,
    username: user.username,
    pic: user.pic,
    token: generateToken(user.id),
  });
});

module.exports = { registerUser, loginUser };

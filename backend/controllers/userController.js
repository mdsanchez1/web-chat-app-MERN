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
    picture,
  });

  if (user) {
    // 201, user was created
    res.status(201).json({
      _id: user._id,
      name: user.name,
      username: user.username,
      pic: user.picture,
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
    pic: user.picture,
    token: generateToken(user.id),
  });
});

// GET /api/user/
// get the list of all users, unless a specific query is specified
const getUsers = asyncHandler(async (req, res) => {
  const user = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { username: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(user); //.find({ _id: { $ne: req.user._id } });

  res.send(users);
});

module.exports = { registerUser, loginUser, getUsers };

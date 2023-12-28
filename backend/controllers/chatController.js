const asyncHandler = require("express-async-handler");
const Chat = require("../models/chatModel");
const User = require("../models/userModel");

// POST api for accessing one on one chats. Will create a new chat if it does not exist.
const accessChat = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  // if not requesting to access a chat with another person, throw error
  if (!userId) {
    console.log("UserID missing from request.");
    return res.sendStatus(400);
  }

  // Find the chat, populate results (expand them so its not just object id)
  var isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { members: { $elemMatch: { $eq: req.user._id } } },
      { members: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("members", "-password")
    .populate("latestMessage");

  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name picture username",
  });

  // if isChat is empty, there is no chat. Make one. Otherwise, return the chat that was found.
  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    var chatData = {
      chatName: "sender",
      isGroupChat: false,
      members: [req.user._id, userId],
    };

    // create new chat in database
    try {
      const newChat = await Chat.create(chatData);

      const fullChat = await Chat.findOne({
        _id: newChat._id,
      }).populate("members", "-password");

      res.status(200).json(fullChat);
    } catch (err) {
      res.send(400);
      throw new Error(err.message);
    }
  }
});

// GET api for getting the list of chats a user is in.
const fetchChats = asyncHandler(async (req, res) => {
  try {
    Chat.find({ members: { $elemMatch: { $eq: req.user._id } } })
      .populate("members", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await User.populate(results, {
          path: "latestMessage.sender",
          select: "name pic username",
        });

        res.status(200).json(results);
      });
  } catch (err) {
    res.status(400);
    throw new Error(err.message);
  }
});

//POST api for creating a new group chat
const createGroupChat = asyncHandler(async (req, res) => {
  // if request does not have a name or members, invalid
  if (!req.body.name || !req.body.members) {
    return res.status(400).send({ message: "Please fill out all fields." });
  }

  var members = JSON.parse(req.body.members);

  if (members.length < 2) {
    return res.status(400).send("At least 2 other users are required.");
  }

  members.push(req.user);

  try {
    const groupChat = await Chat.create({
      chatName: req.body.name,
      members: members,
      isGroupChat: true,
      groupAdmin: req.user,
    });

    const dbGC = await Chat.findOne({ _id: groupChat._id })
      .populate("members", "-password")
      .populate("groupAdmin", "-password");

    res.status(200).json(dbGC);
  } catch (err) {
    res.status(400);
    throw new Error(err.message);
  }
});

// PUT api used to rename group chats.
const renameChat = asyncHandler(async (req, res) => {
  const { chatId, chatName } = req.body;
  // find chat (where active user is an admin), update the name, return update chat from database
  const chat = await Chat.findOne({ _id: chatId, groupAdmin: req.user._id })
    .populate("members", "-password")
    .populate("groupAdmin", "-password");

  if (!chat) {
    res.status(404);
    throw new Error("Lacking permissions or chat not found.");
  }

  chat.chatName = chatName;
  const updatedChat = await chat.save();

  res.json(updatedChat);
});

//PUT api used to add a group member
const addMember = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;

  // make sure active user is an admin of this groupchat
  const chat = await Chat.findOne({ _id: chatId, groupAdmin: req.user._id });

  if (!chat) {
    res.status(404);
    throw new Error("Lacking permissions or chat not found.");
  }
  // find chat (where active user is an admin), and add the member
  const updatedChat = await Chat.findByIdAndUpdate(
    chatId,
    { $push: { users: userId } },
    { new: true }
  )
    .populate("members", "-password")
    .populate("groupAdmin", "-password");

  if (!chat) {
    res.status(404);
    throw new Error("Lacking permissions or chat not found.");
  }

  res.json(updatedChat);
});

//PUT api used to remove a group member
const removeMember = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;

  // make sure active user is an admin of this groupchat
  const chat = await Chat.findOne({ _id: chatId, groupAdmin: req.user._id });

  if (!chat) {
    res.status(404);
    throw new Error("Lacking permissions or chat not found.");
  }
  // find chat (where active user is an admin), and add the member
  const updatedChat = await Chat.findByIdAndUpdate(
    chatId,
    { $pull: { users: userId } },
    { new: true }
  )
    .populate("members", "-password")
    .populate("groupAdmin", "-password");

  if (!chat) {
    res.status(404);
    throw new Error("Lacking permissions or chat not found.");
  }

  res.json(updatedChat);
});
module.exports = {
  accessChat,
  fetchChats,
  createGroupChat,
  renameChat,
  addMember,
  removeMember,
};

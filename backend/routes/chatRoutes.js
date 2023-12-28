const express = require("express");
const {
  accessChat,
  fetchChats,
  createGroupChat,
  renameChat,
  addMember,
  removeMember,
} = require("../controllers/chatController");
const { authorize } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").post(authorize, accessChat).get(authorize, fetchChats);
router
  .route("/group")
  .post(authorize, createGroupChat)
  .put(authorize, renameChat);
router.route("/groupadd").put(authorize, addMember);
router.route("/groupremove").put(authorize, removeMember);
module.exports = router;

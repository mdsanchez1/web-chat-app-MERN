const express = require("express");
const {
  registerUser,
  loginUser,
  getUsers,
} = require("../controllers/userController");
const { authorize } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").post(registerUser).get(authorize, getUsers);
router.post("/login", loginUser);

module.exports = router;

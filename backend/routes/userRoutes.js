const express = require("express");
const {
  registerUser,
  loginUser,
  getUsers,
} = require("../controllers/userController");

const router = express.Router();

router.route("/").post(registerUser).get(getUsers);
router.post("/login", loginUser);

module.exports = router;

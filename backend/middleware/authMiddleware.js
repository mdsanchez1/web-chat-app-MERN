const jwt = require("jsonwebtoken");
const User = require("../models/userModel.js");
const asyncHandler = require("express-async-handler");

// authorize user based on their jwt token
const authorize = asyncHandler(async (req, res, next) => {
  let token;

  // check if the request has valid authorization field header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // jwt token lookgs like: Bearer token
      token = req.headers.authorization.split(" ")[1];

      // decode token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // return matching user from database, without password
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      // if user in database does not match JWT token, not authorized
      res.status(401);
      throw new Error("Not authorized.");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized.");
  }
});

module.exports = { authorize };

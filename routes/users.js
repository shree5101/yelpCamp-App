const express = require("express");
const mongoose = require("mongoose");
const router = express.Router({ mergeParams: true });
const catchAsync = require("../utils/catchAsync");
const ExpressError = require("../utils/ExpressError");
const users = require("../controllers/users");
const User = require("../models/user");
const passport = require("passport");

router
  .route("/register")
  .get(users.renderRegisterForm)
  .post(catchAsync(users.createUser));

router
  .route("/login")
  .get(users.renderLoginForm)
  .post(
    passport.authenticate("local", {
      failureFlash: true,
      failureRedirect: "login",
    }),
    users.loginUser
  );

router.get("/logout", users.logoutUser);

module.exports = router;

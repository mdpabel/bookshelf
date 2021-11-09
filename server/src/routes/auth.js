const express = require("express");
const User = require("../models/user-model");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/me", authMiddleware, (req, res, next) => {
  try {
    res.status(200).send({
      data: req.user,
      token: req.token,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  const body = req.body;
  try {
    const user = await User.findByCredentials(User, body.email, body.password);
    if (!user) {
      throw new Error("Invalid credentials!");
    }
    const token = await user.generateAuthToken();

    res.status(200).json({
      success: true,
      data: { user, token },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;

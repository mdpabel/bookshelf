const express = require("express");

const User = require("../models/user-model");

const router = express.Router();

router.post("/signup", async (req, res, next) => {
  const data = req.body;

  try {
    const isExist = await User.findOne({ email: data.email });

    if (isExist) {
      return res.status(400).send({
        success: false,
        data: "The email is already registered",
      });
    }

    const newUser = new User(data);
    await newUser.save();

    const token = await newUser.generateAuthToken();

    res.status(201).json({
      success: true,
      data: { newUser, token },
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.delete("/delete/:id", async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id, { new: true });
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {}
});

module.exports = router;

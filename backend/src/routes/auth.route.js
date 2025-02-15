const express = require("express");
const validateRequest = require("../middlewares/validate-request");
const Joi = require("joi");
const User = require("../models/User");
const moment = require("moment");
const { v4: uuidv4 } = require("uuid");

const router = express.Router();

router.post("/complete", async (req, res, next) => {
  const { categories } = req.body;

  try {
    if (username) {
      let user = await User.findOne({ username });

      if (!user) {
        user = new User({ username });
        await user.save();
      }
      user.categories = categories;
      await user.save();
      return res.json({ data: user });
    }
  } catch (error) {
    return res.status(400).json({ message: error?.message || error });
  }
});

router.post("/signin", async (req, res, next) => {
  try {
    const { username } = req.body;
    let user = null;

    if (!username) throw "username is required";

    user = await User.findOne({ username });

    if (!user) {
      user = new User({ username });
    }
    await user.save();

    return res.json({ data: user });
  } catch (error) {
    return res.status(400).json({ message: error?.message || error });
  }
});

module.exports = router;

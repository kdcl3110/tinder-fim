const express = require("express");
const validateRequest = require("../middlewares/validate-request");
const Joi = require("joi");
const User = require("../models/User");
const moment = require("moment");
const { v4: uuidv4 } = require("uuid");

const router = express.Router();

router.post("/singup", async (req, res, next) => {
  const { username, itsMe, anonymous } = req.body;

  if (username) {
    let player = await User.findOne({ username });

    if (player) {
      console.log(player);
      if (!itsMe) {
        return res.render("login", {
          _id: player._id,
          name: player.username,
          last_connexion: moment(player.last_connexion).format("DD/MM/YYYY"),
        });
      }
    } else {
      player = new User({ username, last_connexion: new Date() });
      await player.save();
    }

    const infosuser = {
      _id: player._id,
      name: player.username,
      last_connexion: moment(player.last_connexion).format("DD/MM/YYYY"),
    };
    req.session.player = infosuser;

    player.last_connexion = new Date();
    await player.save();
    return res.redirect(`/home/${player?._id}`);
  }

  return res.render("login", {
    message:
      "Veuillez changer de nom d'utilisateur car celui ci est déjà utilisé",
    error: true,
  });
});

router.post("/signin", async (req, res, next) => {
  try {
    const { username } = req.body;
    let player = null;

    if (!username) throw "username is required";

    player = await User.findOne({ username });

    let is_exist = true;

    if (!player) {
      is_exist = false;
      player = new User({ username });
    }

    player.last_connexion = new Date();
    await player.save();

    return res.json({ data: player, is_exist });
  } catch (error) {
    res.status(400).json({ message: error?.message || error });
  }
});


module.exports = router;

const express = require("express");
const router = express.Router();
const service = require("../services/movie.service");
const validateRequest = require("../middlewares/validate-request");
const Joi = require("joi");

const swipeValidation = (req, res, next) => {
  const schema = Joi.object({
    user: Joi.string().required(),
    movie: Joi.string().required(),
    choice: Joi.string().valid("like", "unlike").required(),
  });

  validateRequest(req, next, schema);
};

router.get("/like/:id", async (req, res, next) => {
  try {
    const limit = req.query?.limit;
    const response = await service.getLike(req.params.id, limit);

    return res.json(response);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error?.message || error });
  }
});

router.post("/swipe", swipeValidation, async (req, res, next) => {
  try {
    const io = req.app.get("io");

    const response = await service.swipe(
      req.body.user,
      req.body.movie,
      req.body.choice
    );

    service.getMatchedMovie(10).then((data) => {
      console.log("matches:list");
      io.sockets.emit(`matches:list`, data);
    });

    service.getLike(req.body.user).then((data) => {
      console.log(`movie:liked:${req.body.user}`);
      io.sockets.emit(`movie:liked:${req.body.user}`, data);
    });

    return res.json(response);
  } catch (error) {
    console.log("swipe-------------", error);
    return res.status(400).json({ message: error?.message || error });
  }
});

router.get("/get-matches/", async (req, res, next) => {
  try {
    const io = req.app.get("io");
    const response = await service.getMatchedMovie();
    return res.json(response);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error?.message || error });
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const response = await service.getMovies(req.params.id);
    return res.json(response);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error?.message || error });
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const service = require("../services/loaddatas.service");
const validateRequest = require("../middlewares/validate-request");
const Joi = require("joi");


router.get("/categories", async (req, res, next) => {
  try {
    const response = await service.loadCategory();
    return res.json(response);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error?.message || error });
  }
});

router.get("/movies", async (req, res, next) => {
    try {
      const response = await service.loadMovies();
      return res.json(response);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: error?.message || error });
    }
  });
  
module.exports = router;
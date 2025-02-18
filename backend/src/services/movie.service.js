const Movie = require("../models/Movie");
const Swipe = require("../models/Swipe");
const User = require("../models/User");

const getMovies = async (userId) => {
  try {
    const swipedMovies = await Swipe.find({ user: userId }).distinct("movie");

    const movies = await Movie.find({ _id: { $nin: swipedMovies } })
      .populate("categories")
      .limit(25);

    return movies;
  } catch (error) {
    throw error?.message;
  }
};

const swipe = async (userId, movieId, choice) => {
  try {
    const user = await User.findById(userId);
    const movie = await Movie.findById(movieId);

    if (user && movie) {
      const verif = await Swipe.findOne({ user: user._id, movie: movie._id });
      if (verif) throw "Unauthorized";

      const swipe = await Swipe.create({
        user: user._id,
        movie: movie._id,
        choice,
      });

      return swipe;
    }

    throw "Incorrect datas";
  } catch (error) {
    throw error?.message;
  }
};

const getLike = async (userId) => {
  try {
    const likedMovies = await Swipe.find({
      user: userId,
      choice: "like",
    }).populate("movie");

    return likedMovies;
  } catch (error) {
    throw error?.message;
  }
};

module.exports = { getMovies, swipe, getLike };

const Movie = require("../models/Movie");
const Swipe = require("../models/Swipe");
const User = require("../models/User");

const getMovies = async () => {
  try {
    const movies = await await Movie.find().populate('categories').limit(20);
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
      if (verif) throw "Unauthorize";

      const swipe = await Swipe.create({
        user: user._id,
        movie: movie._id,
        choice,
      });

      return swipe;
    }

    throw "Incorrect datas"
  } catch (error) {
    throw error?.message;
  }
};

module.exports = { getMovies, swipe };

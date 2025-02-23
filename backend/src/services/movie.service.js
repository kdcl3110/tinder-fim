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

const getLike = async (userId, limit = 20) => {
  try {
    const likedMovies = await Swipe.find({
      user: userId,
      choice: "like",
    })
      .populate("movie")
      .sort({ createdAt: -1 })
      .limit(limit);

    return likedMovies;
  } catch (error) {
    throw error?.message;
  }
};

const getMatchedMovie = async (limit = 10) => {
  try {
    const topMovies = await Swipe.aggregate([
      {
        $match: { choice: "like" }, // Ne prendre en compte que les "likes"
      },
      {
        $group: {
          _id: "$movie", // Grouper par film
          likes_count: { $sum: 1 }, // Compter le nombre de likes
          users: { $push: "$user" }, // Stocker les utilisateurs qui ont liké
        },
      },
      {
        $match: { likes_count: { $gte: 2 } }, // Ne garder que les films avec au moins 2 likes
      },
      {
        $sort: { likes_count: -1 }, // Trier par nombre de likes décroissant
      },
      {
        $limit: limit, // Limiter aux N films les plus likés
      },
      {
        $lookup: {
          from: "movies", // Rejoindre avec la collection Movie
          localField: "_id",
          foreignField: "_id",
          as: "movieData",
        },
      },
      {
        $unwind: "$movieData", // Transformer l'array en objet
      },
      {
        $lookup: {
          from: "users", // Associer avec la collection User
          localField: "users",
          foreignField: "_id",
          as: "userData",
        },
      },
      {
        $project: {
          _id: 0,
          movieId: "$_id",
          title: "$movieData.title",
          poster: "$movieData.poster",
          likes_count: 1,
          users: "$userData.username", // Récupérer uniquement les noms d'utilisateur
        },
      },
    ]);

    return topMovies;
  } catch (error) {
    console.log(error);

    throw error?.message;
  }
};

module.exports = { getMovies, swipe, getLike, getMatchedMovie };

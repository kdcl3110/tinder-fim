const Category = require("../models/Category");
const Movie = require("../models/Movie");
const api = require("../utils/api");

const loadCategory = async () => {
  try {
    const { data } = await api.get("genre/movie/list?language=fr");
    for (const gender of data?.genres) {
      const category = await Category.findOne({
        name: gender?.name,
      });
      if (!category) {
        await Category.create({ name: gender?.name, tmdb_id: gender?.id });
      }
    }

    return data?.genres;
  } catch (error) {
    throw error?.message;
  }
};

const loadMovies = async () => {
  try {
    // 1000 premiers films
    for (let i = 1; i <= 500; i++) {
      const { data } = await api.get(`movie/popular?language=fr-FR&page=${i}`);
      for (const result of data?.results) {
        const categories = await Category.find({
          tmdb_id: { $in: result.genre_ids },
        }).select({ _id: 1 });

        const movie = await Movie.findOne({
          title: result?.title,
        });

        if (!movie) {  
          const param = {
            poster: `https://image.tmdb.org/t/p/w300_and_h450_bestv2${result.poster_path}`,
            title: result?.title,
            vote_average: result?.vote_average,
            vote_count: result?.vote_count,
            popularity: result?.popularity,
            overview: result?.overview,
            categories: categories,
          };

          if(result?.release_date){
            param.release_date = new Date(result?.release_date)
          }

          await Movie.create(param);
        }
      }
    }

    return "success";
  } catch (error) {
    throw error?.message;
  }
};

module.exports = { loadCategory, loadMovies };

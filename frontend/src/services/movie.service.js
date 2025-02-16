import api from "./api";

const getMovies = async () => {
  try {
    const response = await api.get(`movies/`);
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    console.log("error-----------", message);
    throw message;
  }
};

const swipe = async () => {
  try {
    const response = await api.get(`movies/`);
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    console.log("error-----------", message);
    throw message;
  }
};


export default {
  getMovies,
  swipe
};

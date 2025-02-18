import api from "./api";

const getMovies = async (user) => {
  try {
    const response = await api.get(`movies/${user}`);
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

const swipe = async (data) => {
  try {
    const response = await api.post(`movies/swipe`, data);
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

const getLike = async (userId) => {
  try {
    const response = await api.get(`movies/like/${userId}`);
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
  swipe,
  getLike
};

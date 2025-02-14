const { default: axios } = require("axios");

// Créer une instance Axios avec baseURL et headers
axios.defaults.baseURL = process.env.TMDB_BASE_URL;
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["Authorization"] = `Bearer ${process.env.TMDB_TOKEN}`;

module.exports = axios;
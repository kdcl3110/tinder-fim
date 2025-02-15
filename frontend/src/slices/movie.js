import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import initialState from "../initialStore/movie";
import movieService from "../services/movie.service";

export const getMovies = createAsyncThunk(
  "movie/getMovie",
  async (data, thunkAPI) => {
    try {
      const response = await movieService.getMovies(data);
      thunkAPI.dispatch(replaceMovie(response));

      return response;
    } catch (error) {
      throw error;
    }
  }
);

const gameSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    replaceMovie(state, action) {
      return {
        ...state,
        movies: action.payload,
      };
    },
  },
});
const { reducer, actions } = gameSlice;

export const { replaceMovie } = actions;
export default reducer;

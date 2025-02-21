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

export const swipe = createAsyncThunk(
  "movie/swipe",
  async (data, thunkAPI) => {
    try {
      const response = await movieService.swipe(data);
      // thunkAPI.dispatch(replaceMovie(response));
      return response;
    } catch (error) {
      throw error;
    }
  }
);

export const getLike = createAsyncThunk(
  "movie/getLike",
  async (data, thunkAPI) => {
    try {
      const response = await movieService.getLike(data);
      thunkAPI.dispatch(replaceLike(response));
      return response;
    } catch (error) {
      throw error;
    }
  }
);

export const getMatchedMovie = createAsyncThunk(
  "movie/getMatchedMovie",
  async (data, thunkAPI) => {
    try {
      const response = await movieService.getMatchedMovie(data);
      thunkAPI.dispatch(replaceMatches(response));
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
    replaceLike(state, action) {
      return {
        ...state,
        likes: action.payload,
      };
    },
    replaceMatches(state, action) {
      return {
        ...state,
        matches: action.payload,
      };
    },
  },
});
const { reducer, actions } = gameSlice;

export const { replaceMovie, replaceLike, replaceMatches } = actions;
export default reducer;

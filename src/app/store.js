import { configureStore } from "@reduxjs/toolkit";
import { tmdbApi } from "../services/TMDB";

//redux slice
import genreIdOrCategory from "../features/currentGenreOrCategory";
import userReducer from "../features/auth";

export default configureStore({
  reducer: {
    [tmdbApi.reducerPath]: tmdbApi.reducer,
    currentGenreOrCategory: genreIdOrCategory,
    user: userReducer,
  },
});

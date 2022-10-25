import { configureStore } from "@reduxjs/toolkit";
import { tmdbApi } from "../services/TMDB";

//redux slice
import genreIdOrCategory from "../features/currentGenreOrCategory";

export default configureStore({
  reducer: {
    [tmdbApi.reducerPath]: tmdbApi.reducer,
    currentGenreOrCategory: genreIdOrCategory,
  },
});

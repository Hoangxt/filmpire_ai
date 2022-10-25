import React, { useState, useEffect } from "react";
import {
  Box,
  CircularProgress,
  useMediaQuery,
  Typography,
} from "@mui/material";
// redux
import { useDispatch, useSelector } from "react-redux";
import { selectGenreOrCategory } from "../../features/currentGenreOrCategory";

import { useGetMoviesQuery } from "../../services/TMDB";
import MovieList from "../MovieList/MovieList";

const Movies = () => {
  const [page, setPage] = useState(1);
  // redux
  const { genreIdOrCategoryName } = useSelector(
    (state) => state.currentGenreOrCategory
  );

  const { data, error, isFetching } = useGetMoviesQuery({
    genreIdOrCategoryName,
    page,
  });

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress size="4rem" />
      </Box>
    );
  }

  if (!data.results.length) {
    return (
      <Box display="flex" alignItems="center" mt="20px">
        <Typography variant="h4">No movies found</Typography>
      </Box>
    );
  }

  if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      <MovieList movies={data} />
    </div>
  );
};

export default Movies;

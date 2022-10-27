import React, { useState } from "react";
// mui
import { Box, Grid, Typography, Button, CircularProgress } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";

// use useParams to get the actor's id
// make a new call using redux toolkit query to get the actor's details
// use newly created useGetActorHook to get the actor's info to the component
// [filmpire.netlify.app]
import {
  useGetActorsDetailsQuery,
  useGetMoviesByActorIdQuery,
} from "../../services/TMDB";
// css
import useStyles from "./styles";
import { MovieList, Pagination } from "..";

const Actors = () => {
  const classes = useStyles();

  const { id } = useParams(); // get the actor's id

  const navigate = useNavigate(); // useNavigate to go back to the previous page

  const { data, isFetching, error } = useGetActorsDetailsQuery(id); // get the actor's data

  const [page, setPage] = useState(1); // set the page to 1

  const { data: movies } = useGetMoviesByActorIdQuery({ id, page });
  // get movies by actor's id

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress size="8rem" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate(-1)}
          color="primary"
        >
          Go Back
        </Button>
      </Box>
    );
  }

  return (
    <>
      <Grid container spacing={3}>
        {/* img left */}
        <Grid item lg={5} xl={4}>
          <img
            className={classes.image}
            src={`https://image.tmdb.org/t/p/w780/${data?.profile_path}`}
            alt={data.name}
          />
        </Grid>
        {/* actor's details right */}
        <Grid
          item
          lg={7}
          xl={8}
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Typography variant="h2" gutterBottom>
            {data?.name}
          </Typography>
          <Typography variant="h5" gutterBottom>
            Born: {new Date(data?.birthday).toDateString()}
          </Typography>
          <Typography variant="body1" align="justify" paragraph>
            {data?.biography || "Sorry, no biography yet..."}
          </Typography>
          <Box className={classes.btns}>
            <Button
              variant="contained"
              color="primary"
              target="_blank"
              href={`https://www.imdb.com/name/${data?.imdb_id}`}
            >
              IMDB
            </Button>
            <Button
              startIcon={<ArrowBack />}
              onClick={() => navigate(-1)}
              color="primary"
            >
              Back
            </Button>
          </Box>
        </Grid>
        {/* movie by actor's id */}
        <Box margin="2rem 0">
          <Typography variant="h2" gutterBottom align="center">
            Movies
          </Typography>
          {movies && <MovieList movies={movies} numberOfMovies={12} />}
          <Pagination
            currentPage={page}
            setPage={setPage}
            totalPages={movies?.total_pages}
          />
        </Box>
      </Grid>
    </>
  );
};

export default Actors;

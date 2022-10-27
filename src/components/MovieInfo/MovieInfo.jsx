import React, { useState } from "react";
// mui
import {
  Box,
  Button,
  Typography,
  Grid,
  CircularProgress,
  useMediaQuery,
  Rating,
  ButtonGroup,
  Modal,
} from "@mui/material";
import {
  Movie as MovieIcon,
  Language,
  PlusOne,
  Favorite,
  Remove,
  ArrowBack,
  FavoriteBorderOutlined,
  Theaters,
} from "@mui/icons-material";
import { MovieList } from "..";
// router  [useParams to get the id of the movie]
import { Link, useParams } from "react-router-dom";
// redux
import { useSelector, useDispatch } from "react-redux";
import { selectGenreOrCategory } from "../../features/currentGenreOrCategory";

// axios
import axios from "axios";
// get id from services , recommended movies
import {
  useGetMovieQuery,
  useGetRecommendationsQuery,
} from "../../services/TMDB";

// styles css
import useStyles from "./styles";
// icons
import genreIcons from "../../assets/genres";

const MovieInfo = () => {
  const classes = useStyles();
  const { id } = useParams(); // get the movie id
  const { data, isFetching, error } = useGetMovieQuery(id); // get the movie data

  const dispatch = useDispatch(); // dispatch the action
  // recommended movies
  const { data: recommendedMovies, isFetching: isFetchingRecommendedMovies } =
    useGetRecommendationsQuery({ list: "recommendations", movie_id: id });
  // state
  const [openModal, setOpenModal] = useState(false); // for trailer
  const isMovieFavortied = false;
  const isMovieWatchlisted = false;

  const addToFavorites = () => {};

  const addToWatchlist = () => {};

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress size="8rem" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Link to="/">Some has gone wrong - Go back</Link>
      </Box>
    );
  }
  // to see data properties (exp data.title)
  // console.log(data);
  return (
    <Grid container className={classes.containerSpaceAround}>
      {/* poster image [right side] */}
      <Grid item sm={12} lg={4}>
        <img
          src={`https://image.tmdb.org/t/p/w500${data?.poster_path}`}
          alt={data?.title}
          className={classes.poster}
        />
      </Grid>
      {/* movie info  [left side] */}
      <Grid item container direction="column" lg={7}>
        <Typography variant="h3" align="center" gutterBottom>
          {data?.title} ({data?.release_date?.slice(0, 4)})
        </Typography>
        <Typography variant="h5" align="center" gutterBottom>
          {data?.tagline}
        </Typography>

        <Grid item className={classes.containerSpaceAround}>
          <Box display="flex" align="center">
            <Rating readOnly value={data.vote_average / 2} />
            <Typography
              variant="subtitle1"
              style={{ marginLeft: "10px" }}
              gutterBottom
            >
              {data?.vote_average} / 10
            </Typography>
          </Box>
          <Typography variant="h6" align="center" gutterBottom>
            {data?.runtime} min / {data?.spoken_languages[0].english_name}
          </Typography>
        </Grid>
        {/* genres */}
        <Grid item className={classes.genresContainer}>
          {data?.genres?.map((genre) => (
            <Link
              className={classes.links}
              key={genre.name}
              to="/"
              onClick={() => dispatch(selectGenreOrCategory(genre.id))} // dispatch the action
            >
              <img
                src={genreIcons[genre.name.toLowerCase()]}
                className={classes.genreImage}
                height={30}
                alt={genre.name}
              />
              <Typography color="textPrimary" variant="subtitle1">
                {genre?.name}
              </Typography>
            </Link>
          ))}
        </Grid>
        {/* overview */}
        <Typography variant="h5" gutterBottom style={{ marginTop: "10px" }}>
          Overview
        </Typography>
        <Typography variant="body1" gutterBottom>
          {data?.overview}
        </Typography>
        {/* Top Cast */}
        <Typography variant="h5" gutterBottom>
          Top Cast
        </Typography>
        {/* Grid character */}
        <Grid item container spacing={2}>
          {data &&
            data.credits?.cast
              ?.map(
                (character, i) =>
                  character.profile_path && (
                    <Grid
                      key={i}
                      item
                      sx={4}
                      md={2}
                      component={Link}
                      to={`/actors/${character.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <img
                        className={classes.castImage}
                        src={`http://image.tmdb.org/t/p/w500${character.profile_path}`}
                        alt={character.name}
                      />
                      <Typography color="textPrimary">
                        {character?.name}
                      </Typography>
                      <Typography color="textSecondary">
                        {character?.character.split("/"[0])}
                      </Typography>
                    </Grid>
                  )
              )
              .slice(0, 6)}
        </Grid>
        {/*  */}
        <Grid item container style={{ marginTop: "2rem" }}>
          <div className={classes.buttonContainer}>
            <Grid item sx={12} sm={6} className={classes.buttonContainer}>
              <ButtonGroup size="small" variant="outlined">
                <Button
                  target="_blank"
                  rel="noopener noreferrer"
                  href={data?.homepage}
                  endIcon={<Language />}
                >
                  Website
                </Button>
                <Button
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`http://www.imdb.com/title/${data?.imdb_id}`}
                  endIcon={<MovieIcon />}
                >
                  IMDB
                </Button>
                <Button
                  onClick={() => setOpenModal(true)}
                  href="#"
                  endIcon={<Theaters />}
                >
                  Trailer
                </Button>
              </ButtonGroup>
            </Grid>
            {/*  */}
            <Grid item sx={12} sm={6} className={classes.buttonContainer}>
              <ButtonGroup size="small" variant="outlined">
                <Button
                  onClick={addToFavorites}
                  endIcon={
                    isMovieFavortied ? <FavoriteBorderOutlined /> : <Favorite />
                  }
                >
                  {isMovieFavortied ? "Unfavorite" : "Favorite"}
                </Button>
                <Button
                  onClick={addToWatchlist}
                  endIcon={isMovieWatchlisted ? <Remove /> : <PlusOne />}
                >
                  {/* {isMovieWatchlisted
                    ? "Remove from Watchlist"
                    : "Add to Watchlist"} */}
                  Watchlist
                </Button>
                <Button
                  endIcon={<ArrowBack />}
                  sx={{ borderColor: "primary.main" }}
                >
                  <Typography
                    style={{ textDecoration: "none" }}
                    component={Link}
                    to="/"
                    color="inherit"
                    variant="subtitle2"
                  >
                    Back
                  </Typography>
                </Button>
              </ButtonGroup>
            </Grid>
          </div>
        </Grid>
      </Grid>
      {/* Recommendation */}
      <Box marginTop="5rem" width="100%">
        <Typography variant="h3" align="center" gutterBottom>
          You might also like
        </Typography>
        {/* Loop through the recommended movie... */}
        {recommendedMovies ? (
          <MovieList movies={recommendedMovies} numberOfMovies={12} />
        ) : (
          <Box>Sorry, nothing was found. </Box>
        )}
      </Box>
      {/* Movie Trailer */}
      <Modal
        closeAfterTransition
        className={classes.modal}
        open={openModal}
        onClose={() => setOpenModal(false)}
      >
        {data?.videos?.results?.length > 0 && (
          <iframe
            autoPlay
            className={classes.video}
            frameBorder="0"
            title="Trailer"
            src={`https://www.youtube.com/embed/${data.videos.results[0].key}`}
            allow="autoPlay"
          />
        )}
      </Modal>
    </Grid>
  );
};

export default MovieInfo;

import React from "react";
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
  Theater,
  Language,
  PlusOne,
  Favorite,
  Remove,
  ArrowBack,
  FavoriteBorderOutlined,
} from "@mui/icons-material";
// router  [useParams to get the id of the movie]
import { Link, useParams } from "react-router-dom";
// redux
import { useSelector, useDispatch } from "react-redux";
import { selectGenreOrCategory } from "../../features/currentGenreOrCategory";

// axios
import axios from "axios";
// get id from services
import { useGetMovieQuery } from "../../services/TMDB";
// styles css
import useStyles from "./styles";
// icons
import genreIcons from "../../assets/genres";

const MovieInfo = () => {
  const classes = useStyles();
  const { id } = useParams(); // get the movie id
  const { data, isFetching, error } = useGetMovieQuery(id); // get the movie data

  const dispatch = useDispatch(); // dispatch the action

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
      </Grid>
    </Grid>
  );
};

export default MovieInfo;

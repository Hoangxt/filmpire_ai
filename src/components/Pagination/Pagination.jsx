import React from "react";
// mui
import { Button, Typography } from "@mui/material";
// css
import useStyles from "./styles";

const Pagination = ({ currentPage, setPage, totalPages }) => {
  const classes = useStyles();

  const handlePrev = () => {
    if (currentPage !== 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage !== totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  if (totalPages === 0) return null;

  return (
    <div className={classes.container}>
      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        type="button"
        onClick={handlePrev}
      >
        Pre
      </Button>
      <Typography variant="h4" className={classes.pageNumber}>
        {currentPage}
      </Typography>
      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        type="button"
        onClick={handleNext}
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;

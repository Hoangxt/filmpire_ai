import React, { useEffect } from "react";
// mui
import { Box, Button, Typography } from "@mui/material";
import { ExitToApp } from "@mui/icons-material";
// get access to profile name or id from redux state
// display in the profile component
// redux
import { useSelector } from "react-redux";
const Profile = () => {
  // get user from redux state
  const { user } = useSelector((state) => state.user);

  const favoriteMovies = [];
  // logout function
  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };
  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h4" gutterBottom>
          My Profile | my sessionid is: {localStorage.getItem("session_id")}
        </Typography>
        <Button color="inherit" onClick={logout}>
          Logout &nbsp;
          <ExitToApp />
        </Button>
      </Box>
      {/* if no have favoriteMovies */}
      {!favoriteMovies?.length ? (
        <Typography variant="h5">
          Add favorite movies or watch some movies to see them here{" "}
        </Typography>
      ) : (
        <Box>
          <Typography variant="h5">Favorite Movies</Typography>
        </Box>
      )}
    </Box>
  );
};

export default Profile;

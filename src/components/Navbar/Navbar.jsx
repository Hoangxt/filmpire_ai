import React, { useState, useEffect, useContext } from "react";
import {
  AppBar,
  IconButton,
  Toolbar,
  Drawer,
  Button,
  Avatar,
  useMediaQuery,
} from "@mui/material";
import {
  Menu,
  AccountCircle,
  Brightness4,
  Brightness7,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
// color theme
import { ColorModeContext } from "../../utils/ToggleColorMode";
import { Link } from "react-router-dom";
// redux
import { useDispatch, useSelector } from "react-redux";
// search
import { Sidebar, Search } from "..";
// authenticate
import { fetchToken, moviesApi, createSessionId } from "../../utils";
// slice
import { setUser } from "../../features/auth";
// styles css
import useStyles from "./styles";

const Navbar = () => {
  const dispatch = useDispatch();
  // hooks
  const [mobileOpen, setMobileOpen] = useState(false);

  const classes = useStyles();
  const isMobile = useMediaQuery("(max-width: 600px)");
  const theme = useTheme();
  // authenticate
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const token = localStorage.getItem("request_token");
  const sessionIidFromLocalStorage = localStorage.getItem("session_id");
  // color theme
  const colorMode = useContext(ColorModeContext);

  useEffect(() => {
    const logInUser = async () => {
      if (token) {
        if (sessionIidFromLocalStorage) {
          // if session id is in local storage
          const { data: userData } = await moviesApi.get(
            `/account?session_id=${sessionIidFromLocalStorage}`
          );
          dispatch(setUser(userData));
        } else {
          // if session id is not in local storage
          const sessionId = await createSessionId(); // create session id
          const { data: userData } = await moviesApi.get(
            // get user data
            `/account?session_id=${sessionId}`
          );
          dispatch(setUser(userData)); // set user data in redux
        }
      }
    };

    logInUser();
  }, [token]); // if token is changed

  // console.log("session_id from navbar", sessionIidFromLocalStorage);

  return (
    <>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          {isMobile && (
            <IconButton
              edge="start"
              color="inherit"
              style={{ outline: "none" }}
              className={classes.menuButton}
              onClick={() => setMobileOpen(true)}
            >
              <Menu />
            </IconButton>
          )}
          <IconButton
            color="inherit"
            sx={{ ml: 1 }}
            onClick={colorMode.toggleColorMode}
          >
            {theme.palette.mode === "dark" ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          {!isMobile && <Search />}
          {/* Authenticate */}
          <div>
            {!isAuthenticated ? (
              <Button color="inherit" onClick={fetchToken}>
                Login &nbsp; <AccountCircle />
              </Button>
            ) : (
              <Button
                color="inherit"
                component={Link}
                to={`/profile/${user.id}`}
                className={classes.linkButton}
              >
                {!isMobile && <>My Movies &nbsp;</>}
                <Avatar
                  style={{ width: 30, height: 30 }}
                  alt="Profile"
                  src={`https://www.themoviedb.org/t/p/w64_and_h64_face${user?.avatar?.tmdb?.avatar?.avatar_path}`}
                />
              </Button>
            )}
          </div>
          {isMobile && <Search />}
        </Toolbar>
      </AppBar>
      {/* sidebar  */}
      <div>
        <nav className={classes.drawer}>
          {isMobile ? (
            <Drawer
              variant="temporary"
              anchor="right"
              open={mobileOpen}
              classes={{ paper: classes.drawerPaper }}
              ModalProps={{ keepMounted: true }}
              onClose={() => setMobileOpen(false)}
            >
              <Sidebar setMobileOpen={setMobileOpen} />
            </Drawer>
          ) : (
            <Drawer
              classes={{ paper: classes.drawerPaper }}
              variant="permanent"
              open
            >
              <Sidebar setMobileOpen={setMobileOpen} />
            </Drawer>
          )}
        </nav>
      </div>
    </>
  );
};

export default Navbar;

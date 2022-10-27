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
          <IconButton color="inherit" sx={{ ml: 1 }}>
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
                  alt="profile"
                  src="data:image/png;base64,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"
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

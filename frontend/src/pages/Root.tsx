import {
  AppBar,
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { Outlet, NavLink } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import CallIcon from "@mui/icons-material/Call";
import { NavbarComponent } from "../components/Navbar";
// import CometsLogo from '../assets/comets_logo.svg';

export function RootLayout() {
  return (
    <>
      <NavbarComponent/>
      <Drawer
        variant="permanent"
        anchor="left"
        PaperProps={{ sx: { backgroundColor: "#e9ecef" } }}
      >
        <Toolbar />
        <Box sx={{ width: '18vw' }}>
          <List>
            <ListItem disablePadding>
              <ListItemButton component={NavLink} to="/">
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Home" />
                <ChevronRightIcon />
              </ListItemButton>
            </ListItem>
          </List>

          <Divider />
          <List>
            <ListItem disablePadding>
              <ListItemButton component={NavLink} to="#">
                <ListItemIcon>
                  <OndemandVideoIcon />
                </ListItemIcon>
                <ListItemText primary="Demo" />
                <ChevronRightIcon />
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />

          <List>
            <ListItem disablePadding>
              <ListItemButton component={NavLink} to="experimentSetup">
                <ListItemIcon>
                  <CallIcon />
                </ListItemIcon>
                <ListItemText primary="Experiment Setup" />
                <ChevronRightIcon />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <Box
        component="main"
        sx={{
          position: "fixed",
          top: "64px",
          left: "18vw",
          width: "calc(100vw  - 18vw)",
          height: "calc(100vh - 64px)",
          overflow: "auto",
        }}
      >
        <Outlet />
      </Box>
    </>
  );
}

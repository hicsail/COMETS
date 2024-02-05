import { AppBar, Link, Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
import { Outlet, NavLink } from 'react-router-dom';
import { Footer } from '../components/Footer';
import HomeIcon from '@mui/icons-material/Home';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import CallIcon from '@mui/icons-material/Call';
import React from 'react';
// import CometsLogo from '../assets/comets_logo.svg';

export function RootLayout() {
    
    return (
        <>
    <AppBar component="nav" color="default" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <NavLink to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Typography variant="h6" component="div">
            {/* <Link>
              <img src={CometsLogo} alt="FHS logo" style={{ width: '55px', marginRight: '10px', shapeRendering: 'geometricPrecision' }} />
            </Link> */}
              COMETS: Computation of Microbial Ecosystem in Time and Space
            </Typography>
          </NavLink>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" anchor="left" PaperProps={{ sx: { backgroundColor: '#e9ecef' } }}>
        <Toolbar />
        <Box sx={{ width: 300 }}>
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
          position: 'fixed',
          top: 65,
          left: 300,
          padding: '3rem',
          width: 'calc(100vw - 6rem - 300px)',
          height: 'calc(100% - 180px)',
          overflow: 'auto'
        }}
      >
        <Outlet />
      </Box>
        </>
    )
}
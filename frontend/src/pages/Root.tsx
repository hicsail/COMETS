import { AppBar, Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
import { Outlet, NavLink } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const navbarTheme = createTheme({
  typography: {
    fontFamily: 'Inter', 
    fontSize: 20,
  },
});

const sidebarTheme = createTheme ({
  typography: {
    fontFamily: 'Inter',
    fontSize: 13,
  }
})



export function RootLayout() {

    return (
      <Box sx = {{ display: 'flex'}}>
      <Box sx = {{ display: 'flex'}}>
        <ThemeProvider theme={navbarTheme}>
        <AppBar component="nav" color="default" position="fixed" elevation={0} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: "#FEFEFE"}} >
          <Toolbar>
          <NavLink to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Box
              component="img"
              src="../../public/comets-logo.jpeg" // Replace with your image path
              alt="Comets Logo"
              sx={{
                width: 63, // width in pixels
                height: 60, // height in pixels
                position: 'left', 
                top: 16, // top position in pixels
                left: 20, // left position in pixels
              }}
            />
            </NavLink>
            <NavLink to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Typography sx={{ fontWeight: 700, paddingLeft: 2}}>
                COMETS Smart Interface
              </Typography>
            </NavLink>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
      </Box>

      <Box sx = {{ display: 'flex' }}>
          <ThemeProvider theme={sidebarTheme}>
          <Drawer
          variant="permanent"
          sx={{
            width: 200,
            '& .MuiDrawer-paper': {
              width: 200,
              boxSizing: 'border-box',
              borderColor: 'purple', // Adjust the border color to match your theme
              backgroundColor: '#F4F4F9', // Adjust the background color to match your theme
            },
          }}
        >
          <Box sx = {{ paddingTop: 10}}>
            <List>
              {['Dashboard', 'About Comets', 'Documentation', 'Contact Us'].map((text, index) => (
                <ListItemButton 
                key={text}
                sx={{
                  '&:hover': {
                    backgroundColor: '#6B68FF1F',
                  },
                }}>
                  <ListItemIcon>
                    {/* You can switch these out for the specific icons you need */}
                    {index === 0 && <HomeIcon />}
                    {index === 1 && <HomeIcon />}
                    {index === 2 && <HomeIcon />}
                    {index === 3 && <HomeIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              ))}
            </List>
          </Box>
        </Drawer>
        </ThemeProvider>
      </Box>

      <Box>
        <Typography>Build and run microbial simulations in space and time</Typography>
      </Box>

      </Box>
       
    )
}
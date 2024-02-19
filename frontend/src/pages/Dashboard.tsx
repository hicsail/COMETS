// DashboardPage.js
import { NavbarComponent } from "../components/Navbar";
import {
  Box,
  Button,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

const sidebarTheme = createTheme({
  typography: {
    fontFamily: "Inter",
    fontSize: 13,
  },
});

export function DashboardPage() {
  return (
    <div>
      <NavbarComponent />
      <Box sx={{ display: "flex" }}>
        <ThemeProvider theme={sidebarTheme}>
          <Drawer
            variant="permanent"
            sx={{
              width: "13vw",
              "& .MuiDrawer-paper": {
                width: "13vw",
                boxSizing: "border-box",
                backgroundColor: "#FEFEFE", // Adjust the background color to match your theme
              },
            }}
          >
            <Box sx={{ paddingTop: "80px" }}>
              <List>
                {[
                  "Dashboard",
                  "About Comets",
                  "Documentation",
                  "Contact Us",
                ].map((text, index) => (
                  <ListItemButton
                    key={text}
                    sx={{
                      "&:hover": {
                        backgroundColor: "#6B68FF1F",
                      },
                    }}
                  >
                    <ListItemIcon>
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

      <Box
        sx={{
          pt: "64px",
          height: "calc(100vh - 64px)",
          width: "87vw",
          overflow: "hidden",
          paddingTop: "64px",
          paddingLeft: "13vw",
        }}
      >
        <Box
          component="img"
          src="../../dashboard.svg"
          alt="Dashboard Image"
          sx={{
            width: "87vw",
            height: "30vh",
            objectFit: "cover",
            objectPosition: "center",
          }}
        />

        <Box
          sx={{
            width: "83vw",
            paddingLeft: "5%",
            paddingRight: "5%",
            paddingTop: "2.5%",
          }}
        >
          <Typography
            sx={{
              textAlign: "left",
              paddingBottom: "2.5%",
              fontFamily: "Inter",
              fontSize: "16px",
              color: "black",
              fontWeight: "400",
              paddingRight: "5%",
            }}
          >
            Build and run microbial growth simulations in space and time
          </Typography>

          <Typography
            sx={{
              textAlign: "left",
              fontFamily: "Open Sans",
              fontSize: "46px",
              color: "black",
              fontWeight: "700",
              lineHeight: "110%",
              paddingBottom: "2.5%",
              paddingRight: "5%",
            }}
          >
            COMETS SMART INTERFACE
          </Typography>

          <Typography
            sx={{
              textAlign: "left",
              fontFamily: "Inter",
              fontSize: "14px",
              color: "black",
              fontWeight: "500",
              paddingBotton: "1.5%",
              paddingRight: "5%",
              opacity: "45%",
            }}
          >
            COMETS is a simulation tool used to simulate the growth of microbial
            based on the culture used as well as the genome of the microbial.
            Simulating the complex growth patterns takes a lot of computational
            power and time to complete but COMETS Layout builder allows you to
            make lightweight simulations within the web application.
          </Typography>

          <Typography
            sx={{
              textAlign: "left",
              fontFamily: "Inter",
              fontSize: "14px",
              color: "black",
              fontWeight: "500",
              paddingTop: "3.5%",
              paddingRight: "5%",
              opacity: "45%",
            }}
          >
            Just chose your Model, Setup, and Metabolites. Set Your parameters.
            Then, you are done!
          </Typography>

          <Typography
            sx={{
              textAlign: "left",
              fontFamily: "Inter",
              fontSize: "14px",
              color: "black",
              fontWeight: "500",
              paddingTop: "3.5%",
              paddingRight: "5%",
              opacity: "45%",
            }}
          >
            To start your layout, click continue.
          </Typography>

          <Box
            display="flex"
            justifyContent="flex-end"
            sx={{ paddingTop: "5%", paddingRight: "5%" }}
          >
            <Button variant="contained">CONTINUE TO LAYOUT BUILDER</Button>
          </Box>
        </Box>
      </Box>
    </div>
  );
}

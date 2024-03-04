import { Box, Button, Grid, Typography } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { NavLink } from "react-router-dom";

export function DashboardPage() {
  return (
    <Box>
      <Box
        overflow={"clip"}
        component="img"
        src="../../dashboard.svg"
        alt="Dashboard Image"
        sx={{
          width: "100vw",
          height: "30vh",
          objectFit: "cover",
          objectPosition: "center",
        }}
      />

      <Grid
        container
        direction={"column"}
        spacing={2}
        overflow={"-moz-hidden-unscrollable"}
        sx={{
          width: "100%",
          paddingLeft: 5,
          paddingRight: 5,
          paddingTop: "2%",
          maxHeight: "40%",
          justifyContent: "space-between",
        }}
      >
        <Grid item>
          <Typography
            variant="h3"
            sx={{
              textAlign: "left",
              fontFamily: "Inter",
              color: "black",
              fontWeight: "400",
              paddingRight: "15%",
            }}
          >
            Build and run microbial growth simulations in space and time
          </Typography>
        </Grid>

        <Grid item>
          <Typography
            variant="h1"
            textOverflow={"initial"}
            sx={{
              textAlign: "left",
              fontFamily: "Open Sans",
              color: "black",
              fontWeight: "700",
              paddingRight: "15%",
            }}
          >
            WELCOME TO COMETS LAYOUT BUILDER
          </Typography>
        </Grid>

        <Grid item>
          <Typography
            variant="h4"
            sx={{
              textAlign: "left",
              fontFamily: "Inter",
              color: "black",
              fontWeight: "500",
              paddingRight: "15%",
              opacity: "45%",
            }}
          >
            COMETS is a simulation tool used to simulate the growth of microbial
            based on the culture used as well as the genome of the microbial.
            Simulating the complex growth patterns takes a lot of computational
            power and time to complete but COMETS Layout builder allows you to
            make lightweight simulations within the web application.
          </Typography>
        </Grid>

        <Grid item>
          <Typography
            variant="h4"
            sx={{
              textAlign: "left",
              fontFamily: "Inter",
              color: "black",
              fontWeight: "500",
              paddingRight: "15%",
              opacity: "45%",
            }}
          >
            Just chose your Model, Setup, and Metabolites. Set Your parameters.
            Then, you are done!
          </Typography>
        </Grid>

        <Grid item flexDirection={"column"}>
          <Typography
            variant="h4"
            sx={{
              textAlign: "left",
              fontFamily: "Inter",
              color: "black",
              fontWeight: "500",
              paddingRight: "5%",
              opacity: "45%",
            }}
          >
            To start your layout, click continue.
          </Typography>

          <NavLink to="/experimentSetup">
            <Button
              variant="contained"
              endIcon={<ChevronRightIcon />}
              sx={{
                height: "7.5vh",
                width: "25vw",
              }}
            >
              <Typography variant="h5">CONTINUE TO LAYOUT BUILDER</Typography>
            </Button>
          </NavLink>
        </Grid>
      </Grid>
    </Box>
  );
}

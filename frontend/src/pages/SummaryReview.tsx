import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  Drawer,
  Grid,
  TextField,
  Typography,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import FooterStepper from "../components/FooterStepper";
import { NavLink } from "react-router-dom";
import { SidebarCard } from "../components/SidebarObject";
import { MetabolicModel, Layout, Media, SummaryCard } from "../types/ExperimentTypes";

export const mediaOptions: Media[] = [
  {
    name: "Minimal Core Glucose",
    desc: "Example Desc for core glucose",
    mainMetabolites: "Glucose",
    min: 1,
    max: 3,
    params: {
      mediaConcentration: 0,
    },
  },
  {
    name: "Minimal Core Acetate",
    desc: "Example Desc for core acetate",
    mainMetabolites: "Acetate",
    min: 1,
    max: 3,
    params: {
      mediaConcentration: 0,
    },
  },
  {
    name: "M9 Minimal Glucose",
    desc: "Example Desc for m9 minimal glucose",
    mainMetabolites: "Glucose",
    min: 1,
    max: 3,
    params: {
      mediaConcentration: 0,
    },
  },
  {
    name: "M9 Minimal Acetate",
    desc: "Example Desc for m9 minimal acetate",
    mainMetabolites: "Acetate",
    min: 1,
    max: 3,
    params: {
      mediaConcentration: 0,
    },
  },
  {
    name: "LB Rich",
    desc: "Example Desc for LB Rich",
    mainMetabolites: "Acetate",
    min: 1,
    max: 3,
    params: {
      mediaConcentration: 0,
    },
  },
];

export const layoutOptions: Layout[] = [
  {
    name: "9 cm Petri Dish (Center Colony)",
    desc: "Example description for center colony",
    min: 1,
    max: 12,
    params: {
      mediaVolume: 0,
    },
  },
  {
    name: "9 cm Petri Dish (Random Lawn)",
    desc: "Example description for random lawn",
    min: 1,
    max: 50,
    params: {
      mediaVolume: 0,
    },
  },
  {
    name: "10 ml Test Tube",
    desc: "Example description for test tube",
    min: 1,
    max: 50,
    params: {
      mediaVolume: 0,
    },
  },
];

export const modelOptions: MetabolicModel[] = [
  {
    name: "Escherichia coli Core",
    desc: "Example description for E. Coli Core model",
    params: {
      demographicNoise: false,
      demographicNoiseAmplitude: 0,
      uptakeVMax: 0,
      uptakeKm: 0,
      deathRate: 0,
      biomassLinearDiffusivity: 0,
      biomassNonlinearDiffusivity: 0,
    },
  },
  {
    name: "Escherichia coli",
    desc: "Example description for E. Coli model",
    params: {
      demographicNoise: false,
      demographicNoiseAmplitude: 0,
      uptakeVMax: 0,
      uptakeKm: 0,
      deathRate: 0,
      biomassLinearDiffusivity: 0,
      biomassNonlinearDiffusivity: 0,
    },
  },
  {
    name: "Nitrosomonas eurpaea (ATCC19718)",
    desc: "Example description for S. Enterica model",
    params: {
      demographicNoise: false,
      demographicNoiseAmplitude: 0,
      uptakeVMax: 0,
      uptakeKm: 0,
      deathRate: 0,
      biomassLinearDiffusivity: 0,
      biomassNonlinearDiffusivity: 0,
    },
  },
  {
    name: "Nitrobacter winograskyi",
    desc: "Example description for S. Enterica model",
    params: {
      demographicNoise: false,
      demographicNoiseAmplitude: 0,
      uptakeVMax: 0,
      uptakeKm: 0,
      deathRate: 0,
      biomassLinearDiffusivity: 0,
      biomassNonlinearDiffusivity: 0,
    },
  },
];

const bodyTheme = createTheme({
  typography: {
    h1: {
      fontSize: 50,
      fontWeight: 700,
    },
    h2: {
      fontSize: 40,
    },
    h3: {
      fontSize: 18,
    },
  },
});

export function SummaryReviewPage() {
  const [activeStep, setActiveStep] = useState(1);
  const [sidebarItems, setSidebarItems] = useState<SummaryCard[]>([
    {
      label: modelOptions[0].name,
      desc: modelOptions[0].desc,
      info: modelOptions[0],
      type: "MetabolicModel",
    },
    {
      label: layoutOptions[0].name,
      desc: layoutOptions[0].desc,
      info: layoutOptions[0],
      type: "Layout",
    },
    {
      label: mediaOptions[0].name,
      desc: mediaOptions[0].desc,
      info: mediaOptions[0],
      type: "Media",
    },
  ]);

  return (
    <ThemeProvider theme={bodyTheme}>
      <Box
        component="main"
        sx={{
          position: "relative",
          height: "100vh",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Grid
              container
              spacing={2}
              direction="column"
              alignItems="left"
              style={{
                paddingLeft: "2vw",
                paddingBottom: "10%",
              }}
            >
              <Typography
                variant="h1"
                sx={{
                  color: "black",
                  textAlign: "left",
                  paddingBottom: "10%",
                  paddingTop: "5%",
                }}
              >
                3. Review
              </Typography>

              <Typography
                variant="h3"
                sx={{
                  textAlign: "left",
                  color: "grey",
                  paddingBottom: "10%",
                }}
              >
                Please review your selected simulation. Once you have confirmed
                the selection is correct, you can run your simulation by
                entering your email below.
              </Typography>

              <Typography
                variant="h3"
                sx={{
                  textAlign: "left",
                  color: "grey",
                  paddingBottom: "10%",
                }}
              >
                We will notify you of your simulations results via email.
              </Typography>

              <Card
                sx={{
                  width: "100%",
                  p: 2,
                  boxSizing: "border-box",
                  borderRadius: "16px",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    mb: 2,
                    textAlign: "left",
                  }}
                >
                  Continue with email
                </Typography>

                <TextField
                  fullWidth
                  label="Email address"
                  variant="outlined"
                  sx={{
                    mb: 2,
                  }}
                />

                <Typography
                  variant="body2"
                  sx={{
                    mb: 2,
                  }}
                >
                  By continuing, you agree to the confirmation of the selected
                  simulation to be processed.
                </Typography>

                <NavLink to="/experimentSubmitted">
                  <Button variant="contained" fullWidth>
                    Continue
                  </Button>
                </NavLink>
              </Card>

              <Box
                sx={{
                  paddingTop: "5%",
                }}
              >
                <Button variant="contained" fullWidth>
                  Download CometsPY
                </Button>
              </Box>
            </Grid>
          </Grid>

          <Grid item xs={6}>
            <Typography
              sx={{
                color: "black",
                fontSize: "26px",
              }}
            ></Typography>

            <Box sx={{ width: "100%"}} display={"flex"} flexDirection={"column"}>
              {sidebarItems.map((item, index) => (
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                  sx={{ paddingBottom: "0.5vw" }}
                  key={index}
                >
                  <SidebarCard item={item} key={index}/>
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>

        <Drawer
          variant="permanent"
          anchor="bottom"
          PaperProps={{
            sx: {
              display: "flex", // Enable flexbox
              justifyContent: "center", // Center items horizontally
              alignItems: "center", // Center items vertically
              background: "white",
              height: 100,
              width: "90vw",
              left: "15vw",
              zIndex: 99,
            },
          }}
        >
          <FooterStepper activeStep={activeStep} />
        </Drawer>
      </Box>
    </ThemeProvider>
  );
}

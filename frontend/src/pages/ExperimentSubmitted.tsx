import React, { useState } from 'react';
import { Box, Button, Card, Drawer, Grid, TextField, Typography, ThemeProvider, createTheme } from "@mui/material";
import FooterStepper from '../components/FooterStepper';

const bodyTheme = createTheme({
  typography: {
    h1: {
      fontSize: 45,
      fontWeight: 700
    },
    h2: {
      fontSize: 25,
      fontWeight: 600
    },
    h3: {
      fontSize: 18
    }
  }
});

export function ExperimentSubmittedPage() {
  const [activeStep, setActiveStep] = useState(2);

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
                paddingLeft: '2vw',
                paddingBottom: "10%"
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
                EXPERIMENT SUBMITTED!
              </Typography>

              <Typography 
                variant="h2"
                sx={{
                  textAlign: "left",
                  color: "black",
                  paddingBottom: "10%"
                }}
              >
                Thank you for using the COMETS Layout Builder!
              </Typography>

              <Typography 
                variant="h3"
                sx={{
                  textAlign: "left",
                  color: "grey",
                  paddingBottom: "10%"
                }}
              >
                Your layout is now running. You will be sent an email with a link to the results of your layout once it’s done running.
              </Typography>

              <Button 
                  variant="contained"
                  fullWidth
                >
                  Download CometsPY
              </Button>
            </Grid>
          </Grid>

          <Grid item xs={6}>
            <Typography 
              sx={{
                color: "black",
                fontSize: "26px"
              }}
            >
              Insert cards here
            </Typography>
          </Grid>
        </Grid>

        <Drawer
          variant="permanent"
          anchor="bottom"
          PaperProps={{
            sx: {
              display: 'flex',        // Enable flexbox
              justifyContent: 'center', // Center items horizontally
              alignItems: 'center',   // Center items vertically
              background: "white",
              height: 100,
              width: "90vw",
              left: '15vw',
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

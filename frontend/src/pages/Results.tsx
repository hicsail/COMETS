import React, { useState } from 'react';
import { Box, 
         Button,
         Card,
         Drawer, 
         Grid, 
         TextField, 
         Typography, 
         ThemeProvider, 
         createTheme } from "@mui/material";
import { useSearchParams, useParams } from 'react-router-dom';
import axios from 'axios';

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

export function ResultsPage() {
  const { id } = useParams()
  console.log(id)
  const res = axios.get(`http://localhost:3000/job/${id}`)
  console.log(res)
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
                SIMULATION RUN RESULTS
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            
          </Grid>
            </Grid>
      </Box>
    </ThemeProvider>
  );
}

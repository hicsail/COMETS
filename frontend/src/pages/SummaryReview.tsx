import React, { useState } from 'react';
import { Box, Button, Card, Grid, TextField, Typography } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material";
import FooterStepper from '../components/FooterStepper';



const bodyTheme = createTheme({
    typography: {
    h1: {
      fontSize: 50,
      fontWeight: 700
    },
    h2: {
        fontSize: 40,
    },
    h3: {
        fontSize: 18.

    }
}});


export function SummaryReviewPage() {
const [activeStep, setActiveStep] = useState(2);
  return (
    <div>
        <ThemeProvider theme={bodyTheme}>
        <Box
            component="main"
            sx={{
                position: "relative",
                // width: "82vw",
                height: "100vh",
                overflow: "auto",
                display: 'flex', 
            }}  
         >
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Grid container spacing={2} direction="column" alignItems="left" style={{ paddingLeft: '2vw', paddingBottom: "10%" }} >
                        <Typography variant="h1" sx={{ color: "black", textAlign: "left", paddingBottom: "10%", paddingTop: "5%"}}>3. Review</Typography>
        
                        <Typography variant="h3" sx={{textAlign: "left", color: "grey", paddingBottom: "10%"}}>
                            Please review your selected simulation.  
                            Once you have confirmed the selection is correct, you can run your simulation by entering your email below. 
                        </Typography>
                    
                        <Typography variant="h3" sx={{textAlign: "left", color: "grey",  paddingBottom: "10%"}}>
                            We will notify you of your simulations results via email.
                        </Typography>

                        <Card sx={{ width: '100%', p: 2, boxSizing: 'border-box', borderRadius: '16px' }}>
  <Typography variant="h6" sx={{ mb: 2, textAlign:"left"}}>
    Continue with email
  </Typography>
  
  <TextField 
    fullWidth 
    label="Email address" 
    variant="outlined" 
    sx={{ mb: 2 }}
  />
  
  <Typography variant="body2" sx={{ mb: 2 }}>
    By continuing, you agree to the confirmation of the selected simulation to be processed.
  </Typography>
  
  <Button 
    variant="contained" 
    fullWidth >
    Continue
  </Button>
</Card>
                    </Grid>

                    
                
                </Grid>

                <Grid item xs={6}>
                    <Typography sx={{ color: "black", fontSize: "26px"}}>Insert cards here</Typography>
                </Grid>
            </Grid>

            
        </Box>
        <footer>
        <FooterStepper activeStep={activeStep} />
        </footer>
        </ThemeProvider>
    </div>
   
  );
}

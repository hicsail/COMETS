import React from 'react';
import { Stepper, Step, StepLabel, Box } from '@mui/material';

// Define the steps
const steps = ['Prepare your experiment', 'Setup Global Parameters', 'Review', 'Layout Complete'];

function FooterStepper({ activeStep }) {
  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}

export default FooterStepper;
import {
  Drawer,
  Typography,
  Grid,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Box,
  FormGroup,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { MediaComponent } from "../components/MediaObject";
import { LayoutComponent } from "../components/LayoutObject";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Layout } from "../types/Layout";
import { Media } from "../types/Media";
import { MetabolicModel } from "../types/Model";
import { ModelComponent } from "../components/ModelObject";
import { SidebarCard, SidebarcardProps } from "../components/SidebarObject";

const mediaOptions: Media[] = [
  {
    name: "Core Glucose",
    desc: "Example Desc for core glucose",
    mainMetabolites: "Glucose",
    min: 1,
    max: 3,
  },
  {
    name: "Core Acetate",
    desc: "Example Desc for core acetate",
    mainMetabolites: "Acetate",
    min: 1,
    max: 3,
  },
  {
    name: "M9 Minimal Glucose",
    desc: "Example Desc for m9 minimal glucose",
    mainMetabolites: "Glucose",
    min: 1,
    max: 3,
  },
  {
    name: "M9 Minimal Acetate",
    desc: "Example Desc for m9 minimal acetate",
    mainMetabolites: "Acetate",
    min: 1,
    max: 3,
  },
  {
    name: "LB Rich",
    desc: "Example Desc for LB Rich",
    mainMetabolites: "Acetate",
    min: 1,
    max: 3,
  },
];

const layoutOptions: Layout[] = [
  {
    name: "9 cm Petri Dish (Center Colony)",
    desc: "Example description for center colony",
    min: 1,
    max: 12,
  },
  {
    name: "9 cm Petri Dish (Random Lawn)",
    desc: "Example description for random lawn",
    min: 1,
    max: 50,
  },
  {
    name: "10 ml Test Tube",
    desc: "Example description for test tube",
    min: 1,
    max: 50,
  },
  {
    name: "EcoFab",
    desc: "Example description for EcoFab",
    min: 1,
    max: 50,
  },
];

const modelOptions: MetabolicModel[] = [
  {
    name: "E. Coli Core",
    desc: "Example description for E. Coli Core model",
    params: {
      demographicNoise: false,
      demographicNoiseAmplitude: 1,
      uptakeVMax: 1,
      uptakeKm: 1,
      deathRate: 1,
      biomassLinearDiffusivity: 1,
      biomassNonlinearDiffusivity: 1,
    },
  },
  {
    name: "E. Coli",
    desc: "Example description for E. Coli model",
    params: {
      demographicNoise: false,
      demographicNoiseAmplitude: 1,
      uptakeVMax: 1,
      uptakeKm: 1,
      deathRate: 1,
      biomassLinearDiffusivity: 1,
      biomassNonlinearDiffusivity: 1,
    },
  },
  {
    name: "S. Enterica",
    desc: "Example description for S. Enterica model",
    params: {
      demographicNoise: false,
      demographicNoiseAmplitude: 1,
      uptakeVMax: 1,
      uptakeKm: 1,
      deathRate: 1,
      biomassLinearDiffusivity: 1,
      biomassNonlinearDiffusivity: 1,
    },
  },
];

export function ExperimentSetupPage() {
  const [layoutExpanded, setLayoutExpanded] = React.useState<string | false>(
    false,
  );
  const [mediaExpanded, setMediaExpanded] = React.useState<string | false>(
    false,
  );
  const [modelExpanded, setModelExpanded] = React.useState<string | false>(
    false,
  );
  const [globalParams, setGlobalParams] = useState<{
    [key: string]: string;
    simulatedTime: string;
    timeSteps: string;
    nutrientDiffusivity: string;
    logFrequency: string;
  }>({
    simulatedTime: "",
    timeSteps: "",
    nutrientDiffusivity: "",
    logFrequency: "",
  });
  const [sidebarItems, setSidebarItems] = useState<SidebarcardProps[]>([]);

  const [modelChoice, setModelChoice] = useState<MetabolicModel[]>([]);
  const [layoutChoice, setLayoutChoice] = useState<Layout>(layoutOptions[0]);
  const [mediaChoice, setMediaChoice] = useState<Media>(mediaOptions[0]);
  const [textfieldError, setTextfieldError] = useState(false);

  const handleTextChange = (field: string, value: string) => {
    if (/^\d*$/.test(value)) {
      setGlobalParams({ ...globalParams, [field]: value });
      setTextfieldError(false);
    } else {
      setTextfieldError(true);
    }
  };
  const handleAccordionChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      if (panel === "layoutPanel") {
        setLayoutExpanded(isExpanded ? panel : false);
      } else if (panel === "mediaPanel") {
        setMediaExpanded(isExpanded ? panel : false);
      } else if (panel === "modelPanel") {
        setModelExpanded(isExpanded ? panel : false);
      }
    };

  const handleSubmit = () => {
    console.log(layoutChoice);
  };

  return (
    <Box sx={{ paddingTop: 10, paddingLeft: 5 }}>
      <Box sx={{ width: "85vw", height: "10vh" }}>
        <Typography
          variant="h2"
          fontWeight={"bold"}
          sx={{ justifyContent: "left", textAlign: "left", color: "black" }}
        >
          1. PREPARE YOUR EXPERIMENT
        </Typography>
        <Typography
          variant="h5"
          sx={{
            justifyContent: "left",
            textAlign: "left",
            paddingLeft: 1,
            color: "black",
          }}
        >
          Choose the model, layout, and media that you would like to simulate
        </Typography>
      </Box>

      <Grid container spacing={2} sx={{ width: "80%" }}>
        <Grid item xs={6}>
          <Accordion
            expanded={layoutExpanded === "layoutPanel"}
            onChange={handleAccordionChange("layoutPanel")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="layoutPanelbh-content"
              id="layoutPanelbh-header"
              sx={{ backgroundColor: "#CCCCFF", height: "5vh" }}
            >
              <Typography variant="h4">Layout</Typography>
              <Divider variant="fullWidth" />
            </AccordionSummary>
            <AccordionDetails>
              <LayoutComponent
                layoutOptions={layoutOptions}
                value={layoutChoice}
              />
            </AccordionDetails>
          </Accordion>

          <Accordion
            expanded={mediaExpanded === "mediaPanel"}
            onChange={handleAccordionChange("mediaPanel")}
            sx={{ marginTop: 1 }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="mediaPanelbh-content"
              id="mediaPanelbh-header"
              sx={{ backgroundColor: "#CCCCFF", height: "5vh" }}
            >
              <Typography variant="h4">Media</Typography>
              <Divider variant="fullWidth" />
            </AccordionSummary>
            <AccordionDetails>
              <MediaComponent mediaOptions={mediaOptions} value={mediaChoice} />
            </AccordionDetails>
          </Accordion>

          <Accordion
            expanded={modelExpanded === "modelPanel"}
            onChange={handleAccordionChange("modelPanel")}
            sx={{ marginTop: 1 }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="modelPanelbh-content"
              id="modelPanelbh-header"
              sx={{ backgroundColor: "#CCCCFF", height: "5vh" }}
            >
              <Typography variant="h4">Model</Typography>
              <Divider variant="fullWidth" />
            </AccordionSummary>
            <AccordionDetails>
              <ModelComponent
                value={modelChoice}
                modelOptions={modelOptions}
                modelLimit={3}
              />
            </AccordionDetails>
          </Accordion>
        </Grid>
        <Grid item xs={6}>
          <Box
            display={"flex"}
            flexDirection={"row"}
            sx={{ paddingLeft: "2%", paddingRight: "2%", maxWidth: "100%" }}
          >
            <Box sx={{ width: "30%", alignSelf: "center" }}>
              <Typography textAlign={"left"} variant="h6" color="black">
                Simulated Time
              </Typography>
            </Box>
            <TextField
              label="Simulated Time"
              variant="filled"
              fullWidth
              value={String(globalParams.simulatedTime)}
              onChange={(event) =>
                handleTextChange("simulatedTime", event.target.value)
              }
              error={textfieldError}
              helperText={textfieldError ? "Please input numbers only" : ""}
              sx={{
                height: "5vh",
              }}
            />
          </Box>
          <Box
            display={"flex"}
            flexDirection={"row"}
            sx={{ paddingLeft: "2%", paddingRight: "2%", maxWidth: "100%" }}
          >
            <Box sx={{ width: "30%", alignSelf: "center" }}>
              <Typography textAlign={"left"} variant="h6" color="black">
                No. of steps
              </Typography>
            </Box>
            <TextField
              label="Number of steps"
              variant="filled"
              fullWidth
              value={String(globalParams.timeSteps)}
              onChange={(event) =>
                handleTextChange("timeSteps", event.target.value)
              }
              error={textfieldError}
              helperText={textfieldError ? "Please input numbers only" : ""}
              sx={{
                height: "5vh",
              }}
            />
          </Box>
          <Box
            display={"flex"}
            flexDirection={"row"}
            sx={{ paddingLeft: "2%", paddingRight: "2%", maxWidth: "100%" }}
          >
            <Box sx={{ width: "30%", alignSelf: "center" }}>
              <Typography textAlign={"left"} variant="h6" color="black">
                Nutrient Diffusivity
              </Typography>
            </Box>
            <TextField
              label="Nutrient Diffusivity"
              variant="filled"
              fullWidth
              value={String(globalParams.nutrientDiffusivity)}
              onChange={(event) =>
                handleTextChange("nutrientDiffusivity", event.target.value)
              }
              error={textfieldError}
              helperText={textfieldError ? "Please input numbers only" : ""}
              sx={{
                height: "5vh",
              }}
            />
          </Box>
          <Box
            display={"flex"}
            flexDirection={"row"}
            sx={{ paddingLeft: "2%", paddingRight: "2%", maxWidth: "100%" }}
          >
            <Box sx={{ width: "30%", alignSelf: "center" }}>
              <Typography textAlign={"left"} variant="h6" color="black">
                Log Frequency
              </Typography>
            </Box>
            <TextField
              label="Log Frequency"
              variant="filled"
              fullWidth
              value={String(globalParams.logFrequency)}
              onChange={(event) =>
                handleTextChange("logFrequency", event.target.value)
              }
              error={textfieldError}
              helperText={textfieldError ? "Please input numbers only" : ""}
              sx={{
                height: "5vh",
              }}
            />
          </Box>
        </Grid>
      </Grid>

      <Button onClick={handleSubmit}>Submit</Button>

      {/* Cart drawer on the right */}
      <Drawer
        variant="permanent"
        anchor="right"
        PaperProps={{
          sx: { backgroundColor: "#e9ecef", width: "15%", height: "100%" },
        }}
      >
        <Typography
          variant="h6"
          color={"black"}
          marginTop={10}
          fontFamily={"sans-serif"}
          sx={{ textDecoration: "underline" }}
        >
          Modal Selection
        </Typography>
        <Box sx={{ width: "100%" }}>
          <SidebarCard />
        </Box>
      </Drawer>
    </Box>
  );
}

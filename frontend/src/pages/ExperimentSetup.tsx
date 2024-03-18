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
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { MediaComponent } from "../components/MediaObject";
import { LayoutComponent } from "../components/LayoutObject";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import { ModelComponent } from "../components/ModelObject";
import { SidebarCard } from "../components/SidebarObject";
import {
  MetabolicModel,
  Layout,
  Media,
  SummaryCard,
  GlobalParameters,
  cometsType,
} from "../types/ExperimentTypes";

const mediaOptions: Media[] = [
  {
    name: "Core Glucose",
    desc: "Example Desc for core glucose",
    mainMetabolites: "Glucose",
    min: 1,
    max: 3,
    params: {
      mediaConcentration: 0,
    },
  },
  {
    name: "Core Acetate",
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

const layoutOptions: Layout[] = [
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
  {
    name: "EcoFab",
    desc: "Example description for EcoFab",
    min: 1,
    max: 50,
    params: {
      mediaVolume: 0,
    },
  },
];

const modelOptions: MetabolicModel[] = [
  {
    name: "E. Coli Core",
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
    name: "E. Coli",
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
    name: "S. Enterica",
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
  const [globalParams, setGlobalParams] = useState<GlobalParameters>({
    name: "Global Parameters",
    desc: "Desc of global parameters",
    params: {
      simulatedTime: 0,
      timeSteps: 0,
      nutrientDiffusivity: 0,
      logFrequency: 0,
    },
  });
  const [sidebarItems, setSidebarItems] = useState<SummaryCard[]>([]);
  const [modelChoice, setModelChoice] = useState<MetabolicModel>(
    modelOptions[0],
  );
  const [layoutChoice, setLayoutChoice] = useState<Layout>(layoutOptions[0]);
  const [mediaChoice, setMediaChoice] = useState<Media>(mediaOptions[0]);
  const [textfieldError, setTextfieldError] = useState(false);
  const [isLayoutPicked, setIsLayoutPicked] = useState(false);
  const [isMediaPicked, setIsMediaPicked] = useState(false);
  const [isModelPicked, setIsModelPicked] = useState(false);
  const [numOfModel, setNumOfModel] = useState(0);
  const maxModel = 3;

  const handleDelete = (index: number) => {
    // Create a shallow copy of the sidebarItems array
    const updatedSidebarItems = [...sidebarItems];
    switch (updatedSidebarItems[index].type) {
      case "MetabolicModel":
        setNumOfModel((prevCount) => prevCount - 1);
        if (numOfModel <= 0) {
          setNumOfModel(0);
          setIsModelPicked(false);
          console.log(isModelPicked)
        }
        break;
      case "Media":
        setIsMediaPicked(false);
        break;
      case "Layout":
        setIsLayoutPicked(false);
    }
    // Remove the item at the specified index
    updatedSidebarItems.splice(index, 1);
    // Update the state with the modified array
    setSidebarItems(updatedSidebarItems);
  };

  const handleTextChange = (field: string, value: string) => {
    if (/^\d*$/.test(value)) {
      const updatedParams = {
        name: "Global Parameters",
        desc: "Desc of global parameters",
        params: {
          ...globalParams["params"],
          [field]: parseInt(value),
        },
      };
      setGlobalParams(updatedParams);
      setTextfieldError(false);
    } else {
      setTextfieldError(true);
    }
  };
  const handleAccordionChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      console.log(event)
      if (panel === "layoutPanel") {
        setLayoutExpanded(isExpanded ? panel : false);
      } else if (panel === "mediaPanel") {
        setMediaExpanded(isExpanded ? panel : false);
      } else if (panel === "modelPanel") {
        setModelExpanded(isExpanded ? panel : false);
      }
    };

  const handleSubmit = (
    item: MetabolicModel | Media | Layout | GlobalParameters,
  ) => {
    if (item === null) {
      return;
    }
    // make a shallow copy to pass by value
    const i = { ...item };
    const sidebarItem: SummaryCard = {
      label: i.name,
      desc: i.desc,
      info: i,
      type: cometsType(item),
    };

    setSidebarItems([...sidebarItems, sidebarItem]);
    switch (cometsType(item)) {
      case "MetabolicModel":
        setNumOfModel((prevCount) => prevCount + 1);
        if (numOfModel > 0 && numOfModel >= maxModel) {
          setIsModelPicked(true);
        }
        break;
      case "Media":
        setIsMediaPicked(true);
        break;
      case "Layout":
        setIsLayoutPicked(true);
    }
  };

  return (
    <Box sx={{ paddingTop: 10, paddingLeft: '15vw' }}>
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

      <Grid container spacing={2} sx={{ width: 1000 }}>
        <Grid item xs={6}>
          <Accordion
            expanded={layoutExpanded === "layoutPanel"}
            onChange={handleAccordionChange("layoutPanel")}
            sx={{ marginTop: 1 }}
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
                onChange={setLayoutChoice}
              />
            </AccordionDetails>
            <Button
              sx={{ margin: 2, width: "90%" }}
              variant="outlined"
              onClick={() => handleSubmit(layoutChoice)}
              disabled={isLayoutPicked}
            >
              ADD LAYOUT
            </Button>
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
              <MediaComponent
                mediaOptions={mediaOptions}
                value={mediaChoice}
                onChange={setMediaChoice}
              />
            </AccordionDetails>
            <Button
              sx={{ margin: 2, width: "90%" }}
              variant="outlined"
              onClick={() => handleSubmit(mediaChoice)}
              disabled={isMediaPicked}
            >
              ADD MEDIA
            </Button>
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
                onChange={setModelChoice}
              />
            </AccordionDetails>
            <Button
              sx={{ margin: 2, width: "90%" }}
              variant="outlined"
              onClick={() => handleSubmit(modelChoice)}
              disabled={numOfModel >= maxModel}
            >
              ADD MODEL
            </Button>
          </Accordion>
        </Grid>
        <Grid item xs={6}>
          <Box
            display={"flex"}
            flexDirection={"row"}
            sx={{paddingLeft: 10}}
          >
            <Box sx={{ width: 400, alignSelf: "center" }}>
              <Typography textAlign={"left"} variant="h6" color="black">
                Simulated Time
              </Typography>
            </Box>
            <TextField
              label="Simulated Time"
              variant="filled"
              type="number"
              fullWidth
              value={globalParams.params.simulatedTime}
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
            sx={{paddingLeft: 10}}
          >
            <Box sx={{ width: 400, alignSelf: "center" }}>
              <Typography textAlign={"left"} variant="h6" color="black">
                No. of steps
              </Typography>
            </Box>
            <TextField
              label="Number of steps"
              variant="filled"
              type="number"
              fullWidth
              value={globalParams.params.timeSteps}
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
            sx={{paddingLeft: 10}}
          >
            <Box sx={{ width: 400, alignSelf: "center" }}>
              <Typography textAlign={"left"} variant="h6" color="black">
                Nutrient Diffusivity
              </Typography>
            </Box>
            <TextField
              label="Nutrient Diffusivity"
              variant="filled"
              type="number"
              fullWidth
              value={globalParams.params.nutrientDiffusivity}
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
            sx={{paddingLeft: 10}}
          >
            <Box sx={{ width: 400, alignSelf: "center" }}>
              <Typography textAlign={"left"} variant="h6" color="black">
                Log Frequency
              </Typography>
            </Box>
            <TextField
              label="Log Frequency"
              variant="filled"
              type="number"
              fullWidth
              value={globalParams.params.logFrequency}
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
          <Button
            sx={{ margin: 2, maxWidth: "80%", paddingLeft: "2%" }}
            variant="outlined"
            onClick={() => handleSubmit(globalParams)}
          >
            ADD GLOBAL PARAMETERS
          </Button>
        </Grid>
      </Grid>
      {/* Cart drawer on the right */}
      <Drawer
        variant="permanent"
        anchor="right"
        PaperProps={{
          sx: { backgroundColor: "#e9ecef", height: '100vh', width:300 },
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
          {sidebarItems.map((item, index) => (
            <Box
              display={"flex"}
              flexDirection={"row"}
              sx={{ paddingRight: "0.5vw" }}
            >
              <Button
                variant={"text"}
                startIcon={<DeleteIcon />}
                sx={{ width: "10%" }}
                onClick={() => handleDelete(index)}
              />
              <SidebarCard item={item} key={index} />
            </Box>
          ))}
        </Box>
      </Drawer>
    </Box>
  );
}

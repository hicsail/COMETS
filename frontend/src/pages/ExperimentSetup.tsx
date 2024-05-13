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
import FooterStepper from "../components/FooterStepper";
import Footer from "../components/Footer";
import { NavLink } from "react-router-dom";

const mediaOptions: Media[] = [
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
  }
];

const modelOptions: MetabolicModel[] = [
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
    // Create a copy of the sidebarItems array
    const updatedSidebarItems = [...sidebarItems];
    switch (updatedSidebarItems[index].type) {
      case "MetabolicModel":
        setNumOfModel((prevCount) => prevCount - 1);
        if (numOfModel <= 0) {
          setNumOfModel(0);
          setIsModelPicked(false);
        }
        console.log(numOfModel);
        break;
      case "Media":
        setIsMediaPicked(true);
        break;
      case "Layout":
        setIsLayoutPicked(true);
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
    <Box sx={{ paddingTop: 10, paddingLeft: 5 }}>
      <Box sx={{ width: "85vw", height: "10vh", marginBottom: 1 }}>
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
      <Grid
        container
        spacing={2}
        sx={{ minWidth: 900, width: 1500, maxWidth: "100%", paddingBottom: 30 }}
      >
        <Grid item xs={7}>
        <NavLink to='/SummaryReview'>
          <Button  variant='outlined'sx={{width:'100%'}}>Next</Button>
        </NavLink>
        </Grid>
        <Grid item xs={7}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="layoutPanelbh-content"
              id="layoutPanelbh-header"
              sx={{ backgroundColor: "#CCCCFF", height: "5vh" }}
            >
              <Typography variant="h4">Choose layout</Typography>
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
              <Typography variant="h4">Choose media</Typography>
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
              <Typography variant="h4">Choose organisms</Typography>
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
            sx={{paddingRight: "2%", maxWidth: "80%" }}
          >
            <Box sx={{ width: "30%", alignSelf: "center", marginRight: 3 }}>
              <Typography textAlign={"left"} variant="h6" color="black">
                Simulated Time (hours)
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
            sx={{paddingRight: "2%", maxWidth: "80%" }}
          >
            <Box sx={{ width: "30%", alignSelf: "center", marginRight: 3 }}>
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
            sx={{paddingRight: "2%", maxWidth: "80%" }}
          >
            <Box sx={{ width: "30%", alignSelf: "center", marginRight: 3 }}>
              <Typography textAlign={"left"} variant="h6" color="black">
                Save Frequency
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
          <Box
            display={"flex"}
            flexDirection={"row"}
            sx={{paddingRight: "2%", maxWidth: "80%" }}
          >
            <Box sx={{ width: "30%", alignSelf: "center", marginRight: 3 }}>
              <Typography textAlign={"left"} variant="h6" color="black">
                Nutrient Diffusivity (cm<sup>2</sup>/s)
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
          <Button
            sx={{ margin: 2, maxWidth: "80%"}}
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
          sx: {
            backgroundColor: "#e9ecef",
            width: 350,
            minWidth: "10%",
            height: "100%",
          },
        }}
      >
        <Typography
          variant="h6"
          color={"black"}
          marginTop={10}
          fontFamily={"sans-serif"}
          fontWeight={"bold"}
        >
          Experiment Selection
        </Typography>
        <Box sx={{ width: "100%" }} display={"flex"}>
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
              width: "64vw",
              left: '16vw',
              zIndex: 99,
            },
          }}
        >
          <FooterStepper activeStep={0} />
        </Drawer>
    </Box>
  );
}

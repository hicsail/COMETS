import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItemText,
  Typography,
} from "@mui/material";
import { FC } from "react";
import { SummaryCard } from "../types/ExperimentTypes";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
export interface SidebarcardProps {
  item: SummaryCard;
  key: number;
}

const textPairing: { [key: string]: string } = {
  mediaVolume: "Media Volume(ml)",
  mediaConcentration: "Media Concentration(mmol/cm3)",
  demographicNoise: "Demographic Noise",
  demographicNoiseAmplitude: "Demographic Noise Amplitude",
  uptakeVMax: "Uptake Vmax",
  uptakeKm: "Uptake Km",
  deathRate: "Death Rate",
  biomassLinearDiffusivity: "Biomass Linear Diffusivity",
  biomassNonlinearDiffusivity: "Biomass Non-Linear Diffusivity",
  simulatedTime: "Simulated Time",
  timeSteps: "Time Steps",
  nutrientDiffusivity: "Nutrient Diffusivity",
  logFrequency: "Log Frequency",
};

export const SidebarCard: FC<SidebarcardProps> = (props) => {
  return (
    <Box
      sx={{ width: "95%", marginLeft: 1, paddingBottom: "0.5vh" }}
      key={props.key}
    >
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography variant="h6">{props.item.label}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List>
            <ListItemText>
              {Object.keys(props.item.info.params).map((key) => {
                let ret;
                if (typeof props.item.info.params[key] === "boolean") {
                  ret = (
                    <Typography textAlign={"left"} textOverflow={"wrap"}>
                      {textPairing[key]}: {String(props.item.info.params[key])}
                    </Typography>
                  );
                } else {
                  ret = (
                    <Typography textAlign={"left"} textOverflow={"wrap"}>
                      {textPairing[key]}: {props.item.info.params[key]}
                    </Typography>
                  );
                }
                return ret;
              })}
            </ListItemText>
          </List>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

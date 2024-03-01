import {
  Box,
  Accordion,
  AccordionSummary,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { FC, useState, ChangeEvent } from "react";
import { SummaryCard } from "../types/SummaryCard";

export interface SidebarcardProps {
  item: SummaryCard
}


export const SidebarCard: FC<SidebarcardProps> = (props) => {
  return (
    <Box sx={{ width: "95%", marginLeft: 1 }}>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h6">{props.item.label}</Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

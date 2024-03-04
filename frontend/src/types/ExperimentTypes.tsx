export type MetabolicModel = {
  name: string;
  desc: string;
  params: {
    [key: string]: boolean | number;
    demographicNoise: boolean;
    demographicNoiseAmplitude: number;
    uptakeVMax: number;
    uptakeKm: number;
    deathRate: number;
    biomassLinearDiffusivity: number;
    biomassNonlinearDiffusivity: number;
  };
};

export type Media = {
  name: string;
  desc: string;
  min: number;
  max: number;
  mainMetabolites: string; //this is to check if its acetate or glucose or something else
  params: {
    [key: string]: number;
    mediaConcentration: number;
  };
};

export type Layout = {
  name: string;
  desc: string;
  min: number;
  max: number;
  params: {
    [key: string]: number;
    mediaVolume: number;
  };
};

export type SummaryCard = {
  label: string;
  desc: string;
  info: MetabolicModel | Layout | Media | GlobalParameters;
  type: string;
};

export type GlobalParameters = {
  name: string;
  desc: string;
  params: {
    [key: string]: number;
    simulatedTime: number;
    timeSteps: number;
    nutrientDiffusivity: number;
    logFrequency: number;
  };
};

export interface SummaryCardArray extends Array<SummaryCard> {
  push(item: SummaryCard): number;
  push(...item: SummaryCard[]): number;
}

export function cometsType(obj: MetabolicModel | Media | Layout | GlobalParameters): string {
  if (metabolicModels.includes(obj.name)) {
    return "MetabolicModel";
  } else if (media.includes(obj.name)) {
    return "Media";
  } else if (layout.includes(obj.name)) {
    return "Layout";
  } else {
    return typeof obj;
  }
}

// Private Helper Functions and consts

const metabolicModels = ["E. Coli Core", "E. Coli", "S. Enterica"];
const layout = [
  "9 cm Petri Dish (Center Colony)",
  "9 cm Petri Dish (Random Lawn)",
  "10 ml Test Tube",
  "EcoFab",
];
const media = [
  "Core Glucose",
  "Core Acetate",
  "M9 Minimal Glucose",
  "M9 Minimal Acetate",
  "LB Rich",
];

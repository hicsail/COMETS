export type MetabolicModel = {
  name: string;
  desc: string;
<<<<<<< HEAD
=======
  type: string;
>>>>>>> 0eb59404736a870485e6578bba860d0f20ccf5f2
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
<<<<<<< HEAD
=======
  type: string;
>>>>>>> 0eb59404736a870485e6578bba860d0f20ccf5f2
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
<<<<<<< HEAD
=======
  type: string;
>>>>>>> 0eb59404736a870485e6578bba860d0f20ccf5f2
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
<<<<<<< HEAD
=======
  type: string;
>>>>>>> 0eb59404736a870485e6578bba860d0f20ccf5f2
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

<<<<<<< HEAD
export function cometsType(obj: MetabolicModel | Media | Layout | GlobalParameters): string {
=======
export function cometsType(obj: any): string {

>>>>>>> 0eb59404736a870485e6578bba860d0f20ccf5f2
  if (metabolicModels.includes(obj.name)) {
    return "MetabolicModel";
  } else if (media.includes(obj.name)) {
    return "Media";
  } else if (layout.includes(obj.name)) {
    return "Layout";
  } else {
<<<<<<< HEAD
    return typeof obj;
=======
    return "Global Parameters";
>>>>>>> 0eb59404736a870485e6578bba860d0f20ccf5f2
  }
}

// Private Helper Functions and consts

<<<<<<< HEAD
const metabolicModels = ["E. Coli Core", "E. Coli", "S. Enterica"];
=======
const metabolicModels = [
  "Escherichia coli Core",
  "Escherichia coli",
  "Nitrosomonas europaea",
  "Nitrobacter winogradskyi",
  "E. Coli Core", 
  "E. Coli", 
  "S. Enterica"
];
>>>>>>> 0eb59404736a870485e6578bba860d0f20ccf5f2
const layout = [
  "9 cm Petri Dish (Center Colony)",
  "9 cm Petri Dish (Random Lawn)",
  "10 ml Test Tube",
  "EcoFab",
];
const media = [
<<<<<<< HEAD
  "Core Glucose",
  "Core Acetate",
=======
  "Minimal Core Glucose",
  "Minimal Core Acetate",
>>>>>>> 0eb59404736a870485e6578bba860d0f20ccf5f2
  "M9 Minimal Glucose",
  "M9 Minimal Acetate",
  "LB Rich",
];

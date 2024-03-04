export type Media = {
  name: string;
  desc: string;
  min: number;
  max: number;
  mainMetabolites: string; //this is to check if its acetate or glucose or something else
  mediaConcentration?: number;
};

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

export type ModelParams = {
  [key: string]: boolean | number | string;
  demographicNoise: boolean;
  demographicNoiseAmplitude: string;
  uptakeVMax: string;
  uptakeKm: string;
  deathRate: string;
  biomassLinearDiffusivity: string;
  biomassNonlinearDiffusivity: string;
};

export type MetabolicModel = {
    name: string;
    desc: string;
    uptakeVMax: number;
    uptakeKm: number;
    deathRate: number;
    demographicNoise: boolean;
    demographicNoiseAmplitude: number;
    biomassLinearDiffusivity: number;
    biomassNonlinearDiffusivity: number;
}
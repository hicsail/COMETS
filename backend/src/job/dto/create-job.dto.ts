export class CreateJobDto {
    readonly name: string;
    readonly defaultVmax: number;
    readonly defaultKm: number;
    readonly maxCycles: number;
    readonly timeStep: number;
    readonly spaceWidth: number;
    readonly maxSpaceBiomass: number;
    readonly minSpaceBiomass: number;
    readonly writeMediaLog: boolean;
    readonly writeFluxLog: boolean;
    readonly fluxLogRate: number;
    readonly email: string;
}
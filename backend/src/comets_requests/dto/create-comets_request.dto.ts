export class CreateCometsRequestDto {
    readonly global_params = {
        "simulatedTime": Number,
        "timeSteps": Number,
        "nutrientDiffusivity": Number,
        "logFrequency": Number
    };
    readonly layout = {
        "name": String,
        "volume": Number
    };
    readonly models = [{
        "name": String,
        "demographicNoise": Boolean,
        "demographicNoiseAmp": Number,
        "vMax": Number,
        "Km": Number,
        "deathRate": Number,
        "linearDiffusivity": Number,
        "nonLinearDiffusivity": Number
    }];
    readonly media = {
        "name": String,
        "concentration": Number
    };
    readonly email = String;
}
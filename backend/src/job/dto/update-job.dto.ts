export class UpdateJobDto {
    readonly id: string
    readonly fluxes: [{
        model_id: string
        fluxes: string[]
    }]
}
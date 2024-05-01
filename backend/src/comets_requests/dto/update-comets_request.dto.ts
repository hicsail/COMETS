import { PartialType } from '@nestjs/mapped-types';
import { CreateCometsRequestDto } from './create-comets_request.dto';
import { Job } from 'src/schemas/job.schema';

export class UpdateCometsRequestDto extends PartialType(CreateCometsRequestDto) {
    readonly completedJob: Job
    readonly jobSuccessful: Boolean;
}

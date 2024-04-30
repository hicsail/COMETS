import { PartialType } from '@nestjs/mapped-types';
import { CreateCometsRequestDto } from './create-comets_request.dto';

export class UpdateCometsRequestDto extends PartialType(CreateCometsRequestDto) {}

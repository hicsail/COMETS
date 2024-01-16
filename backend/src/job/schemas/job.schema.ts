import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type JobDocument = HydratedDocument<Job>;

@Schema()
export class Job {
  
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true, type: Number, min: [0, 'Value must be positive'] })
  defaultVmax: number;

  @Prop({ required: true, type: Number, min: [0, 'Value must be positive'] })
  defaultKm: number;

  @Prop({ required: true, type: Number, min: [1, 'Value must be at least 1'] })
  maxCycles: number;

  @Prop({ required: true, type: Number, min: [0, 'Value must be positive'] })
  timeStep: number;

  @Prop({ required: true, type: Number, min: [0, 'Value must be positive'] })
  spaceWidth: number;

  @Prop({ required: true, type: Number, min: [0, 'Value must be positive'] })
  maxSpaceBiomass: number;

  @Prop({ required: true, type: Number, min: [0, 'Value must be non-negative'] })
  minSpaceBiomass: number;

  @Prop({ required: true, type: Boolean })
  writeMediaLog: boolean;

  @Prop({ required: true, type: Boolean })
  writeFluxLog: boolean;

  @Prop({ required: true, type: Number, min: [0, 'Value must be non-negative'] })
  fluxLogRate: number;
}

export const JobSchema = SchemaFactory.createForClass(Job);
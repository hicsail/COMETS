import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type JobDocument = HydratedDocument<Job>;

@Schema()
export class Job {
  
  @Prop()
  name: string;

  @Prop()
  defaultVmax: number;

  @Prop()
  defaultKm: number;

  @Prop()
  maxCycles: number;

  @Prop()
  timeStep: number;

  @Prop()
  spaceWidth: number;

  @Prop()
  maxSpaceBiomass: number;

  @Prop()
  minSpaceBiomass: number;

  @Prop()
  writeMediaLog: boolean;

  @Prop()
  writeFluxLog: boolean;

  @Prop()
  fluxLogRate: number;

}

export const JobSchema = SchemaFactory.createForClass(Job);
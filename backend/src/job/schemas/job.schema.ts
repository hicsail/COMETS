import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type JobDocument = HydratedDocument<Job>;

@Schema()
export class Job {
  
  @Prop()
  name: string;

}

export const JobSchema = SchemaFactory.createForClass(Job);
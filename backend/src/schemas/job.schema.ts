import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Document, Types } from 'mongoose';
import { CometsRequest } from './requests.schema';
import { v4 as uuidv4 } from 'uuid';

export type JobDocument = HydratedDocument<Job>;

@Schema()
export class Job extends Document {
  
  @Prop({ type: String, required: true, default: () => uuidv4() })
  id: string

  @Prop({ type: Object})
  flux: Record<string, any>

  @Prop({ type: Object})
  metabolic_time_series: Record<string, any>

  @Prop({ type: Object})
  total_biomass: Record<string, any>

  @Prop({ type: CometsRequest})
  comets_request: CometsRequest

}

export const JobSchema = SchemaFactory.createForClass(Job);
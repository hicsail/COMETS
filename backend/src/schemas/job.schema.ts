import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Document, Types } from 'mongoose';
import { CometsRequest } from './requests.schema';

export type JobDocument = HydratedDocument<Job>;

@Schema()
export class Job extends Document {
  
  // @Prop({ type: Types.ObjectId, required: true})
  // requests_id: Types.ObjectId

  @Prop({ type: Object})
  flux: Record<string, any>

  @Prop({ type: Object})
  metabolic_time_series: Record<string, any>

  @Prop({ type: Object})
  total_biomass: Record<string, any>

  // Currently accepts anything in the API requests. Probably needs a validator?
  // Even with changing the schema and dto, the API requests still able to take Number 
  @Prop({ type: Types.ObjectId, ref: () => (CometsRequest) })
  comets_request: CometsRequest | Types.ObjectId

}

export const JobSchema = SchemaFactory.createForClass(Job);
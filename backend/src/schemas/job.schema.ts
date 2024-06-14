import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Document, Types } from 'mongoose';
import { CometsRequest } from './requests.schema';
import { v4 as uuidv4 } from 'uuid';

export type JobDocument = HydratedDocument<Job>;

@Schema()
export class Job extends Document {
  
  @Prop({ type: String, required: true, default: () => uuidv4() })
  id: string

  @Prop({ type: String})
  filepath: string

  @Prop({ type: [Object] })
  model_info: {
    name: string
    model_id: string
  }[]

  @Prop({ type: [Object] })
  metabolites: {
    name: string
    metabolite_id: string
  }

  @Prop({ type: [Object] })
  fluxes: {
    name: string
    flux_id: string
  }

}

export const JobSchema = SchemaFactory.createForClass(Job);
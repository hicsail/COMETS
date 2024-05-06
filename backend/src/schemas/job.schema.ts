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
  request_id: string

  @Prop({ type: Object})
  experiment_result: Object


}

export const JobSchema = SchemaFactory.createForClass(Job);


// const s = 
// {
//   "id": "123443211234",
//   "flux": {
//     "f" : 1
//   },
//   "metabolic_time_series": {
//     "mts": 2
//   },
//   "total_biomass": {
//     tb: 3
//   }
// }
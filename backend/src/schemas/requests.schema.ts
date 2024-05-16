import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Validate, Validator } from 'class-validator';
import { HydratedDocument, Document, Types } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { User } from './users.schema';
import { Job } from './job.schema';

export type CometsRequestDocument = HydratedDocument<CometsRequest>

interface ModelParams {
    name: string;
    demographicNoise: boolean;
    demographicNoiseAmp: number;
    vMax: number;
    Km: number;
    deathRate: number;
    linearDiffusivity: number;
    nonlinearDiffusivity: number;
}

interface MediaParams {
    name: string;
    concentration: number;
}

interface LayoutParams {
    name: string;
    volume: number;
}

interface GlobalParams {
    simulatedTime: number;
    timeSteps: number;
    nutrientDiffusivity: number;
    logFrequency: number;
}


@Schema()
export class CometsRequest extends Document {
    
    @Prop({ type: String, required: true, default: () => uuidv4() })
    id: string

    @Prop({ type: Object, required: true})
    global_params: GlobalParams

    @Prop({ type: Object, required: true})
    layout: LayoutParams

    @Prop({ type: Object, required: true})
    media: MediaParams
    
    @Prop({ type: [{type: Object}], required: true})
    models: ModelParams[]

    @Prop({ type: User, required: true})
    requester: User;

    @Prop({ type: Job, required: false})
    completedJob: Job;

    @Prop({ type: Boolean, required: true, default: false})
    requestSuccessful: boolean
}

export const CometsRequestSchema = SchemaFactory.createForClass(CometsRequest)
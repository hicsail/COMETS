import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Validate, Validator } from 'class-validator';
import { HydratedDocument, Document, Types } from 'mongoose';
import { User } from './users.schema';
import { Job } from './job.schema';

export type CometsRequestDocument = HydratedDocument<CometsRequest>

interface ModelParams {
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
    
    // Need to figure out how to lookup the requests document in a more human-readable game
    // id might work, but how would I call it on other parts of the code?
    // @Prop({ type: Types.ObjectId, required: true, unique: true})
    // id: string

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

    // @Prop({ type: Job, required: false})
    // completedJob: Job;
}

export const CometsRequestSchema = SchemaFactory.createForClass(CometsRequest)
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Validate, Validator } from 'class-validator';
import { HydratedDocument, Document, Types } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type UserDocument = HydratedDocument<User>

@Schema()
export class User extends Document {

    @Prop({ type: String, required: true, default: () => uuidv4() })
    id: string

    @Prop({ type: String, required: true })
    email: string

    @Prop({ type: Number, default: 0 })
    total_simulations: number

    @Prop({ type: Number, default: 0 })
    total_downloads: number
}

export const UserSchema = SchemaFactory.createForClass(User)
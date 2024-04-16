import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Validate, Validator } from 'class-validator';
import { HydratedDocument, Document, Types } from 'mongoose';

export type UserDocument = HydratedDocument<User>

@Schema()
export class User extends Document {

    @Prop({ type: String})
    email: string

    @Prop({ type: Number})
    total_simulations: number

    @Prop({ type: Number})
    total_downloads: number
}

export const UserSchema = SchemaFactory.createForClass(User)
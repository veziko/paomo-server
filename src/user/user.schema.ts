import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {

    @Prop()
    openid: string;

    @Prop()
    name: string;

    @Prop()
    avatar: string;

    @Prop()
    gender: number;

    @Prop()
    country: string;

    @Prop()
    province: string;

    @Prop()
    city: string;

    @Prop()
    created: number;

}

export const UserSchema = SchemaFactory.createForClass(User);
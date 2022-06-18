import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

export type AliyunDocument = Aliyun & Document;

@Schema()
export class Aliyun {

    @Prop()
    name: string;

    @Prop()
    mimeType: string;

    @Prop()
    hash: string;

    @Prop()
    userId: string;

    @Prop()
    size: number;

    @Prop()
    width: number;

    @Prop()
    height: number;

    @Prop()
    created: number;

}

export const AliyunSchema = SchemaFactory.createForClass(Aliyun);
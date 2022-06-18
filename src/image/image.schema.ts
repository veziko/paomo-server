import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

export type ImageDocument = Image & Document;

@Schema()
export class Image {

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

export const ImageSchema = SchemaFactory.createForClass(Image);
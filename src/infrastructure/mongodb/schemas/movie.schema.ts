import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MovieDocument = MovieEntity & Document;

@Schema()
export class MovieEntity {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  director: string;

  @Prop()
  releaseDate?: string;
}

export const MovieSchema = SchemaFactory.createForClass(MovieEntity);

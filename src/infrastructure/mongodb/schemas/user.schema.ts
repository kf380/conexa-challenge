import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = UserEntity & Document;

@Schema()
export class UserEntity {
  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: 'regular' })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(UserEntity);

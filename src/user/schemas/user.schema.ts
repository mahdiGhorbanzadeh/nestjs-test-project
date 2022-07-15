import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true,type:Date })
  createdAt;

  @Prop({ required: true,type:Date })
  updatedAt;

  @Prop({type:String,required: true,})
  email;
  
  @Prop({type:String,required: true,})
  password;

  @Prop()
  firstName:string;

  @Prop()
  lastName:string;

}

export const UserSchema = SchemaFactory.createForClass(User);


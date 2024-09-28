import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, ObjectId } from "mongoose";

@Schema({ versionKey: false })
export class User {
  _id: ObjectId;

  @Prop({ unique: true })
  email: string;

  @Prop()
  name: string;

  @Prop()
  password: string;

  @Prop()
  address: string;

  @Prop()
  document: string;

  @Prop({ default: false })
  adm: boolean;

  @Prop()
  birthDate: Date;
}

export type UserDocument = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);

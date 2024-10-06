import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, HydratedDocument, Types } from "mongoose";
import { User } from "../../user/entities/user.entity";
import { Procedure } from "../../procedure/entities/procedure.entity";

@Schema({ versionKey: false })
export class Appointment extends Document {
  @Prop({ unique: true })
  password: string;

  @Prop({ type: [String], required: false })
  files?: string[];

  @Prop({ type: Date })
  start: Date;

  @Prop({ type: Date })
  end: Date;

  @Prop({ type: Types.ObjectId, ref: "User" })
  user: User;

  @Prop({ type: [{ type: Types.ObjectId, ref: "Procedure" }] })
  procedures: Procedure[];
}

export type AppointmentDocument = HydratedDocument<Appointment>;
export const AppointmentSchema = SchemaFactory.createForClass(Appointment);

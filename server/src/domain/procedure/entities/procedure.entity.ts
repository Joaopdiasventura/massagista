import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, ObjectId } from "mongoose";

@Schema({ versionKey: false })
export class Procedure {
  _id: ObjectId;
  @Prop()
  value: number;
  @Prop()
  duration: number;
  @Prop()
  name: string;
  @Prop()
  description: string;
  @Prop({ type: [String] })
  orientations: string[];
  @Prop({ type: [String], required: false })
  questions: string[];
}

export type ProcedureDocument = HydratedDocument<Procedure>;
export const ProcedureSchema = SchemaFactory.createForClass(Procedure);

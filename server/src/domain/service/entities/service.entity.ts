import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { User } from "../../user/entities/user.entity";
import { Procedure } from "../../procedure/entities/procedure.entity";


@Schema({ versionKey: false })
export class Service {
  @Prop()
  password: string

  @Prop({ type: [String] })
  files: string[];

  @Prop({ type: Date })
  start: Date;

  @Prop({ type: Date })
  end: Date;

  @Prop({ type: Types.ObjectId, ref: User.name })
  user: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: Procedure.name })
  procedure: Types.ObjectId;
}

export type UserDocument = HydratedDocument<Service>;
export const ServiceSchema = SchemaFactory.createForClass(Service);

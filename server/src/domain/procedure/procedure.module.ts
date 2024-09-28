import { Module } from "@nestjs/common";
import { ProcedureService } from "./procedure.service";
import { ProcedureController } from "./procedure.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Procedure, ProcedureSchema } from "./entities/procedure.entity";
import { UserModule } from "../user/user.module";
import { AuthModule } from "src/auth/auth.module";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Procedure.name, schema: ProcedureSchema },
    ]),
    AuthModule,
    UserModule,
  ],
  controllers: [ProcedureController],
  providers: [ProcedureService],
})
export class ProcedureModule {}

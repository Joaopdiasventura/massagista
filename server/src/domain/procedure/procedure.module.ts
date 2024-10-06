import { Module } from "@nestjs/common";
import { ProcedureService } from "./procedure.service";
import { ProcedureController } from "./procedure.controller";
import { ProcedureRepository } from "./procedure.repository";
import { MongooseModule } from "@nestjs/mongoose";
import { ProcedureSchema } from "./entities/procedure.entity";
import { UserModule } from "../user/user.module";
import { AuthModule } from "src/auth/auth.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Procedure", schema: ProcedureSchema }]),
    AuthModule,
    UserModule,
  ],
  exports: [ProcedureService],
  controllers: [ProcedureController],
  providers: [ProcedureService, ProcedureRepository],
})
export class ProcedureModule {}

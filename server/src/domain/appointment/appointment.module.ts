import { Module } from "@nestjs/common";
import { AppointmentService } from "./appointment.service";
import { AppointmentController } from "./appointment.controller";
import { AppointmentRepository } from "./appointment.repository";
import { MongooseModule } from "@nestjs/mongoose";
import { AppointmentSchema } from "./entities/appointment.entity";
import { AuthModule } from "../../auth/auth.module";
import { ProcedureModule } from "../procedure/procedure.module";
import { UserModule } from "../user/user.module";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: "Appointment", schema: AppointmentSchema },
    ]),
    UserModule,
    ProcedureModule,
    AuthModule,
  ],
  controllers: [AppointmentController],
  providers: [AppointmentService, AppointmentRepository],
})
export class AppointmentModule {}

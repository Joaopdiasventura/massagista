import { Module } from "@nestjs/common";
import { AppointmentService } from "./appointment.service";
import { AppointmentController } from "./appointment.controller";
import { AppointmentRepository } from "./appointment.repository";
import { AppointmentListener } from "./appointment.listener";
import { MongooseModule } from "@nestjs/mongoose";
import { AppointmentSchema } from "./entities/appointment.entity";
import { AuthModule } from "../../auth/auth.module";
import { ProcedureModule } from "../procedure/procedure.module";
import { UserModule } from "../user/user.module";
import { ConfigModule } from "@nestjs/config";
import { ScheduleModule } from "@nestjs/schedule";
import { WhatsappModule } from "../../shared/service/whatsapp/whatsapp.module";
import { EmailModule } from "../../shared/service/email/email.module";
import { EventEmitterModule } from "@nestjs/event-emitter";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: "Appointment", schema: AppointmentSchema },
    ]),
    ScheduleModule.forRoot(),
    EventEmitterModule.forRoot(),
    UserModule,
    ProcedureModule,
    ConfigModule,
    WhatsappModule,
    EmailModule,
    AuthModule,
  ],
  controllers: [AppointmentController],
  providers: [AppointmentService, AppointmentRepository, AppointmentListener],
})
export class AppointmentModule {}

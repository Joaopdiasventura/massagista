import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AppConfig } from "./config/app.config";
import { DatabaseConfig } from "./config/database.config";
import { MongooseModule } from "@nestjs/mongoose";
import { JwtModule } from "@nestjs/jwt";
import { UserModule } from "./domain/user/user.module";
import { AppointmentModule } from "./domain/appointment/appointment.module";
import { ProcedureModule } from "./domain/procedure/procedure.module";
import { AuthModule } from "./auth/auth.module";
import { AddressModule } from "./domain/shared/address/address.module";

@Module({
  imports: [
    ConfigModule.forRoot({ load: [AppConfig, DatabaseConfig] }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>("mongo.uri"),
      }),
    }),
    JwtModule.register({
      global: true,
      secret: AppConfig().jwtSecret,
    }),
    UserModule,
    AppointmentModule,
    ProcedureModule,
    AuthModule,
    AddressModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

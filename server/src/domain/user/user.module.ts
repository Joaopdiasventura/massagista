import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { UserRepository } from "./user.repository";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "../../auth/auth.module";
import { FileModule } from "../shared/service/file/file.module";
import { User, UserSchema } from "./entities/user.entity";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ConfigModule,
    AuthModule,
    FileModule,
  ],
  exports: [UserService],
  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export class UserModule {}

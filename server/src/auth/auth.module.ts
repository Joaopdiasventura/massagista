import { forwardRef, Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UserModule } from "../domain/user/user.module";
import { AuthGuard } from "./guard/auth.guard";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [forwardRef(() => UserModule), ConfigModule],
  exports: [AuthService],
  providers: [AuthService, AuthGuard],
})
export class AuthModule {}

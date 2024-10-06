import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { AuthService } from "../auth.service";
import { UserService } from "../../domain/user/user.service";
import { Reflector } from "@nestjs/core";
import { AuthenticatedRequest } from "../../shared/models/authenticated-request.interface";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}
  async canActivate(context: ExecutionContext) {
    const request: AuthenticatedRequest = context.switchToHttp().getRequest();
    const token = request.headers.authorization;
    if (!token) throw new UnauthorizedException("Token não enviado");
    const _id = await this.authService.decodeToken(token);
    const user = await this.userService.findById(_id);
    if (!user) throw new UnauthorizedException("Usuário não encontrado");
    request.user = user;
    const access = this.reflector.get<string>("access", context.getHandler());
    if (access == "adm" && !user.adm)
      throw new UnauthorizedException("Acesso restrito");
    return true;
  }
}

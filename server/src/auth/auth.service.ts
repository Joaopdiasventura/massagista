import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(private readonly jwt: JwtService) {}

  async generateToken(email: string) {
    return await this.jwt.signAsync(email);
  }

  async decodeToken(token: string) {
    try {
      return String(await this.jwt.verifyAsync(token));
    } catch (error) {
      throw new UnauthorizedException("Token inválido");
    }
  }

  public validatePermission(requestId: string, id: string, adm: boolean) {
    if (!(requestId == id || adm))
      throw new UnauthorizedException(
        "Você não tem permissão para realizar essa ação com este usuário",
      );
  }
}

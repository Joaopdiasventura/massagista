import { ConfigService } from "@nestjs/config";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwt: JwtService,
    private readonly configService: ConfigService,
  ) {}

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
  
}

import { IsEmail, IsString } from "class-validator";

export class LoginUserDto {
  @IsEmail({}, { message: "O campo email precisa ser um email válido" })
  email: string;
  @IsString({ message: "O campo password precisa ser uma string" })
  password: string;
}

import { Type } from "class-transformer";
import { IsDate, IsEmail, IsString, Matches } from "class-validator";

export class CreateUserDto {
  @IsEmail({}, { message: "campo 'email' precisa ser um email válido" })
  email: string;

  @IsString({ message: "campo 'name' precisa ser do tipo string" })
  name: string;

  @IsString({ message: "campo 'password' precisa ser do tipo string" })
  password: string;

  @IsString({ message: "Campo 'cellphone' precisa ser do tipo string" })
  @Matches(/^[0-9]+$/, {
    message: "Campo 'cellphone' deve conter apenas números",
  })
  cellphone: string;

  @IsString({ message: "campo 'address' precisa ser do tipo string" })
  address: string;

  document?: string;

  @IsDate({ message: "Campo 'birthDate' deve ser uma data" })
  @Type(() => Date)
  birthDate: Date;
}

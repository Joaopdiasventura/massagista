import { IsString } from "class-validator";

export class DecodeTokenDto {
  @IsString()
  token: string;
}

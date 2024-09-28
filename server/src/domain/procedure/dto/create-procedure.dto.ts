import { IsNumber, IsString, IsArray, IsOptional } from "class-validator";

export class CreateProcedureDto {
  @IsNumber({}, { message: "campo 'value' precisa ser um número" })
  value: number;

  @IsNumber({}, { message: "campo 'duration' precisa ser um número" })
  duration: number;

  @IsString({ message: "campo 'name' precisa ser uma string" })
  name: string;

  @IsString({ message: "campo 'description' precisa ser uma string" })
  description: string;

  @IsArray({ message: "campo 'orientations' precisa ser um array" })
  @IsString({
    each: true,
    message: "cada item em 'orientations' precisa ser uma string",
  })
  orientations: string[];

  @IsOptional()
  @IsArray({ message: "campo 'questions' precisa ser uma array" })
  @IsString({
    each: true,
    message: "cada item em 'questions' precisa ser uma string",
  })
  questions: string;
}

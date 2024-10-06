import { Type } from "class-transformer";
import { IsArray, IsDate, IsMongoId, ArrayNotEmpty } from "class-validator";

export class CreateAppointmentDto {
  password?: string;
  files?: string[];

  @IsDate({ message: "Campo 'start' deve ser uma data" })
  @Type(() => Date)
  start: Date;

  @IsDate({ message: "Campo 'end' deve ser uma data" })
  @Type(() => Date)
  end: Date;

  @IsMongoId({ message: "Campo 'user' deve ser um ObjectId válido" })
  user: string;

  @IsArray({ message: "Campo 'procedures' deve ser um array" })
  @ArrayNotEmpty({ message: "Campo 'procedures' não pode estar vazio" })
  @IsMongoId({
    message: "Cada item em 'procedures' deve ser um ObjectId válido",
    each: true,
  })
  procedures: string[];
}

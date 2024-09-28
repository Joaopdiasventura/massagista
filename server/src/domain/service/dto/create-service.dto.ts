import { Type } from "class-transformer";
import { IsDate, IsMongoId } from "class-validator";

export class CreateServiceDto {
  password?: string
  files?: string[];

  @IsDate({ message: "Campo 'start' deve ser uma data" })
  @Type(() => Date)
  start: Date;

  @IsDate({ message: "Campo 'end' deve ser uma data" })
  @Type(() => Date)
  end: Date;

  @IsMongoId({ message: "Campo 'user' deve ser um ObjectId válido" })
  user: string;

  @IsMongoId({ message: "Campo 'procedure' deve ser um ObjectId válido" })
  procedure: string;
}

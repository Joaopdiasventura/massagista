import { PartialType } from "@nestjs/mapped-types";
import { CreateProcedureDto } from "./create-procedure.dto";

export class UpdateProcedureDto extends PartialType(CreateProcedureDto) {}

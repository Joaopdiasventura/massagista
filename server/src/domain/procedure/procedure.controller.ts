import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { ProcedureService } from "./procedure.service";
import { CreateProcedureDto } from "./dto/create-procedure.dto";
import { UpdateProcedureDto } from "./dto/update-procedure.dto";
import { Access } from "src/auth/decorator/roles.decorator";
import { AuthGuard } from "src/auth/guard/auth.guard";

@Controller("procedure")
export class ProcedureController {
  constructor(private readonly procedureService: ProcedureService) {}

  @UseGuards(AuthGuard)
  @Access("adm")
  @Post()
  async create(@Body() createProcedureDto: CreateProcedureDto) {
    await this.procedureService.create(createProcedureDto);
    return { message: "Procedimento adicionado com sucesso" };
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll() {
    return await this.procedureService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(":id")
  async findById(@Param("id") id: string) {
    return await this.procedureService.findById(id);
  }

  @UseGuards(AuthGuard)
  @Access("adm")
  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updateProcedureDto: UpdateProcedureDto,
  ) {
    await this.procedureService.update(id, updateProcedureDto);
    return { message: "Procedimento atualizado com sucesso" };
  }

  @UseGuards(AuthGuard)
  @Access("adm")
  @Delete(":id")
  async remove(@Param("id") id: string) {
    await this.procedureService.remove(id);
    return { message: "Procedimento excluído com sucesso" };
  }
}

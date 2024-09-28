import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  UseGuards,
  ParseIntPipe,
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
  @Access("adm")
  @Get()
  async findAll() {
    return await this.procedureService.findAll();
  }

  @UseGuards(AuthGuard)
  @Access("adm")
  @Get(":_id")
  async findById(@Param("_id") _id: string) {
    try {
      const procedure = await this.procedureService.findById(_id);
      if (!procedure)
        throw new NotFoundException("Procedimento não encontrado");
      return procedure;
    } catch (error) {
      throw new NotFoundException("Procedimento não encontrado");
    }
  }

  @UseGuards(AuthGuard)
  @Access("adm")
  @Patch(":_id")
  async update(
    @Param("_id") _id: string,
    @Body() updateProcedureDto: UpdateProcedureDto,
  ) {
    await this.findById(_id);
    await this.procedureService.update(_id, updateProcedureDto);
    return { message: "Procedimento atualizado com sucesso" };
  }

  @UseGuards(AuthGuard)
  @Access("adm")
  @Delete(":_id")
  async remove(@Param("_id", ParseIntPipe) _id: string) {
    await this.findById(_id);
    await this.procedureService.remove(_id);
    return { message: "Procedimento excluído com sucesso" };
  }
}

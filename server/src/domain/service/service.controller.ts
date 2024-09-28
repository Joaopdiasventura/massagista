import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from "@nestjs/common";
import { ServiceService } from "./service.service";
import { CreateServiceDto } from "./dto/create-service.dto";
import { UpdateServiceDto } from "./dto/update-service.dto";

@Controller("service")
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Post()
  async create(@Body() createServiceDto: CreateServiceDto) {
    await this.serviceService.create(createServiceDto);
    return { message: "Agendamento adicionado com sucesso" };
  }

  @Get()
  async findAll() {
    return await this.serviceService.findAll();
  }

  @Get(":_id")
  async findOne(@Param("_id") _id: string) {
    try {
      const service = await this.serviceService.findOne(_id);
      if (!service) throw new NotFoundException("Agendamento não encontrado");
      return service;
    } catch (error) {
      throw new NotFoundException("Agendamento não encontrado");
    }
  }

  @Patch(":_id")
  async update(
    @Param("_id") _id: string,
    @Body() updateServiceDto: UpdateServiceDto,
  ) {
    await this.findOne(_id);
    await this.serviceService.update(_id, updateServiceDto);
    return { message: "Agendamento atualizado com sucesso" };
  }

  @Delete(":_id")
  async remove(@Param("_id") _id: string) {
    await this.findOne(_id);
    await this.serviceService.remove(_id);
    return { message: "Agendamento removido com sucesso" };
  }
}

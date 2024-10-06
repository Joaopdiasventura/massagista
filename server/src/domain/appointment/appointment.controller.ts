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
import { AppointmentService } from "./appointment.service";
import { CreateAppointmentDto } from "./dto/create-appointment.dto";
import { UpdateAppointmentDto } from "./dto/update-appointment.dto";
import { Access } from "../../auth/decorator/roles.decorator";
import { AuthGuard } from "../../auth/guard/auth.guard";

@Controller("appointment")
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @UseGuards(AuthGuard)
  @Access("adm")
  @Post()
  async create(@Body() createAppointmentDto: CreateAppointmentDto) {
    const appointment =
      await this.appointmentService.create(createAppointmentDto);
    return { message: "Agendamento adicionado com sucesso", appointment };
  }

  @Get()
  async findAll() {
    return await this.appointmentService.findAll();
  }

  @Get(":id")
  async findById(@Param("id") id: string) {
    return await this.appointmentService.findById(id);
  }

  @Get("password/:password")
  async findByPassword(@Param("password") password: string) {
    return await this.appointmentService.findByPassword(password);
  }

  @UseGuards(AuthGuard)
  @Access("adm")
  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updateAppointmentDto: UpdateAppointmentDto,
  ) {
    await this.appointmentService.update(id, updateAppointmentDto);
    return { message: "Agendamento atualizado com sucesso" };
  }

  @UseGuards(AuthGuard)
  @Access("adm")
  @Delete(":id")
  async remove(@Param("id") id: string) {
    await this.appointmentService.remove(id);
    return { message: "Agendamento removido com sucesso" };
  }
}

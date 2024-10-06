import { Injectable, NotFoundException } from "@nestjs/common";
import { AppointmentRepository } from "./appointment.repository";
import { CreateAppointmentDto } from "./dto/create-appointment.dto";
import { UpdateAppointmentDto } from "./dto/update-appointment.dto";
import { UserService } from "./../user/user.service";
import { Appointment } from "./entities/appointment.entity";
import { ProcedureService } from "../procedure/procedure.service";
import { randomBytes } from "node:crypto";

@Injectable()
export class AppointmentService {
  constructor(
    private readonly appointmentRepository: AppointmentRepository,
    private readonly userService: UserService,
    private readonly procedureService: ProcedureService,
  ) {}

  async create(
    createAppointmentDto: CreateAppointmentDto,
  ): Promise<Appointment> {
    createAppointmentDto.password = await this.generateValidPassword();
    await this.verifyUser(createAppointmentDto.user);
    await this.verifyProcedures(createAppointmentDto.procedures);
    return await this.appointmentRepository.create(createAppointmentDto);
  }

  async findAll(): Promise<Appointment[]> {
    return await this.appointmentRepository.findAll();
  }

  async findById(id: string): Promise<Appointment> {
    const appointment = await this.appointmentRepository.findById(id);
    if (!appointment) throw new NotFoundException("Agendamento não encontrado");
    return appointment;
  }

  async findByPassword(password: string): Promise<Appointment> {
    const appointment =
      await this.appointmentRepository.findByPassword(password);
    if (!password) throw new NotFoundException("Agendamento não encontrado");
    return appointment;
  }

  async update(
    id: string,
    updateAppointmentDto: UpdateAppointmentDto,
  ): Promise<void> {
    await this.findById(id);
    if (updateAppointmentDto.user) this.verifyUser(updateAppointmentDto.user);
    if (updateAppointmentDto.procedures)
      this.verifyProcedures(updateAppointmentDto.procedures);
    await this.appointmentRepository.update(id, updateAppointmentDto);
  }

  async remove(id: string): Promise<void> {
    await this.findById(id);
    await this.appointmentRepository.remove(id);
  }

  private generateUniquePassword(): string {
    return randomBytes(8).toString("hex");
  }

  private async generateValidPassword(): Promise<string> {
    let password: string;
    let isPasswordUnique = false;
    do {
      password = this.generateUniquePassword();
      isPasswordUnique =
        !(await this.appointmentRepository.findByPassword(password));
    } while (!isPasswordUnique);
    return password;
  }

  async verifyUser(user: string) {
    await this.userService.findById(user);
  }

  async verifyProcedures(procedures: string[]) {
    for (const procedure of procedures) {
      await this.procedureService.findById(procedure);
    }
  }
}

import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Appointment } from "./entities/appointment.entity";
import { CreateAppointmentDto } from "./dto/create-appointment.dto";
import { UpdateAppointmentDto } from "./dto/update-appointment.dto";

@Injectable()
export class AppointmentRepository {
  constructor(
    @InjectModel("Appointment")
    private readonly appointmentModel: Model<Appointment>,
  ) {}

  async create(
    createAppointmentDto: CreateAppointmentDto,
  ): Promise<Appointment> {
    return await this.appointmentModel.create(createAppointmentDto);
  }

  async findAll(): Promise<Appointment[]> {
    return await this.appointmentModel.find();
  }

  async findById(id: string): Promise<Appointment> {
    return await this.appointmentModel
      .findById(id)
      .populate({
        path: "user",
        select: "email name cellphone",
      })
      .populate({
        path: "procedures",
        model: "Procedure",
        select: "name value duration",
      })
      .exec();
  }

  async findByPassword(password: string): Promise<Appointment> {
    return await this.appointmentModel.findOne({ password });
  }

  async update(
    id: string,
    updateAppointmentDto: UpdateAppointmentDto,
  ): Promise<Appointment> {
    return await this.appointmentModel.findByIdAndUpdate(
      id,
      updateAppointmentDto,
      {
        new: true,
      },
    );
  }

  async remove(id: string): Promise<Appointment> {
    return await this.appointmentModel.findByIdAndDelete(id);
  }
}
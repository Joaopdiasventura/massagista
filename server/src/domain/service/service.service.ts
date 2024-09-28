import { Injectable } from "@nestjs/common";
import { CreateServiceDto } from "./dto/create-service.dto";
import { UpdateServiceDto } from "./dto/update-service.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Service } from "./entities/service.entity";
import { Model } from "mongoose";

@Injectable()
export class ServiceService {
  constructor(
    @InjectModel(Service.name) private readonly serviceModel: Model<Service>,
  ) {}

  async create(createServiceDto: CreateServiceDto): Promise<Service> {
    return await this.serviceModel.create(createServiceDto);
  }

  async findAll(): Promise<Service[]> {
    return await this.serviceModel.find();
  }

  async findOne(_id: string): Promise<Service> {
    return await this.serviceModel.findById(_id);
  }

  async update(_id: string, updateServiceDto: UpdateServiceDto): Promise<Service> {
    return await this.serviceModel.findByIdAndUpdate(_id, updateServiceDto);
  }

  async remove(_id: string): Promise<Service> {
    return await this.serviceModel.findByIdAndDelete(_id);
  }
}

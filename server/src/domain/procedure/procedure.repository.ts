import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Procedure } from "./entities/procedure.entity";
import { CreateProcedureDto } from "./dto/create-procedure.dto";
import { UpdateProcedureDto } from "./dto/update-procedure.dto";

@Injectable()
export class ProcedureRepository {
  constructor(
    @InjectModel("Procedure")
    private readonly procedureModel: Model<Procedure>,
  ) {}

  async create(createProcedureDto: CreateProcedureDto): Promise<Procedure> {
    return await this.procedureModel.create(createProcedureDto);
  }

  async findAll(): Promise<Procedure[]> {
    return await this.procedureModel
      .find()
      .select("_id name value duration")
      .exec();
  }

  async findById(_id: string): Promise<Procedure> {
    return await this.procedureModel.findById(_id);
  }

  async update(
    _id: string,
    updateProcedureDto: UpdateProcedureDto,
  ): Promise<Procedure> {
    return await this.procedureModel.findByIdAndUpdate(_id, updateProcedureDto);
  }

  async remove(_id: string): Promise<Procedure> {
    return await this.procedureModel.findByIdAndDelete(_id);
  }
}

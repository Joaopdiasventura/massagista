import { Injectable, NotFoundException } from "@nestjs/common";
import { ProcedureRepository } from "./procedure.repository";
import { CreateProcedureDto } from "./dto/create-procedure.dto";
import { UpdateProcedureDto } from "./dto/update-procedure.dto";
import { Procedure } from "./entities/procedure.entity";

@Injectable()
export class ProcedureService {
  constructor(private readonly procedureRepository: ProcedureRepository) {}

  async create(createProcedureDto: CreateProcedureDto): Promise<void> {
    await this.procedureRepository.create(createProcedureDto);
  }

  async findAll(): Promise<Procedure[]> {
    return await this.procedureRepository.findAll();
  }

  async findById(_id: string): Promise<Procedure> {
    const procedure = await this.procedureRepository.findById(_id);
    if (!procedure) throw new NotFoundException("Procedimento não encontrado");
    return procedure;
  }

  async update(
    _id: string,
    updateProcedureDto: UpdateProcedureDto,
  ): Promise<void> {
    await this.findById(_id);
    await this.procedureRepository.update(_id, updateProcedureDto);
  }

  async remove(_id: string): Promise<void> {
    await this.findById(_id);
    await this.procedureRepository.remove(_id);
  }
}

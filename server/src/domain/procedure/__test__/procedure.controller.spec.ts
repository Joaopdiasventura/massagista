import { Test, TestingModule } from "@nestjs/testing";
import { ProcedureController } from "../procedure.controller";
import { ProcedureService } from "../procedure.service";

describe("ProcedureController", () => {
  let controller: ProcedureController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProcedureController],
      providers: [ProcedureService],
    }).compile();

    controller = module.get<ProcedureController>(ProcedureController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});

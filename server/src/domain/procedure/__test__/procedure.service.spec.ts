import { Test, TestingModule } from "@nestjs/testing";
import { ProcedureService } from "../procedure.service";

describe("ProcedureService", () => {
  let service: ProcedureService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProcedureService],
    }).compile();

    service = module.get<ProcedureService>(ProcedureService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});

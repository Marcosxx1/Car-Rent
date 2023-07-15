import { SpecificaionRepository } from "../../repository/implementations/SpecificationRepository";
import { CreateSpecificationUseCase } from "./CreateSpecifiationUseCase";
import { CreateSpecificationController } from "./CreateSpecificationController";

const specificationRepository = new SpecificaionRepository();
const createSpecificationUseCase = new CreateSpecificationUseCase(
  specificationRepository,
);
const createSpecificationController = new CreateSpecificationController(
  createSpecificationUseCase,
);

export { createSpecificationController };

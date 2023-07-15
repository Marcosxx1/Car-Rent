import { SpecificaionRepository } from "../../repository/implementations/SpecificationRepository";
import { ListSpecificationController } from "./ListSpecificationController";
import { ListSpecificationUseCase } from "./ListSpecificationUseCase";

const specificationRepository = new SpecificaionRepository();
const listSpecificationUseCase = new ListSpecificationUseCase(
  specificationRepository,
);
const listSpecificationController = new ListSpecificationController(
  listSpecificationUseCase,
);

export { listSpecificationController };

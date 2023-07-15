import { CategoriesRepository } from "../../repository/implementations/CategoriesRepository";
import { CreateSpecificationUseCase } from "./CreateSpecifiationUseCase";
import { CreateSpecificationController } from "./CreateSpecificationController";

const categoryRepository = CategoriesRepository.getInstance();
const createSpecificationUseCase = new CreateSpecificationUseCase(
  categoryRepository,
);
const createSpecificationController = new CreateSpecificationController(
  createSpecificationUseCase,
);

export { createSpecificationController };

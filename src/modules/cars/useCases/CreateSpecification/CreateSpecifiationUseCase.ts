import { inject, injectable } from "tsyringe";

import { ISpecificationRepository } from "../../repository/ISpecificationRepository";
import { AppError } from "../../../../errors/AppError";

interface IRequest {
  name: string;
  description: string;
}
@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject("SpecificationRepository")
    private specificationRepository: ISpecificationRepository,
  ) { }
  async execute({ name, description }: IRequest): Promise<void> {
    name = name.trim();
    description = description.trim();

    if (!name || !description) {
      throw new AppError("Category name and description cannot be empty!")
    }
    const specificationAlreadyExists =
      await this.specificationRepository.findByName(name);

    if (specificationAlreadyExists) {
      throw new AppError("Specification already exists!");
    }
    await this.specificationRepository.create({ name, description });
  }
}

export { CreateSpecificationUseCase };

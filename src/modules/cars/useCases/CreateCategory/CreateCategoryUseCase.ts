import { inject, injectable } from "tsyringe";

import { ICategoriesRepository } from "../../repository/ICategoriesRepository";
import { AppError } from "../../../../errors/AppError";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository,
  ) { }

  async execute({ name, description }: IRequest): Promise<void> {
    name = name.trim();
    description = description.trim();

    if (!name || !description) {
      throw new AppError("Category name and description cannot be empty!")
    }

    const categoryAlreadyExists = await this.categoriesRepository.findByName(name);

    if (categoryAlreadyExists) {
      throw new AppError("Category already exists!");
    }

    this.categoriesRepository.create({ name, description });
  }
}
export { CreateCategoryUseCase };

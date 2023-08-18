import { inject, injectable } from "tsyringe";

import { ICategoriesRepository } from "../../repository/ICategoriesRepository";
import { Category } from "../../infra/typeorm/entities/Category"
@injectable()
class ListCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoryRepository: ICategoriesRepository,
  ) { }

  async execute(): Promise<Category[]> {
    const categories = await this.categoryRepository.list();
    return categories;
  }
}

export { ListCategoryUseCase };

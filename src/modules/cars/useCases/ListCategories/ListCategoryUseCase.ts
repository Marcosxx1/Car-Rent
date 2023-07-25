import { Category } from "../../entities/Category";
import { ICategoriesRepository } from "../../repository/ICategoriesRepository";

class ListCategoryUseCase {
  // eslint-disable-next-line prettier/prettier
  constructor(private categoryRepository: ICategoriesRepository) { }

  async execute(): Promise<Category[]> {
    const categories = await this.categoryRepository.list();
    return categories;
  }
}

export { ListCategoryUseCase };

import { Category } from "../../entities/Category";
import { ICategoriesRepository } from "../../repository/ICategoriesRepository";

class ListCategoryUseCase {
  // eslint-disable-next-line prettier/prettier
  constructor(private categoryRepository: ICategoriesRepository) { }

  execute(): Category[] {
    const categories = this.categoryRepository.list();
    return categories;
  }
}

export { ListCategoryUseCase };

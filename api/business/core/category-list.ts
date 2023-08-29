import { ICategory } from "../entities/Category";
import CategoryPort from "../ports/categories-ports";

export class ListCategory {
  private categoryAdapter: CategoryPort;

  constructor(categoryAdapter: CategoryPort) {
    this.categoryAdapter = categoryAdapter;
  }

  async execute(): Promise<ICategory[]> {
    const categories_found = await this.categoryAdapter.list(1, 2);
    if (!categories_found) {
      throw ("Categories list is empty!");
    }
    return categories_found;
  }

}
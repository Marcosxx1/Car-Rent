import { ICategory } from "../entities/Category";
import CategoryPort from "../ports/categories-ports";


interface IRequest {
  name: string;
  description: string;
}

export class CategoryCreate {
  private categoryAdapter: CategoryPort;

  constructor(categoryAdapter: CategoryPort) {
    this.categoryAdapter = categoryAdapter;
  }

  async execute({ name, description }: IRequest): Promise<ICategory> {
    if (!name || !description) {
      throw ("Invalid name or description");
    }
    if (await this.categoryAdapter.findByName(name)) {
      throw ("Category already exists");
    }
    const categoryCreated = await this.categoryAdapter.create({ name, description });
    return categoryCreated;
  }
}
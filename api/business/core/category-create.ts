import { DataValidator } from "../../adapters/in/http/utils/validate-data";
import { ValidateCategory } from "../../adapters/out/type-orm/postgres-adapter/models/data-validation/category-dto-validation";
import { ICategory } from "../entities/Category";
import CategoryPort from "../ports/categories-ports";


export class CategoryCreate {
  private categoryAdapter: CategoryPort;
  private dataValidator: DataValidator;

  constructor(categoryAdapter: CategoryPort) {
    this.categoryAdapter = categoryAdapter;
  }

  async execute(category: ValidateCategory): Promise<ICategory> {

    this.dataValidator = new DataValidator();
    await this.dataValidator.validateData(category)

    if (await this.categoryAdapter.findByName(category.name)) {
      throw ("Category already exists");
    }
    const categoryCreated = await this.categoryAdapter.create(category);
    return categoryCreated;
  }
}
import { Repository } from "typeorm";
import { ICategory } from "../../../../business/entities/Category";
import CategoryPort from "../../../../business/ports/categories-ports";
import { CategoryModel } from "./models/category-model";
import { AppDataSource } from "..";


export class CategoryRepositoryAdapter implements CategoryPort {
  private repository: Repository<CategoryModel>

  constructor() {
    this.repository = AppDataSource.getRepository(CategoryModel)
  }

  async findByName(name: string): Promise<ICategory> {
    const category = this.repository.findOneBy({ name });
    return category;
  }

  async list(page: number, limit: number): Promise<ICategory[]> {
    const categories = await this.repository.find({
      take: limit,
      skip: (page - 1) * limit,
    });

    return categories;
  }

  async create({ name, description }: ICategory): Promise<ICategory> {
    const category = this.repository.create({
      name,
      description,
      created_at: new Date()
    })
    await this.repository.save(category);
    return Promise.resolve(category);
  }

}
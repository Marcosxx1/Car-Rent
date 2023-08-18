import { Category } from "../../infra/typeorm/entities/Category";
import { Specification } from "../../infra/typeorm/entities/Specification";
import { ICategoriesRepository, ICreateCategoryDTO } from "../ICategoriesRepository";



class SpecificationRepositoryInMemory implements ICategoriesRepository {

  specification: Specification[] = [];

  async findByName(name: string): Promise<Category> {
    const specification = this.specification.find(specification => specification.name === name);
    return Promise.resolve(specification);
  }
  async list(): Promise<Category[]> {
    const all = this.specification;
    return Promise.resolve(all);

  }
  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const specification = new Specification();
    Object.assign(specification, {
      name,
      description
    })

    this.specification.push(specification);
  }
}

export { SpecificationRepositoryInMemory }
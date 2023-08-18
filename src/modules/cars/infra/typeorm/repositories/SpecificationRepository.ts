import { Repository } from "typeorm";

import { Specification } from "../entities/Specification";
import {
  ICreateSpecificationDTO,
  ISpecificationRepository,
} from "../../../repository/ISpecificationRepository";
import { AppDataSource } from "../../../../../shared/infra/typeorm";

class SpecificationRepository implements ISpecificationRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = AppDataSource.getRepository(Specification);
  }

  async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
    const specification = this.repository.create({
      name,
      description,
    });

    await this.repository.save(specification);
  }

  async list(): Promise<Specification[]> {
    const specification = await this.repository.find();

    return specification;
  }

  async findByName(name: string): Promise<Specification> {
    const specification = await this.repository.findOne({ where: { name } });

    return specification;
  }
}

export { SpecificationRepository };

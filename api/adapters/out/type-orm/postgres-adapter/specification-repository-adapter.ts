import { Repository } from "typeorm";
import { ISpecification, Specification } from "../../../../business/entities/Specification";
import { ICreateSpecificationDTO, SpecificationPort } from "../../../../business/ports/specification-ports";
import { SpecificationModel } from "./models/specification-model";
import { AppDataSource } from "..";

export class SpecificationRepositoryAdapter implements SpecificationPort {
  private repository: Repository<SpecificationModel>

  constructor() {
    this.repository = AppDataSource.getRepository(SpecificationModel)

  }

  async findByName(name: string): Promise<ISpecification> {
    const specification = await this.repository.findOneBy({ name });
    return specification;
  }

  async list(page: number = 1, limit: number = 10): Promise<ISpecification[]> {
    const specifications = await this.repository
      .createQueryBuilder()
      .skip((page - 1) * limit)
      .take(limit)
      .getMany();
    return specifications;
  }

  async create({ name, description }: ICreateSpecificationDTO): Promise<ISpecification> {
    const specification = this.repository.create({
      name,
      description
    });
    await this.repository.save(specification);
    return Promise.resolve(specification);
  }

}
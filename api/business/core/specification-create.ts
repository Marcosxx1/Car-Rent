import { ISpecification } from "../entities/Specification";
import { SpecificationPort } from "../ports/specification-ports";

interface IRequest {
  name: string;
  description: string;
}

export class SpecificationCreate {
  private specificationAdapter: SpecificationPort;

  constructor(specificationAdapter: SpecificationPort) {
    this.specificationAdapter = specificationAdapter;
  }

  async execute({ name, description }: IRequest): Promise<ISpecification> {
    if (!name || !description) {
      throw ("Invalid name or description");
    }
    if (await this.specificationAdapter.findByName(name)) {
      throw ("Specification already exists");
    }
    const specificationCreated = await this.specificationAdapter.create({ name, description });
    return specificationCreated;
  }
}

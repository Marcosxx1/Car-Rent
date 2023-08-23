import { ISpecification } from "../entities/Specification";
import { SpecificationPort } from "../ports/specification-ports";



export class ListSpecification {
  private specificationAdapter: SpecificationPort;

  constructor(specificationAdapter: SpecificationPort) {
    this.specificationAdapter = specificationAdapter;
  }

  async execute(): Promise<ISpecification[]> {
    const specification_found = await this.specificationAdapter.list();

    if (!specification_found) {
      throw new Error("Specification not found")
    }

    return specification_found;
  }

}
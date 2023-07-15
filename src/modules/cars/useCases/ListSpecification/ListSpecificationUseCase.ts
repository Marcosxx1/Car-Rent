import { Specification } from "../../model/Specification";
import { ISpecificationRepository } from "../../repository/ISpecificationRepository";

class ListSpecificationUseCase {
  // eslint-disable-next-line prettier/prettier
  constructor(private specificationRepository: ISpecificationRepository) { }

  execute(): Specification[] {
    const all = this.specificationRepository.list();
    return all;
  }
}

export { ListSpecificationUseCase };

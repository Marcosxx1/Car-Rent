import { Specification } from "../entities/Specification";

interface ICreateSpecificationDTO {
  name: string;
  description: string;
}

interface ISpecificationRepository {
  list(): Specification[];
  findByName(name: string): ICreateSpecificationDTO;
  create({ name, description }: ICreateSpecificationDTO): void;
}

export { ISpecificationRepository, ICreateSpecificationDTO };

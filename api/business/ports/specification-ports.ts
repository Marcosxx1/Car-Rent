import { ISpecification, Specification } from "../entities/Specification";


export interface ICreateSpecificationDTO {
  name: string;
  description: string;
}

export interface SpecificationPort {
  findByName(name: string): Promise<ISpecification>;
  list(): Promise<ISpecification[]>;
  create({ name, description }: ICreateSpecificationDTO): Promise<ISpecification>;
}


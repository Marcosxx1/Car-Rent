import { ICategory } from "../entities/Category";

export default interface CategoryPort {
  findByName(name: string): Promise<ICategory>;
  list(page: number, limit: number): Promise<ICategory[]>;
  create({ name, description }: ICategory): Promise<ICategory>;
}
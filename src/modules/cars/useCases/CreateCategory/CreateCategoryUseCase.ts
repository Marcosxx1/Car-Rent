import { ICategoriesRepository } from "../../repository/ICategoriesRepository";

interface IRequest {
  name: string;
  description: string;
}
/* Quando este error aparecer
Property 'X' does not exist on type 'Y'.ts(2339)

Verificar se existe o atributo no construtor  (private categoriesRepository: CategoriesRepository) por exemplo
 */
class CreateCategoryUseCase {
  // eslint-disable-next-line prettier/prettier
  constructor(private categoriesRepository: ICategoriesRepository) { }

  async execute({ name, description }: IRequest): Promise<void> {
    await this.categoriesRepository.create({ name, description });
  }
}
export { CreateCategoryUseCase };

import { AppError } from "../../../../errors/AppError";
import { CategoriesRepositoryInMemory } from "../../repository/in-memory/CategoriesRepositoryInMemory";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe("Create Category", () => {

  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryInMemory);
  });

  it("should be able to create a new category", async () => {
    const category = {
      name: "Category Test",
      description: "Category description Test"
    };

    await createCategoryUseCase.execute({
      name: category.name,
      description: category.description
    });

    const categoryCreated = await categoriesRepositoryInMemory.findByName(category.name);

    expect(categoryCreated).toHaveProperty("id");
  });


  /*  O uso do expect().rejects é apropriado quando você deseja verificar se uma
      determinada ação assíncrona não deve ser concluída com sucesso, ou seja,
      espera-se que a ação lance um erro (rejeição). */

  it("should not be able to create a new category with name exists", async () => {
    const category = {
      name: "Category Test",
      description: "Category description Test"
    };

    await createCategoryUseCase.execute({
      name: category.name,
      description: category.description
    });

    await expect(createCategoryUseCase.execute({
      name: category.name,
      description: category.description
    })).rejects.toBeInstanceOf(AppError);
  });


  it("should be able to create multiple categories", async () => {
    const category1 = {
      name: "Category Test 1",
      description: "Category description Test 1"
    };

    const category2 = {
      name: "Category Test 2",
      description: "Category description Test 2"
    };

    await createCategoryUseCase.execute({
      name: category1.name,
      description: category1.description
    });

    await createCategoryUseCase.execute({
      name: category2.name,
      description: category2.description
    });

    const category1Created = await categoriesRepositoryInMemory.findByName(category1.name);
    const category2Created = await categoriesRepositoryInMemory.findByName(category2.name);

    expect(category1Created).toHaveProperty("id");
    expect(category2Created).toHaveProperty("id");
  });
});

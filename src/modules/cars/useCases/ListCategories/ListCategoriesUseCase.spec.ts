import { CategoriesRepositoryInMemory } from "../../repository/in-memory/CategoriesRepositoryInMemory";
import { CreateCategoryUseCase } from "../CreateCategory/CreateCategoryUseCase";
import { ListCategoryUseCase } from "./ListCategoryUseCase";



let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;
let listCategoriesUseCase: ListCategoryUseCase;
let createCategoryUseCase: CreateCategoryUseCase;

describe("Create categories", () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    listCategoriesUseCase = new ListCategoryUseCase(categoriesRepositoryInMemory);
    createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryInMemory)
  })

  it("should be able list all categories", async () => {
    const categories = {
      name: "name 1",
      description: "description 1",
      id: "xxxxx"
    }

    await createCategoryUseCase.execute(categories);

    const list = await listCategoriesUseCase.execute();

    expect(list).toBeInstanceOf(Array);
  })


  it("should list more than one category", async () => {
    const categories = {
      name: "name 1",
      description: "description 1",
      id: "xxxxx"
    }
    const categories2 = {
      name: "name 2",
      description: "description 2",
      id: "xxxxxx"
    }

    await createCategoryUseCase.execute(categories);

    const list = await listCategoriesUseCase.execute();

    expect(list.length).toBeGreaterThanOrEqual(1);
  })

})
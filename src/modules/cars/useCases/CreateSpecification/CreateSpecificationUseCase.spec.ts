import { AppError } from "../../../../shared/errors/AppError";
import { SpecificationRepositoryInMemory } from "../../repository/in-memory/SpecificationRepositoryInMemory";
import { CreateSpecificationUseCase } from "./CreateSpecifiationUseCase";



let createSpecificationUseCase: CreateSpecificationUseCase;
let specificationsRepositoryInMemory: SpecificationRepositoryInMemory;

describe("Create Specification", () => {

  beforeEach(() => {
    specificationsRepositoryInMemory = new SpecificationRepositoryInMemory();
    createSpecificationUseCase = new CreateSpecificationUseCase(specificationsRepositoryInMemory);
  })

  it("Should be able to create a new specification", async () => {
    const specification = {
      name: "Specification Test",
      description: "Specification Description Test"
    }

    await createSpecificationUseCase.execute({
      name: specification.name,
      description: specification.description
    })

    const createdSpecification = await specificationsRepositoryInMemory.findByName(specification.name);

    expect(createdSpecification).toHaveProperty("id")
  })

  it("Should not be able to create a new specification with existing name on the db", async () => {
    const specification = {
      name: "Test name",
      description: "Test Description"
    }

    await createSpecificationUseCase.execute({
      name: specification.name,
      description: specification.description
    })

    await expect(createSpecificationUseCase.execute({
      name: specification.name,
      description: specification.description
    })).rejects.toBeInstanceOf(AppError);
  })

  it("should be able to create multiples specifications", async () => {
    const firstSpecification = {
      name: "First specification name",
      description: "First description name"
    }
    const SecondSpecification = {
      name: "Second specification name",
      description: "Second description name"
    }

    await createSpecificationUseCase.execute({
      name: firstSpecification.name,
      description: firstSpecification.description
    });

    await createSpecificationUseCase.execute({
      name: SecondSpecification.name,
      description: SecondSpecification.description
    });

    const firstSpecificationCreated = await specificationsRepositoryInMemory.findByName(firstSpecification.name)
    const SecondSpecificationCreated = await specificationsRepositoryInMemory.findByName(SecondSpecification.name)

    expect(firstSpecificationCreated).toHaveProperty("id");
    expect(SecondSpecificationCreated).toHaveProperty("id");
  })
  it("should not be able to create a new specification with invalid name", async () => {
    const specification = {
      name: "",
      description: "Specification Description Test"
    }

    await expect(createSpecificationUseCase.execute({
      name: specification.name,
      description: specification.description
    })).rejects.toBeInstanceOf(AppError);
  })


  it("should not be able to create a new specification with invalid description", async () => {
    const specification = {
      name: "Specification Test",
      description: ""
    }

    await expect(createSpecificationUseCase.execute({
      name: specification.name,
      description: specification.description
    })).rejects.toBeInstanceOf(AppError);
  })

  it("should not be able to create a new specification with invalid name and description", async () => {
    const specification = {
      name: "",
      description: ""
    }

    await expect(createSpecificationUseCase.execute({
      name: specification.name,
      description: specification.description
    })).rejects.toBeInstanceOf(AppError);
  })

})
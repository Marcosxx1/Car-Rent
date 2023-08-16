import { AppError } from "../../../../errors/AppError";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { UserRepositoryInMemory } from "../../repositories/implementations/in-memory/UserRepositoryInMemory";
import { CreateUserUserCase } from "./CreateUserUseCase"



let createUserUseCase: CreateUserUserCase;
let userRepositoryInMemory: UserRepositoryInMemory;
describe("CreateUserUseCase", () => {

  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory;
    createUserUseCase = new CreateUserUserCase(userRepositoryInMemory);
  })

  it("should be able to create a new user", async () => {
    const user: ICreateUserDTO = {
      name: "User Test",
      driver_license: "XXXX",
      email: "XXXXXXXXXXXXX",
      password: "XXXX"
    }

    await createUserUseCase.execute(user);

    const userCreated = await userRepositoryInMemory.findByEmail(user.email);

    expect(userCreated).toHaveProperty("id");
  });

  it("should not be able to create a new user with same email", async () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        name: "User Test",
        driver_license: "XXXX",
        email: "XXXXXXXXXXXXX",
        password: "XXXX"
      }

      await createUserUseCase.execute(user);

      await createUserUseCase.execute(user);

    }).rejects.toBeInstanceOf(Error);
  })

  it("should not be able to create a new user with one or more empty fields", () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        name: "",
        driver_license: "",
        email: "",
        password: ""
      }

      await createUserUseCase.execute(user);

    }).rejects.toBeInstanceOf(AppError);
  })

  it("should hash the password", async () => {
    const user: ICreateUserDTO = {
      name: "User Test",
      driver_license: "XXXX",
      email: "XXXXXXXXXXXXX",
      password: "XXXX"
    }

    await createUserUseCase.execute(user);

    const userCreated = await userRepositoryInMemory.findByEmail(user.email);
    console.log(userCreated)
    expect(userCreated.password).not.toEqual("XXXX");
  })

})
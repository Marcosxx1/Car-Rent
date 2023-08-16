import { AppError } from "../../../../errors/AppError";


import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { UserRepositoryInMemory } from "../../repositories/implementations/in-memory/UserRepositoryInMemory";
import { CreateUserUserCase } from "../CreateUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";


let authenticateUserUseCase: AuthenticateUserUseCase;
let userRepositoryInMemory: UserRepositoryInMemory;
let createUserUseCase: CreateUserUserCase;

describe("Authenticate User", () => {

  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(userRepositoryInMemory);
    createUserUseCase = new CreateUserUserCase(userRepositoryInMemory);
  });

  it("should be able to authenticate an user", async () => {
    const user: ICreateUserDTO = {
      name: "User Test",
      email: "XXXXXXXXXXXXX",
      password: "XXXX",
      driver_license: "000123"
    }

    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password
    });

    console.log(result)
    expect(result).toHaveProperty("token");
  })

  it("should not authenticate an non existent user", () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: "Email@email.com",
        password: "password"
      })
    }).rejects.toBeInstanceOf(AppError)
  })



  it("should not authenticate with incorrect password", async () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        name: "user",
        email: "Email@email.com",
        password: "password",
        driver_license: "000123"
      }

      await createUserUseCase.execute(user);

      authenticateUserUseCase.execute({
        email: user.email,
        password: "XXXXXXXXXXXXXXXXX"
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it("should not authenticate with incorrect email", async () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        name: "name",
        password: "password",
        email: "email",
        driver_license: "001234"
      }
      await createUserUseCase.execute(user);

      authenticateUserUseCase.execute({
        email: "XXXXXXXXXXX",
        password: user.password
      })
    }).rejects.toBeInstanceOf(AppError);
  })

  it("should not authenticate with incorrect emain and password", async () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        name: "name",
        password: "password",
        email: "email",
        driver_license: "001234"
      }

      await createUserUseCase.execute(user);

      authenticateUserUseCase.execute({
        email: "XXXXXXXXXXX",
        password: "XXXXXXXXXXXXXXXXX"
      })
    }).rejects.toBeInstanceOf(AppError);
  })
})

import { AppError } from "../../../../shared/errors/AppError";

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

  it("should be able to authenticate an existing user", async () => {
    const user = {
      name: "User Test",
      email: "XXXXXXXXXXXXX",
      password: "XXXX",
      driver_license: "000123"
    };

    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password
    });

    expect(result).toHaveProperty("token");
  });

  it("should not authenticate a non-existing user", async () => {
    await expect(authenticateUserUseCase.execute({
      email: "Email@email.com",
      password: "password"
    })).rejects.toBeInstanceOf(AppError);
  });

  it("should not authenticate with incorrect password", async () => {
    const user = {
      name: "user",
      email: "Email@email.com",
      password: "password",
      driver_license: "000123"
    };

    await createUserUseCase.execute(user);

    await expect(authenticateUserUseCase.execute({
      email: user.email,
      password: "XXXXXXXXXXXXXXXXX"
    })).rejects.toBeInstanceOf(AppError);
  });

  it("should not authenticate with incorrect email", async () => {
    const user = {
      name: "name",
      password: "password",
      email: "email",
      driver_license: "001234"
    };

    await createUserUseCase.execute(user);

    await expect(authenticateUserUseCase.execute({
      email: "XXXXXXXXXXX",
      password: user.password
    })).rejects.toBeInstanceOf(AppError);
  });

  it("should not authenticate with incorrect email and password", async () => {
    const user = {
      name: "name",
      password: "password",
      email: "email",
      driver_license: "001234"
    };

    await createUserUseCase.execute(user);

    await expect(authenticateUserUseCase.execute({
      email: "XXXXXXXXXXX",
      password: "XXXXXXXXXXXXXXXXX"
    })).rejects.toBeInstanceOf(AppError);
  });
});
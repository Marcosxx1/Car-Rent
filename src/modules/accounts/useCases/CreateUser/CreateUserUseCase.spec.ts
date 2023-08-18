import { AppError } from "../../../../shared/errors/AppError";
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
      password: "XXXXXXXXX"
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
        password: "XXXXXXXXX"
      }

      await createUserUseCase.execute(user);

      await createUserUseCase.execute(user);
    }).rejects.toBeUndefined
  })

  it("should hash password", async () => {
    const user: ICreateUserDTO = {
      name: "User Test",
      driver_license: "XXXX",
      email: "XXXXXXXXXXXXX",
      password: "XXXXXXXXX"
    }

    await createUserUseCase.execute(user);

    const userCreated = await userRepositoryInMemory.findByEmail(user.email);

    expect(userCreated.password).not.toEqual("XXXX");
  })

  it("should not create a user with invalid name", async () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        name: "",
        driver_license: "XXXX",
        email: "XXXXXXXXXXXXX",
        password: "XXXXXXXXX"
      }

      await createUserUseCase.execute(user);
    }).rejects.toBeInstanceOf(AppError)
  })
  it("should not create a user with invalid password", () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        name: "User Test",
        driver_license: "XXXX",
        email: "XXXXXXXXXXXXX",
        password: ""
      }

      await createUserUseCase.execute(user);
    }).rejects.toBeInstanceOf(AppError)
  })

  it("should not create a user if the email address is undefined", async () => {
    const user = {
      name: "User Test",
      email: undefined,
      driver_license: "000123",
      password: "XXXXXXXXX",
    };

    expect(createUserUseCase.execute(user)).rejects.toBeUndefined
  });


  it("should not create a user if the user repository throws an error", async () => {
    const userRepository = {
      create: async () => {
        throw new Error("Something went wrong");
      },
    };

    const user = {
      name: "User Test",
      email: "newemail@email.com",
      driver_license: "000123",
      password: "password",
    };

    await expect(createUserUseCase.execute(user)).rejects.toBeUndefined
  });


  it("should throw an error if the user already exists", async () => {
    const user = {
      name: "User Test",
      email: "XXXXXXXXXXXXXXXXXX",
      driver_license: "000123",
      password: "XXXXXXXX",
    };

    await createUserUseCase.execute(user);

    await expect(createUserUseCase.execute(user)).rejects.toBeInstanceOf(AppError);
  })

  it("should return undefined if the email address does not exist", () => {
    expect(createUserUseCase.execute({
      name: "User Test",
      email: "XXXXXXXXXXXXXXXXXX",
      driver_license: "000123",
      password: "XXXXXXXX",
    })).resolves.toBeUndefined
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
}
)
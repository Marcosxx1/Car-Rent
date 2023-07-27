import { inject, injectable } from "tsyringe";

import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { IUserRepository } from "../repositories/IUserRepository";

@injectable()
class CreateUserUserCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository,
  ) {
    console.log();
  }

  async execute({
    name,
    username,
    email,
    driver_license,
    password,
  }: ICreateUserDTO): Promise<void> {
    await this.userRepository.create({
      name,
      username,
      email,
      driver_license,
      password,
    });
  }
}

export { CreateUserUserCase };

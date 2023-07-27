import { hash } from "bcrypt";
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
    email,
    driver_license,
    password,
  }: ICreateUserDTO): Promise<void> {
    const hashedPassword = await hash(password, 8);

    const emailAlreadyExists = await this.userRepository.findByEmail(email);

    if (emailAlreadyExists) {
      throw new Error("E-mail already registered");
    }

    await this.userRepository.create({
      name,
      email,
      driver_license,
      password: hashedPassword,
    });
  }
}

export { CreateUserUserCase };

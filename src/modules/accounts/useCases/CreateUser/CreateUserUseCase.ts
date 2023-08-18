import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../../repositories/IUserRepository";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { AppError } from "../../../../shared/errors/AppError";



@injectable()
class CreateUserUserCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository,
  ) { }

  async execute({
    name,
    email,
    driver_license,
    password,
  }: ICreateUserDTO): Promise<void> {
    if (name?.trim() === "" ||
      email?.trim() === "" ||
      driver_license?.trim() === "" ||
      password?.trim() === "") {
      throw new AppError("All fields are required");
    }


    const hashedPassword = await hash(password, 8);

    const emailAlreadyExists = await this.userRepository.findByEmail(email);

    if (emailAlreadyExists) {
      throw new AppError("E-mail already registered");
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

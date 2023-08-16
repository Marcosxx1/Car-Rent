import { Repository } from "typeorm";

import { AppDataSource } from "../../../../database";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../entities/User";
import { IUserRepository } from "../IUserRepository";

class UserRepository implements IUserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne({ where: { id } });
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const emailAlreadyExists = await this.repository.findOneBy({ email });
    return emailAlreadyExists;
  }

  async create({
    name,
    email,
    driver_license,
    password,
  }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      name,
      email,
      driver_license,
      password,
    });

    await this.repository.save(user);
  }

  async save(user_id: string, user: User): Promise<void> {
    this.repository.update(user_id, user);
  }
}

export { UserRepository };

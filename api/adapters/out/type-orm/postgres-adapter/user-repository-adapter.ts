import { Repository } from "typeorm";

import { UserPort } from "../../../../business/ports/user-port";
import { AppDataSource } from "..";
import { UserModel } from "./models/user-model";
import { IUser } from "../../../../business/entities/User";


export class UserRepositoryAdapter implements UserPort {
  private repository: Repository<IUser>;

  constructor() {
    this.repository = AppDataSource.getRepository(UserModel);
  }

  async findById(id: string): Promise<IUser> {
    const user = await this.repository.findOne({ where: { id } });
    return user;
  }

  async create({
    name,
    email,
    driver_license,
    password,
  }: IUser): Promise<void> {
    const user = this.repository.create({
      name,
      email,
      driver_license,
      password,
    });

    await this.repository.save(user);
  }

  async findByEmail(email: string): Promise<IUser> {
    const emailAlreadyExists = await this.repository.findOneBy({ email });
    return emailAlreadyExists;
  }

  async save(user_id: string, user: IUser): Promise<void> {
    this.repository.update(user_id, user);
  }
}


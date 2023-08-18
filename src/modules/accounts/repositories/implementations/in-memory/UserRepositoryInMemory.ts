import { ICreateUserDTO } from "../../../dtos/ICreateUserDTO";
import { User } from "../../../infra/typeorm/entities/User";
import { IUserRepository } from "../../IUserRepository";


class UserRepositoryInMemory implements IUserRepository {

  user: User[] = [];

  async findById(user_id: string): Promise<User> {
    const user = this.user.find(user => user.id === user_id);
    return Promise.resolve(user);
  }

  async create({
    driver_license,
    email,
    name,
    password
  }: ICreateUserDTO): Promise<void> {
    const user = new User();

    Object.assign(user, {
      driver_license,
      email,
      name,
      password
    });

    this.user.push(user);
  }

  async findByEmail(email: string): Promise<User> {
    const user = this.user.find(user => user.email === email);
    return Promise.resolve(user);
  }

  async save(user_id: string, user: User): Promise<void> {
    const index = this.user.findIndex(user => user.id === user_id);
    this.user[index] = user;
  }
}

export { UserRepositoryInMemory };